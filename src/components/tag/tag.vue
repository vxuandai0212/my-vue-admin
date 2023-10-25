<template>
  <div
    class="width-145 height-36 rounded-8 flex justify-center items-center font-size-14 font-700 cursor-default"
    :style="{ backgroundColor: `var(--${backgroundColor})`, color: `var(--${textColor})` }"
  >
    {{ $t(label) }}
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import { $t } from '@/locales'

defineOptions({ name: 'Tag' })
interface Props {
  label: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary'
})

const BACKGROUND_COLOR = {
  'primary': 'primary-resting',
  'success': 'sucess-light',
  'warning': 'warning-light',
  'danger': 'danger-light',
  'info': 'background-light',
  'default': 'secondary'
}

const TEXT_COLOR = {
  'primary': 'primary-hard',
  'success': 'success-hard',
  'warning': 'warning',
  'danger': 'danger',
  'info': 'primary-grey',
  'default': 'default'
}

const backgroundColor = computed(() => BACKGROUND_COLOR[props.type])

const textColor = computed(() => TEXT_COLOR[props.type])
</script>
