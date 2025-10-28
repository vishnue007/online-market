<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-6">About Online Market</h1>
      <p class="text-xl text-gray-600 leading-relaxed">
        We're building the future of online shopping with a focus on quality, convenience, and customer satisfaction.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 mb-12">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed mb-6">
          To provide a seamless online shopping experience where customers can discover, 
          purchase, and enjoy quality products with confidence and ease.
        </p>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p class="text-gray-600 leading-relaxed">
          To become the most trusted and innovative online marketplace that connects 
          buyers and sellers worldwide while maintaining the highest standards of service.
        </p>
      </div>
      
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Tech Stack</h2>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <span class="text-green-600 font-semibold">Frontend:</span>
            <span class="text-gray-700">Nuxt.js 3, Vue.js, Tailwind CSS</span>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-blue-600 font-semibold">Backend:</span>
            <span class="text-gray-700">Node.js, Express.js</span>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-purple-600 font-semibold">Database:</span>
            <span class="text-gray-700">MongoDB / PostgreSQL (configurable)</span>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-orange-600 font-semibold">Deployment:</span>
            <span class="text-gray-700">Docker, Vercel, Heroku</span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">🚧 Development Status</h2>
        <p class="text-gray-600 mb-4">
          This project is currently under active development. Features are being added regularly.
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Project Setup</span>
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Frontend Foundation</span>
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Backend API</span>
          <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">🚧 User Authentication</span>
          <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">🚧 Product Management</span>
          <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">⏳ Payment Integration</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us'
})
</script>
