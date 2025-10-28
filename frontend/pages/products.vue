<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Products</h1>
      <p class="text-xl text-gray-600">
        Discover our wide range of quality products
      </p>
    </div>

    <!-- Product Grid Placeholder -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="card">
        <div class="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
          <span class="text-gray-500">Product Image</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Sample Product {{ n }}</h3>
        <p class="text-gray-600 mb-4">
          This is a placeholder for product description. Real products will be loaded from the API.
        </p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-blue-600">${{ (n * 25).toFixed(2) }}</span>
          <button class="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>

    <!-- Coming Soon Message -->
    <div class="text-center mt-12">
      <div class="card inline-block">
        <h2 class="text-xl font-semibold mb-2">🚀 Coming Soon!</h2>
        <p class="text-gray-600">
          Real products will be loaded from the backend API. The product management system is under development.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Products'
})
</script>
