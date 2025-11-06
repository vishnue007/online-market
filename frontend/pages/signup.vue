<template>
  <div class="w-full max-w-md">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">Online Market</h1>
        </NuxtLink>
        <p class="text-gray-600">Create your account and start shopping today!</p>
      </div>

      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Create Account</h2>

      <!-- Error message -->
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600">{{ errorMessage }}</p>
        <ul v-if="errors.length > 0" class="mt-2 list-disc list-inside text-sm text-red-600">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <!-- Success message -->
      <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p class="text-sm text-green-600">{{ successMessage }}</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            :disabled="isLoading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your full name"
          />
        </div>

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
            minlength="6"
            :disabled="isLoading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Create a password (min. 6 characters)"
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
          Register
        </AppButton>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">Login</NuxtLink>
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
  title: 'Sign Up'
})

// Check if already logged in, redirect to home
const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const errors = ref<string[]>([])

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const handleRegister = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''
  errors.value = []

  // Validation
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Please fill all fields'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  isLoading.value = true

  try {
    // Call API register
    const result = await authStore.registerWithApi({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value
    })
    
    if (result.success) {
      successMessage.value = result.message || 'Registration successful!'
      
      // Auto-login after successful registration
      // Redirect to home page after short delay
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      errorMessage.value = result.message || 'Registration failed'
      if (result.errors && result.errors.length > 0) {
        errors.value = result.errors
      }
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'An error occurred during registration'
  } finally {
    isLoading.value = false
  }
}
</script>
