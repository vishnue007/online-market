import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<{ email: string; name?: string; _id?: string; role?: string } | null>(null)
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

  // Initialize auth check only on client
  if (process.client) {
    checkAuth()
  }

  // Computed
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  const login = (userData: { email: string; name?: string; _id?: string; role?: string }) => {
    user.value = userData
    isAuthenticated.value = true
    
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  // API login method
  const loginWithApi = async (credentials: { email: string; password: string }) => {
    const { login: apiLogin } = useAuthApi()
    const result = await apiLogin(credentials)
    
    if (result.success && result.data?.data?.user) {
      const userData = result.data.data.user
      login({
        email: userData.email,
        name: userData.name,
        _id: userData._id,
        role: userData.role
      })
      return { success: true, message: result.data.message || 'Login successful' }
    }
    
    return { success: false, message: result.message || 'Login failed' }
  }

  // API register method
  const registerWithApi = async (userData: { name: string; email: string; password: string }) => {
    const { register: apiRegister } = useAuthApi()
    const result = await apiRegister(userData)
    
    if (result.success && result.data?.data?.user) {
      const registeredUser = result.data.data.user
      login({
        email: registeredUser.email,
        name: registeredUser.name,
        _id: registeredUser._id,
        role: registeredUser.role
      })
      return { success: true, message: result.data.message || 'Registration successful', errors: result.errors || [] }
    }
    
    return { success: false, message: result.message || 'Registration failed', errors: result.errors || [] }
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
    isAdmin,
    login,
    loginWithApi,
    registerWithApi,
    logout,
    checkAuth
  }
})
