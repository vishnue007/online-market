export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    return
  }

  try {
    const authStore = useAuthStore()
    authStore.checkAuth()
    
    if (!authStore.isLoggedIn) {
      return navigateTo('/admin/login')
    }
    
    if (!authStore.isAdmin) {
      return navigateTo('/')
    }
  } catch (error) {
    console.warn('Admin middleware error:', error)
    return navigateTo('/admin/login')
  }
})


