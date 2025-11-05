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

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your full name"
          />
        </div>

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
            minlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Create a password (min. 6 characters)"
          />
        </div>

        <AppButton
          type="submit"
          variant="primary"
          size="lg"
          :full-width="true"
          :loading="isLoading"
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

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isLoggedIn) {
    router.push('/home')
  }
})

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Please fill all fields')
    return
  }

  isLoading.value = true

  try {
    // Mock user data saving (replace with API later)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    }

    // Save to localStorage just for demo
    localStorage.setItem('registeredUser', JSON.stringify(user))
    
    // Auto-login after registration
    authStore.login({
      email: email.value,
      name: name.value
    })
    
    alert('Registration Successful!')

    // Redirect to home page
    router.push('/home')
  } finally {
    isLoading.value = false
  }
}
</script>
