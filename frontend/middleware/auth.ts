export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Check authentication status
  authStore.checkAuth()
  
  // If user is not authenticated and trying to access protected routes
  // Redirect to login (except for login and signup pages)
  if (!authStore.isLoggedIn && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login')
  }
  
  // If user is authenticated and trying to access login/signup pages
  // Redirect to home
  if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/home')
  }
})
