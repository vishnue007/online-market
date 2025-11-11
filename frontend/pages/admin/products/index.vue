<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Product Management</h1>
        <p class="text-gray-600 mt-2">Manage all your products</p>
      </div>
      <AppButton to="/admin/products/new" variant="primary">
        Add New Product
      </AppButton>
    </div>

    <div v-if="isLoading" class="text-center py-12">
      <p class="text-gray-600">Loading products...</p>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-600 mb-4">No products found</p>
      <AppButton to="/admin/products/new" variant="primary">
        Add Your First Product
      </AppButton>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in products" :key="product._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img v-if="product.image" :src="product.image" :alt="product.name" class="h-10 w-10 rounded object-cover">
                  <div v-else class="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                  <div class="text-sm text-gray-500 truncate max-w-xs">{{ product.description }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ product.category }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${{ product.price.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm" :class="product.stock < 10 ? 'text-red-600' : 'text-gray-900'">
              {{ product.stock }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span v-if="product.isActive" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
              <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                Inactive
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editProduct(product._id)" class="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
              <button @click="deleteProduct(product._id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

useHead({
  title: 'Product Management'
})

const { getAllProducts, deleteProduct: deleteProductApi } = useProductApi()
const toast = useToast()
const router = useRouter()

const products = ref<any[]>([])
const isLoading = ref(true)

const loadProducts = async () => {
  isLoading.value = true
  const result = await getAllProducts()
  if (result.success && result.data?.data?.products) {
    products.value = result.data.data.products
  } else {
    toast.error(result.message || 'Failed to load products')
  }
  isLoading.value = false
}

const editProduct = (id: string) => {
  router.push(`/admin/products/edit/${id}`)
}

const deleteProduct = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) {
    return
  }

  const result = await deleteProductApi(id)
  if (result.success) {
    toast.success('Product deleted successfully')
    loadProducts()
  } else {
    toast.error(result.message || 'Failed to delete product')
  }
}

onMounted(() => {
  loadProducts()
})
</script>



