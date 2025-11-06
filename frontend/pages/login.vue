<template>
  <div class="w-full max-w-md">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">Online Market</h1>
        </NuxtLink>
        <p class="text-gray-600">Welcome back! Please login to your account.</p>
      </div>

      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
      
      <!-- Error message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
      </div>

      <!-- Success message -->
      <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-sm text-green-600">{{ successMessage }}</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            :disabled="isLoading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your email"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            :disabled="isLoading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your password"
          />
        </div>

        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          :full-width="true"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Login
        </AppButton>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Don't have an account?
        <NuxtLink to="/signup" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Use auth layout (no header, no footer)
definePageMeta({
  layout: 'auth'
})

// Page meta
useHead({
  title: 'Login'
})

// Check if already logged in, redirect to home
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const handleLogin = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // Validation
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill all fields'
    return
  }

  isLoading.value = true
  
  try {
    // Call API login
    const result = await authStore.loginWithApi({
      email: email.value,
      password: password.value
    })
    
    if (result.success) {
      successMessage.value = result.message || 'Login successful!'
      
      // Redirect to home page after short delay
      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      errorMessage.value = result.message || 'Invalid email or password'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
}
</script>
