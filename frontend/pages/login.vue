<template>
  <div class="flex items-center justify-center h-[calc(100vh-150px)] bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?
        <NuxtLink to="/signup" class="text-blue-600 hover:underline">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Please fill all fields')
    return
  }

  // Example: Simulate API login
  if (email.value === 'user@example.com' && password.value === '123456') {
    alert('Login Successful!')
    router.push('/')
  } else {
    alert('Invalid email or password')
  }
}
</script>
