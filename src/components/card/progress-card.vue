<template>
  <div
    class="height-98 p-14-22-20-26 flex flex-col grow gap-15 rounded-12"
    :class="[`background-color-${props.backgroundColor}`]"
  >
    <div class="flex justify-between items-center">
      <div>
        <div class="color-primary-dark font-size-18 font-700 line-height-27">
          {{ label }}
        </div>
        <div class="color-primary-grey font-size-14 font-400 line-height-21">
          {{ description }}
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="color-primary-dark font-size-20 font-700 line-height-32">
          {{ valuePrefix }}{{ value }}
        </div>
        <icon-local-arrow
          width="12px"
          height="12px"
          :style="{ fill: trendColor }"
          :class="[trend === 'down' ? 'rotate-x-180' : '']"
        />
      </div>
    </div>
    <n-progress
      type="line"
      :color="COLOR[progressColor]"
      rail-color="#F6F6F6"
      :height="4"
      :percentage="percentageValue"
      :show-indicator="false"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import anime from 'animejs/lib/anime.es.js'

defineOptions({ name: 'ProgressCard' })
export interface ProgressCardProps {
  label?: string
  description?: string
  valuePrefix?: string
  value?: number
  progressColor: 'primary' | 'warning' | 'danger' | 'success'
  trend: 'up' | 'down'
  percent: number
  backgroundColor: string
}

const COLOR = {
  primary: '#5E81F4',
  success: '#7CE7AC',
  danger: '#FF808B',
  warning: '#F4BE5E',
}

const props = withDefaults(defineProps<ProgressCardProps>(), {
  progressColor: 'primary',
  trend: 'up',
  percent: 60,
  backgroundColor: 'background-extra-light'
})

const percentageValue = ref<number>(0)

anime({
  targets: percentageValue,
  value: props.percent,
  duration: 500,
  easing: 'linear',
})

const trendColor = computed(() =>
  props.trend === 'up' ? '#7CE7AC' : '#FF808B'
)
</script>
