<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Header -->
    <header class="bg-white shadow-sm border-b">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
              Online Market
            </NuxtLink>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink 
                to="/" 
                class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </NuxtLink>
              <NuxtLink 
                to="/about" 
                class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </NuxtLink>
            </div>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <button class="btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p>&copy; 2025 Online Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Layout-specific logic can go here
</script>
