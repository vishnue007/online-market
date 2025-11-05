import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<{ email: string; name?: string } | null>(null)
  const isAuthenticated = ref(false)

  // Check if user is authenticated (check localStorage on init)
  const checkAuth = () => {
    if (process.client) {
      const storedUser = localStorage.getItem('user')
      const storedAuth = localStorage.getItem('isAuthenticated')
      
      if (storedUser && storedAuth === 'true') {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      }
    }
  }

  // Initialize auth check
  checkAuth()

  // Computed
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)

  // Actions
  const login = (userData: { email: string; name?: string }) => {
    user.value = userData
    isAuthenticated.value = true
    
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('registeredUser')
    }
  }

  return {
    user,
    isAuthenticated,
    isLoggedIn,
    login,
    logout,
    checkAuth
  }
})
