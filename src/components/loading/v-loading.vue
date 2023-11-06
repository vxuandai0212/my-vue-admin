<template>
  <div class="w-full h-full flex items-center justify-center">
    <component :is="LOADING[props.type]" />
  </div>
</template>
<script setup lang="ts">
import BarLoading from '@/components/loading/bar-loading.vue'
import { LoadingType } from '@/typings/loading'

defineOptions({ name: 'VLoading' })

interface Props {
  type?: LoadingType
}

interface Loading {
  [key: string]: any
}

const LOADING: Loading = {
  'bar-loading': BarLoading,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'bar-loading',
})
</script>
