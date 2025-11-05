<template>
  <div class="flex items-center justify-center h-[calc(100vh-150px)] bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Create Account</h2>

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your full name"
          />
        </div>

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
            minlength="6"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Create a password"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Register
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Please fill all fields')
    return
  }

  // Mock user data saving (replace with API later)
  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  // Save to localStorage just for demo
  localStorage.setItem('registeredUser', JSON.stringify(user))
  alert('Registration Successful!')

  router.push('/login')
}
</script>
