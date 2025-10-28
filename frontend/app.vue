<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Global app configuration
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - Online Market` : 'Online Market'
  }
})
</script>

<style>
/* Global styles are imported via nuxt.config.ts */
</style>
