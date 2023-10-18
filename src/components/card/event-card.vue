<template>
  <div
    class="p-16-14-16-21 background-color-background-1 flex flex-col gap-4 rounded-12"
  >
    <div class="flex justify-between items-center">
      <div class="flex gap-6 items-center">
        <div
          class="width-8 height-8 rounded-50"
          :style="[`background-color: ${COLOR[props.color]}`]"
        ></div>
        <div class="color-primary font-size-12 font-799 line-height-18">
          {{ props.date }}
        </div>
      </div>
      <v-icon class="fill-primary-grey width-14" icon="three-dot" />
    </div>
    <div class="flex flex-col gap-1">
      <div class="color-primary-dark font-size-14 font-700 line-height-21">
        {{ props.title }}
      </div>
      <div class="color-primary-grey font-size-12 font-400 line-height-18">
        {{ props.description }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'EventCard' })

const COLOR = {
  primary: '#5E81F4',
  success: '#7CE7AC',
  danger: '#FF808B',
  warning: '#F4BE5E',
}

export interface EventCardProps {
  date: string
  title: string
  description: string
  color: 'primary' | 'success' | 'danger' | 'warning'
}

const props = withDefaults(defineProps<EventCardProps>(), {})
</script>
