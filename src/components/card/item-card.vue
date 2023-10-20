<template>
  <div
    class="p-17-20-17-17 background-color-background-1 flex justify-between items-center rounded-12 transition"
  >
    <div class="flex gap-13 items-center">
      <div class="flex items-center justify-center width-38 height-38 rounded-8 background-color-primary-resting">
        <v-icon class="fill-primary width-16" :icon="props.icon" />
      </div>
      <div class="color-primary-dark font-size-14 font-700 line-height-21">{{ props.label }}</div>
    </div>
    <div class="color-primary-grey font-size-12 font-700 line-height-18">{{ props.value }}</div>
  </div>
</template>
<script setup lang="ts">
import type { Icon } from '@/components/icon/v-icon.vue'
defineOptions({ name: 'ItemCard' })

export interface ItemCardProps {
  label: string
  value: string
  icon: Icon
}

const props = withDefaults(defineProps<ItemCardProps>(), {})
</script>
