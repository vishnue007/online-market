export default defineNuxtRouteMiddleware((to, from) => {
  // CRITICAL: Skip middleware on server-side to prevent 404 errors
  // localStorage is not available on server, so we must check auth only on client
  // On server, just allow the route to render - auth will be checked on client
  if (process.server) {
    return
  }

  // Client-side only: Check authentication
  try {
    const authStore = useAuthStore()
    
    // Check authentication status
    authStore.checkAuth()
    
    // If user is not authenticated and trying to access protected routes
    // Redirect to login (except for login, signup, and admin login pages)
    if (!authStore.isLoggedIn && to.path !== '/login' && to.path !== '/signup' && to.path !== '/admin/login' && to.path !== '/') {
      return navigateTo('/login')
    }
    
    // If user is authenticated and trying to access login/signup pages
    // Redirect to home (but allow admin login if not admin)
    if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/signup')) {
      return navigateTo('/')
    }
    
    // Allow admin login page even if logged in (user might want to switch accounts)
    // But redirect if already admin
    if (authStore.isLoggedIn && authStore.isAdmin && to.path === '/admin/login') {
      return navigateTo('/admin/dashboard')
    }
  } catch (error) {
    // If there's an error accessing the store, just allow the route
    // This prevents crashes that could cause 404s
    console.warn('Auth middleware error:', error)
  }
})
