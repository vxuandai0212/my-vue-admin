<template>
  <div ref="bsWrap" class="h-full text-left">
    <div ref="bsContent" class="inline-block" :class="{ 'h-full': !isScrollY }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import BScroll from '@better-scroll/core'
import type { Options } from '@better-scroll/core'

defineOptions({ name: 'BetterScroll' })

interface Props {
  options: Options
}

const props = defineProps<Props>()

const bsWrap = ref<HTMLElement>()
const instance = ref<BScroll>()
const bsContent = ref<HTMLElement>()
const isScrollY = computed(() => Boolean(props.options.scrollY))

function initBetterScroll() {
  if (!bsWrap.value) return
  instance.value = new BScroll(bsWrap.value, props.options)
}

const { width: wrapWidth } = useElementSize(bsWrap)
const { width, height } = useElementSize(bsContent)
watch([() => wrapWidth.value, () => width.value, () => height.value], () => {
  if (instance.value) {
    instance.value.refresh()
  }
})

onMounted(() => {
  initBetterScroll()
})

defineExpose({ instance })
</script>

<style scoped></style>
