<template>
  <div
    class="cursor-pointer hover:background-color-primary-hover hover:color-white color-primary background-color-primary-resting font-size-14 font-700 rounded-8 transition"
  >
    {{ props.label }}
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'RestingButton' })
interface Props {
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Button Label',
})
</script>
