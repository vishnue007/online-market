export const useProductApi = () => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl
  const authStore = useAuthStore()

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    
    if (authStore.user?._id) {
      headers['x-user-id'] = authStore.user._id
    }
    
    if (authStore.user?.role) {
      headers['x-user-role'] = authStore.user.role
    }
    
    return headers
  }

  const getAllProducts = async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.category) queryParams.append('category', params.category)
      if (params?.search) queryParams.append('search', params.search)
      if (params?.page) queryParams.append('page', params.page.toString())
      if (params?.limit) queryParams.append('limit', params.limit.toString())

      const response = await $fetch(`${apiBaseUrl}/api/products?${queryParams.toString()}`)
      return { success: true, data: response }
    } catch (error: any) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Failed to fetch products'
      }
    }
  }

  const getProductById = async (id: string) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/products/${id}`)
      return { success: true, data: response }
    } catch (error: any) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Failed to fetch product'
      }
    }
  }

  const createProduct = async (productData: {
    name: string
    description: string
    price: number
    image?: string
    category: string
    stock?: number
  }) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/products`, {
        method: 'POST',
        body: productData,
        headers: getHeaders()
      })
      return { success: true, data: response }
    } catch (error: any) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Failed to create product',
        errors: error.data?.errors || []
      }
    }
  }

  const updateProduct = async (id: string, productData: {
    name?: string
    description?: string
    price?: number
    image?: string
    category?: string
    stock?: number
    isActive?: boolean
  }) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/products/${id}`, {
        method: 'PUT',
        body: productData,
        headers: getHeaders()
      })
      return { success: true, data: response }
    } catch (error: any) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Failed to update product',
        errors: error.data?.errors || []
      }
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      })
      return { success: true, data: response }
    } catch (error: any) {
      return {
        success: false,
        message: error.data?.message || error.message || 'Failed to delete product'
      }
    }
  }

  return {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
}


