<template>
  <div
    :style="[`background: var(--${iconBackgroundColor})`]"
    class="flex justify-center items-center width-36 height-36 rounded-6 cursor-pointer"
  >
    <v-icon
      :style="[`fill: var(--${iconFillColor})`]"
      class="width-16 height-16"
      :icon="props.icon"
    />
  </div>
</template>
<script setup lang="ts">
import { Color } from '@/typings/color'
import { LocalIcon } from '@/typings/icon'
defineOptions({ name: 'IconButton' })

interface Props {
  icon: LocalIcon
  iconFillColor?: Color
  iconBackgroundColor?: Color
}

const props = withDefaults(defineProps<Props>(), {
  iconFillColor: 'primary-grey',
  iconBackgroundColor: 'background-3',
})
</script>
