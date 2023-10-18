<template>
  <div
    class="background-color-background-1 p-22-24-20-30 flex justify-between items-center rounded-12"
  >
    <div class="flex flex-col">
      <div class="color-primary-dark font-size-18 font-700 line-height-27">
        {{props.value}}
      </div>
      <div class="color-primary-grey font-size-14 font-400 line-height-21">
        {{props.title}}
      </div>
    </div>
    <div
      class="flex justify-center items-center rounded-10 width-56 height-56"
      :style="[`background-color: var(--${props.iconBackgroundColor})`]"
    >
      <v-icon
        class="width-20"
        :style="[`fill: var(--${props.iconFillColor})`]"
        :icon="props.icon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Icon } from '@/components/icon/v-icon.vue'
defineOptions({ name: 'CategoryCard' })

export interface CategoryCardProps {
  title: string
  value: string
  icon: Icon
  iconFillColor: string
  iconBackgroundColor: string
}

const props = withDefaults(defineProps<CategoryCardProps>(), {
  iconFillColor: 'primary',
  iconBackgroundColor: 'primary-resting',
})
</script>
