<template>
  <div>
    <div
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
          class="flex justify-center items-center width-20 height-20 transition"
          :style="{
            background: outerRadioBackground(item.value),
            borderRadius: outerRadioBorderRadius(item.value),
          }"
        >
          <div
            :class="{ opacity70: disabled }"
            class="width-8 height-8 rounded-10 transition"
            :style="{ background: innerRadioBackground(item.value) }"
          ></div>
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
defineOptions({ name: 'VRadio' })

interface Options {
  key: any
  label: string
  value: any
}

interface Props {
  label?: string
  value: any
  disabled?: boolean
  options: Options[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

interface Emits {
  (e: 'update:value', value: any): void
}

const emit = defineEmits<Emits>()

function isActive(v: any) {
  return v === props.value
}

function setValue(v: any) {
  if (props.disabled) return
  emit('update:value', v)
}

function innerRadioBackground(v: any) {
  return v === props.value ? '#FFF' : '#EEE'
}

function outerRadioBackground(v: any) {
  return v === props.value ? '#1B51E5' : '#EEE'
}
function outerRadioBorderRadius(v: any) {
  return v === props.value ? '10px' : '4px'
}
</script>
