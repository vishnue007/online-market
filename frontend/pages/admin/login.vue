<template>
  <div class="w-full max-w-md">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full">
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-blue-600 mb-2">Online Market</h1>
        </NuxtLink>
        <p class="text-gray-600">Admin Login</p>
      </div>

      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Admin Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            :disabled="isLoading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter admin email"
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
            placeholder="Enter admin password"
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
          Login as Admin
        </AppButton>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          Regular User Login
        </NuxtLink>
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
  title: 'Admin Login'
})

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

onMounted(() => {
  if (process.client) {
    authStore.checkAuth()
    if (authStore.isLoggedIn && authStore.isAdmin) {
      router.push('/admin/dashboard')
    } else if (authStore.isLoggedIn) {
      router.push('/')
    }
  }
})

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.error('Please fill all fields')
    return
  }

  isLoading.value = true
  
  try {
    const result = await authStore.loginWithApi({
      email: email.value,
      password: password.value
    })
    
    if (result.success) {
      if (authStore.isAdmin) {
        toast.success('Admin login successful!')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 500)
      } else {
        toast.error('This account is not an admin account')
        authStore.logout()
      }
    } else {
      toast.error(result.message || 'Invalid email or password')
    }
  } catch (error: any) {
    toast.error(error.message || 'An error occurred during login')
  } finally {
    isLoading.value = false
  }
}
</script>

