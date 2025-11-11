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

    <!-- Featured Products Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Featured Products</h2>
            <p class="text-lg text-gray-600">Browse a curated selection of our latest products</p>
          </div>
          <AppButton to="/products" variant="outline" size="md">
            View All Products
          </AppButton>
        </div>

        <div v-if="isLoadingProducts" class="text-center py-12">
          <p class="text-gray-600">Loading products...</p>
        </div>
        
        <div v-else-if="products.length === 0" class="text-center py-12">
          <p class="text-gray-600">No products available yet. Check back soon!</p>
        </div>
        
        <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="product in products"
            :key="product._id"
            :to="`/products/${product._id}`"
            class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-gray-100 overflow-hidden">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex flex-col items-center justify-center text-gray-400"
              >
                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5V8.25C3 7.007 4.007 6 5.25 6h13.5C19.493 6 20.5 7.007 20.5 8.25v8.25A1.75 1.75 0 0118.75 18H5.25A1.75 1.75 0 013.5 16.5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9l8.485 4.242a1.5 1.5 0 001.03.074L21 9"></path>
                </svg>
                <span>No image</span>
              </div>
            </div>

            <div class="p-6 space-y-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 h-12 overflow-hidden">{{ product.description }}</p>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-blue-600">{{ formatPrice(product.price) }}</span>
                <span :class="product.stock < 10 ? 'text-sm text-red-600' : 'text-sm text-gray-500'">
                  {{ product.stock }} in stock
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Product = {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  stock: number
}

useHead({
  title: 'Home'
})

const { getAllProducts } = useProductApi()
const toast = useToast()

const products = ref<Product[]>([])
const isLoadingProducts = ref(true)

const loadProducts = async () => {
  isLoadingProducts.value = true
  const result = await getAllProducts({ limit: 6 })

  if (result.success && result.data?.data?.products) {
    products.value = result.data.data.products
  } else if (result.message) {
    toast.error(result.message)
  }

  isLoadingProducts.value = false
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

onMounted(() => {
  loadProducts()
})
</script>
