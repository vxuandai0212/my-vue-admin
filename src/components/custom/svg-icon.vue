<template>
  <template v-if="renderLocalIcon">
    <v-icon :icon="localIcon" />
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Icon } from '@iconify/vue'
import { LocalIcon } from '@/typings/icon'

defineOptions({ name: 'SvgIcon' })

interface Props {
  icon?: string
  localIcon?: LocalIcon
  fill?: string
  width?: string
  height?: string
}

const props = defineProps<Props>()

const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))

const renderLocalIcon = computed(() => props.localIcon || !props.icon)
</script>

<style scoped></style>
