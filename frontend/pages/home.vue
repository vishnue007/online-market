<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Online Market
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Your one-stop destination for quality products and amazing deals
        </p>
        <div class="space-x-4">
          <AppButton to="/products" variant="primary" size="lg">
            Shop Now
          </AppButton>
          <AppButton to="/about" variant="secondary" size="lg">
            Learn More
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Online Market?
          </h2>
          <p class="text-xl text-gray-600">
            We provide the best shopping experience with quality products and excellent service
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="text-xl font-semibold mb-3">Fast Delivery</h3>
            <p class="text-gray-600">
              Get your orders delivered quickly and safely to your doorstep
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">💳</div>
            <h3 class="text-xl font-semibold mb-3">Secure Payment</h3>
            <p class="text-gray-600">
              Shop with confidence using our secure payment processing
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">🌟</div>
            <h3 class="text-xl font-semibold mb-3">Quality Products</h3>
            <p class="text-gray-600">
              We ensure all products meet our high-quality standards
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Welcome User Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {{ authStore.user?.name || authStore.user?.email || 'User' }}!
          </h2>
          <p class="text-gray-600 mb-6">
            You're successfully logged in. Start exploring our products and enjoy shopping!
          </p>
          <div class="flex justify-center gap-4">
            <AppButton variant="outline" @click="handleLogout">
              Logout
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Home'
})

// Protect this route - require authentication
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
