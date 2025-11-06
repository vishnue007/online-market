export const useAuthApi = () => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return {
        success: true,
        data: response
      }
    } catch (error: any) {
      const hasServerResponse = error.status || error.statusCode || error.data || error.response;
      
      if (hasServerResponse) {
        return {
          success: false,
          message: error.data?.message || error.message || 'Registration failed',
          errors: error.data?.errors || []
        }
      }
      
      const networkErrorPatterns = [
        'fetch',
        'Failed to fetch',
        'NetworkError',
        'ECONNREFUSED',
        'ERR_CONNECTION_REFUSED',
        'ERR_NETWORK',
        'ERR_INTERNET_DISCONNECTED',
        'timeout',
        'Network request failed'
      ]
      
      const isNetworkError = networkErrorPatterns.some(pattern => 
        error.message?.toLowerCase().includes(pattern.toLowerCase()) || 
        error.name?.toLowerCase().includes(pattern.toLowerCase()) ||
        error.code?.toLowerCase().includes(pattern.toLowerCase())
      )
      
      if (isNetworkError || !hasServerResponse) {
        return {
          success: false,
          message: 'Cannot connect to server. Please make sure the backend is running on ' + apiBaseUrl,
          errors: []
        }
      }

      return {
        success: false,
        message: error.message || 'Registration failed',
        errors: []
      }
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await $fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return {
        success: true,
        data: response
      }
    } catch (error: any) {
      const hasServerResponse = error.status || error.statusCode || error.data || error.response;
      
      if (hasServerResponse) {
        return {
          success: false,
          message: error.data?.message || error.message || 'Login failed'
        }
      }
      
      const networkErrorPatterns = [
        'fetch',
        'Failed to fetch',
        'NetworkError',
        'ECONNREFUSED',
        'ERR_CONNECTION_REFUSED',
        'ERR_NETWORK',
        'ERR_INTERNET_DISCONNECTED',
        'timeout',
        'Network request failed'
      ]
      
      const isNetworkError = networkErrorPatterns.some(pattern => 
        error.message?.toLowerCase().includes(pattern.toLowerCase()) || 
        error.name?.toLowerCase().includes(pattern.toLowerCase()) ||
        error.code?.toLowerCase().includes(pattern.toLowerCase())
      )
      
      if (isNetworkError || !hasServerResponse) {
        return {
          success: false,
          message: 'Cannot connect to server. Please make sure the backend is running on ' + apiBaseUrl
        }
      }

      return {
        success: false,
        message: error.message || 'Login failed'
      }
    }
  }

  return {
    register,
    login
  }
}
