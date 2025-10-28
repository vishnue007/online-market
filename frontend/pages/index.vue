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
          <NuxtLink to="/products" class="btn-primary text-lg px-8 py-3">
            Shop Now
          </NuxtLink>
          <NuxtLink to="/about" class="btn-secondary text-lg px-8 py-3">
            Learn More
          </NuxtLink>
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
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Home'
})

onMounted(() => {
})
</script>
