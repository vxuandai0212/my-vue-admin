<template>
  <div class="wh-full flex-col-center">
    <n-gradient-text class="mb-24px" type="primary" :size="28"
      >Custom Constant Page</n-gradient-text
    >
    <router-link :to="{ name: routeHomePath }">
      <n-button type="primary">Back to the Homepage</n-button>
    </router-link>
    <n-card
      :bordered="false"
      size="small"
      class="mt-24px rounded-8px shadow-sm"
    >
      <div class="flex-center py-12px">
        <n-button
          type="primary"
          class="mr-24px"
          :disabled="isMoving"
          @click="startMove"
          >Start</n-button
        >
        <n-button type="error" @click="endMove">Pause</n-button>
      </div>
      <div class="flex-center">
        <div class="relative bg-primary_active" :style="containerStyle">
          <svg class="w-full h-full">
            <ellipse
              :cx="ellipseConfig.cX"
              :cy="ellipseConfig.cY"
              :rx="ellipseConfig.rX"
              :ry="ellipseConfig.rY"
              :style="{ strokeWidth: ellipseConfig.strokeWidth + 'px' }"
              class="fill-none stroke-primary"
            ></ellipse>
          </svg>
          <div
            class="absolute left-182px top-82px w-40px h-40px bg-red rounded-20px"
            :style="transformStyle"
          ></div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { routeName } from '@/router'

const routeHomePath = routeName('root')

interface EllipseConfig {
  cX: number
  cY: number
  rX: number
  rY: number
  strokeWidth: number
}

const ellipseConfig: EllipseConfig = {
  cX: 202,
  cY: 102,
  rX: 200,
  rY: 100,
  strokeWidth: 2,
}

const containerStyle = (() => {
  const { rX, rY, strokeWidth } = ellipseConfig

  const width = (rX + strokeWidth) * 2
  const height = (rY + strokeWidth) * 2

  return `width:${width}px;height:${height}px;`
})()

const angle = ref(0)

const transformStyle = computed(() => {
  const { rX, rY } = ellipseConfig
  const x = rX * Math.sin(angle.value)
  const y = rY * Math.cos(angle.value)

  return `transform: translate3d(${x}px,${y}px,0px)`
})

const speed = ref(2)

const FULL_ANGLE = 2 * Math.PI

const TIMES_PER_SECONDS = 60

const updateAnglePerTime = computed(
  () => FULL_ANGLE / speed.value / TIMES_PER_SECONDS
)

const rafId = ref<number | null>(null)

const isMoving = computed(() => rafId.value !== null)

const startMove = () => {
  angle.value += updateAnglePerTime.value

  rafId.value = window.requestAnimationFrame(startMove)
}

const endMove = () => {
  if (rafId.value !== null) {
    window.cancelAnimationFrame(rafId.value)
    rafId.value = null
  }
}
</script>

<style scoped></style>
