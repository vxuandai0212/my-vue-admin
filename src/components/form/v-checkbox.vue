<template>
  <div>
    <div
      v-if="label"
      class="mb-17 color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
    >
      {{ props.label }}
    </div>
    <div class="flex flex-col gap-10">
      <div
        v-for="item in props.options"
        :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
        class="flex gap-10 items-center"
        @click="setValue(item.value)"
      >
        <div
          :class="{ opacity70: disabled }"
          class="flex justify-center items-center rounded-4 width-20 height-20 transition"
          :style="{
            background: outerCheckboxBackground(item.value),
          }"
        >
          <icon-local-tick
            :class="{ opacity70: disabled }"
            width="10.728px"
            height="8px"
            :fill="isActive(item.value) ? 'white' : '#EEE'"
          />
        </div>
        <div
          :class="[
            { opacity70: disabled },
            isActive(item.value) ? 'color-primary-dark' : 'color-primary-grey',
          ]"
          class="font-size-14 font-700 transition"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'VCheckbox' })

interface Options {
  key: any
  label: string
  value: any
}

interface Props {
  label?: string
  value: Array<any>
  disabled?: boolean
  options: Options[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

console.log(props.disabled)

interface Emits {
  (e: 'update:value', value: any): void
}

const emit = defineEmits<Emits>()

function isActive(v: any) {
  return props.value.indexOf(v) !== -1
}

function setValue(v: any) {
  if (props.disabled) return
  emit('update:value', v)
}

function outerCheckboxBackground(v: any) {
  return isActive(v) ? '#1B51E5' : '#EEE'
}
</script>
