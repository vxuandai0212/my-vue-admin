<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScriptTag } from '@vueuse/core'
import { BAIDU_MAP_SDK_URL } from '@/config'

defineOptions({ name: 'BaiduMap' })

const { load } = useScriptTag(BAIDU_MAP_SDK_URL)

const domRef = ref<HTMLDivElement>()

async function renderMap() {
  await load(true)
  if (!domRef.value) return
  // @ts-ignore
  const map = new BMap.Map(domRef.value)
  // @ts-ignore
  const point = new BMap.Point(114.05834626586915, 22.546789983033168)
  // @ts-ignore
  map.centerAndZoom(point, 15)
  // @ts-ignore
  map.enableScrollWheelZoom()
}

onMounted(() => {
  renderMap()
})
</script>

<style scoped></style>
