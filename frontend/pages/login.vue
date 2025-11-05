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
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your email"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your password"
          />
        </div>

        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          :full-width="true"
          :loading="isLoading"
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

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Please fill all fields')
    return
  }

  isLoading.value = true
  
  try {
    // Example: Simulate API login
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    if (email.value === 'user@example.com' && password.value === '123456') {
      // Login successful - save to auth store
      authStore.login({
        email: email.value,
        name: 'User'
      })
      
      // Redirect to home page
      router.push('/')
    } else {
      alert('Invalid email or password')
    }
  } finally {
    isLoading.value = false
  }
}
</script>
