<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <NuxtLink to="/products" class="text-blue-600 hover:text-blue-700 font-medium">
      ← Back to Products
    </NuxtLink>

    <div v-if="isLoading" class="text-center py-16">
      <p class="text-gray-600">Loading product...</p>
    </div>

    <div v-else-if="!product" class="text-center py-16">
      <p class="text-gray-600">Product not found.</p>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="bg-gray-100 h-80 md:h-full flex items-center justify-center">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="flex flex-col items-center text-gray-400">
            <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5V8.25C3 7.007 4.007 6 5.25 6h13.5C19.493 6 20.5 7.007 20.5 8.25v8.25A1.75 1.75 0 0118.75 18H5.25A1.75 1.75 0 013.5 16.5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9l8.485 4.242a1.5 1.5 0 001.03.074L21 9" />
            </svg>
            <span>No image available</span>
          </div>
        </div>

        <div class="p-8 space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
            <div class="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ product.category }}
            </div>
          </div>

          <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>

          <div class="flex items-center gap-4">
            <span class="text-3xl font-bold text-blue-600">{{ formatPrice(product.price) }}</span>
            <span :class="product.stock < 10 ? 'text-red-600' : 'text-gray-600'">
              {{ product.stock }} in stock
            </span>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <AppButton variant="primary" size="lg">
              Add to Cart
            </AppButton>
          </div>
        </div>
      </div>
    </div>
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
  isActive: boolean
}

const route = useRoute()
const { getProductById } = useProductApi()
const toast = useToast()

const product = ref<Product | null>(null)
const isLoading = ref(true)

const loadProduct = async () => {
  isLoading.value = true
  const result = await getProductById(route.params.id as string)

  if (result.success && result.data?.data?.product) {
    product.value = result.data.data.product
  } else {
    toast.error(result.message || 'Failed to load product')
    product.value = null
  }

  isLoading.value = false
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

useHead(() => ({
  title: product.value ? `${product.value.name} - Product Details` : 'Product Details'
}))

onMounted(() => {
  loadProduct()
})
</script>
