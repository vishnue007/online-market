<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="handleClose"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const handleClose = (id: string) => {
  removeToast(id)
}
</script>

