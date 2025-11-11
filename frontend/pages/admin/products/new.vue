<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Add New Product</h1>
      <p class="text-gray-600 mt-2">Create a new product for your store</p>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              v-model="form.description"
              required
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <input
              v-model="form.category"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Electronics, Clothing, Food"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              v-model="form.image"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isActive"
              type="checkbox"
              id="isActive"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="isActive" class="ml-2 block text-sm text-gray-700">
              Product is active
            </label>
          </div>

          <div class="flex gap-4">
            <AppButton
              type="submit"
              variant="primary"
              :loading="isLoading"
              :disabled="isLoading"
            >
              Create Product
            </AppButton>
            <AppButton
              type="button"
              variant="outline"
              @click="router.push('/admin/products')"
            >
              Cancel
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  middleware: 'admin',
  layout: 'default'
})

useHead({
  title: 'Add New Product'
})

const { createProduct } = useProductApi()
const toast = useToast()
const router = useRouter()

const form = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: '',
  isActive: true
})

const isLoading = ref(false)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.description || !form.value.price || !form.value.category) {
    toast.error('Please fill all required fields')
    return
  }

  isLoading.value = true

  try {
    const result = await createProduct({
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock,
      category: form.value.category,
      image: form.value.image
    })

    if (result.success) {
      toast.success('Product created successfully!')
      router.push('/admin/products')
    } else {
      toast.error(result.message || 'Failed to create product')
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error: string) => {
          toast.error(error)
        })
      }
    }
  } catch (error: any) {
    toast.error(error.message || 'An error occurred')
  } finally {
    isLoading.value = false
  }
}
</script>


