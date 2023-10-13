<template>
  <div
    class="cursor-pointer font-700 hover:background-color-primary-hover rounded-8 font-size-14 background-color-primary color-white transition"
  >
    {{ props.label }}
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'PrimaryButton' })
interface Props {
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Button Label',
})
</script>
