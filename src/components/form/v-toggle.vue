<template>
  <div>
    <div
      :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
      class="flex gap-18 items-center"
      @click="setValue"
    >
      <div
        :class="{ opacity70: disabled }"
        class="relative rounded-12 width-40 height-22 transition"
        :style="{
          background: outerCheckboxBackground,
        }"
      >
        <icon-local-oval
          :class="[
            { opacity70: disabled },
            'ease-linear duration-150 delay-0 absolute top-3',
            isActive ? 'left-20' : 'left-4',
          ]"
          width="16px"
          height="16px"
          :fill="isActive ? 'white' : '#98A9BC'"
        />
      </div>
      <div
        :class="[
          { opacity70: disabled },
          isActive ? 'color-primary-dark' : 'color-primary-grey',
        ]"
        class="font-size-14 font-700"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'VToggle' })

interface Props {
  label: string
  value: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: false,
  disabled: false,
})

interface Emits {
  (e: 'update:value', value: any): void
}

const emit = defineEmits<Emits>()

const isActive = computed(() => props.value)

function setValue() {
  if (props.disabled) return
  emit('update:value', !props.value)
}

const outerCheckboxBackground = computed(() =>
  props.value ? '#1B51E5' : '#EEEEEE'
)
</script>
