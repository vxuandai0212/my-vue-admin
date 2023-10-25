<template>
  <div v-if="reloadFlag" class="relative">
    <slot></slot>
    <div
      v-show="showPlaceholder"
      class="absolute-lt w-full h-full"
      :class="placeholderClass"
    >
      <div v-show="loading" class="absolute-center">
        <n-spin :show="true" :size="loadingSize" />
      </div>
      <div v-show="isEmpty" class="absolute-center">
        <div class="relative">
          <icon-local-empty-data :class="iconClass" />
          <p class="absolute-lb w-full text-center" :class="descClass">
            {{ emptyDesc }}
          </p>
        </div>
      </div>
      <div v-show="!network" class="absolute-center">
        <div
          class="relative"
          :class="{ 'cursor-pointer': showNetworkReload }"
          @click="handleReload"
        >
          <icon-local-network-error :class="iconClass" />
          <p class="absolute-lb w-full text-center" :class="descClass">
            {{ networkErrorDesc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, watch } from 'vue'
import { NETWORK_ERROR_MSG } from '@/config'
import { useBoolean } from '@/hooks'

defineOptions({ name: 'LoadingEmptyWrapper' })

interface Props {
  loading: boolean
  empty?: boolean
  loadingSize?: 'small' | 'medium' | 'large'
  placeholderClass?: string
  emptyDesc?: string
  iconClass?: string
  descClass?: string
  showNetworkReload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  empty: false,
  loadingSize: 'medium',
  placeholderClass:
    'bg-white dark:bg-dark transition-background-color duration-300 ease-in-out',
  emptyDesc: 'No data',
  iconClass: 'text-320px text-primary',
  descClass: 'text-16px text-#666',
  showNetworkReload: false,
})

const { bool: network, setBool: setNetwork } = useBoolean(
  window.navigator.onLine
)
const { bool: reloadFlag, setBool: setReload } = useBoolean(true)

const isEmpty = computed(() => props.empty && !props.loading && network.value)

const showPlaceholder = computed(
  () => props.loading || isEmpty.value || !network.value
)

const networkErrorDesc = computed(() =>
  props.showNetworkReload
    ? `${NETWORK_ERROR_MSG}, click to try again`
    : NETWORK_ERROR_MSG
)

function handleReload() {
  if (!props.showNetworkReload) return
  setReload(false)
  nextTick(() => {
    setReload(true)
  })
}

const stopHandle = watch(
  () => props.loading,
  (newValue) => {
    if (!newValue) {
      setNetwork(window.navigator.onLine)
    }
  }
)

onUnmounted(() => {
  stopHandle()
})
</script>

<style scoped></style>
