<template>
  <div
    style="background: rgba(129, 129, 165, 0.1)"
    class="flex justify-center items-center width-36 height-36 rounded-6 cursor-pointer"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'IconButton' })
</script>
