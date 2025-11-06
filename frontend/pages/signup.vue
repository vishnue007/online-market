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

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Sign Up'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    toast.error('Please fill all fields')
    return
  }

  if (password.value.length < 6) {
    toast.error('Password must be at least 6 characters')
    return
  }

  isLoading.value = true

  try {
    const result = await authStore.registerWithApi({
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value
    })
    
    if (result.success) {
      toast.success(result.message || 'Registration successful!')
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      toast.error(result.message || 'Registration failed')
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error: string) => {
          toast.error(error)
        })
      }
    }
  } catch (error: any) {
    toast.error(error.message || 'An error occurred during registration')
  } finally {
    isLoading.value = false
  }
}
</script>
