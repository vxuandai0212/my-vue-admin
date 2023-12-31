<template>
  <div>
    <div
      :class="{ required: isRequired }"
      class="color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
    >
      {{ props.label }}
    </div>
    <div
      class="transition border-bottom-solid border-bottom-1 p-6-0-17-0 flex flex-row gap-2"
      :style="{ borderBottomColor: borderBottomColor }"
    >
      <input
        class="__input__ flex-grow border-none color-primary-dark font-size-14 font-700"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        :disabled="disabled"
        @focus="inputFocus = true"
        @blur="onBlur"
        @input="validate()"
      />
      <div
        v-if="icon"
        :class="{ opacity70: disabled }"
        class="flex justify-center items-center width-18 height-18"
      >
        <v-icon :icon="icon" :fill="color" />
      </div>
    </div>
    <div
      class="color-danger font-size-14 font-400 line-height-21 transition"
      :style="{ opacity: showError }"
    >
      {{ $t(errorMessage) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { LocalIcon } from '@/typings/icon'
import { $t } from '@/locales'

defineOptions({ name: 'VInput' })

type InputType = 'text' | 'password'

interface Props {
  label?: string
  value: any
  rules?: any
  icon?: LocalIcon
  placeholder?: string
  type?: InputType
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  disabled: false,
  type: 'text',
})

interface Emits {
  (e: 'update:value', value: string): void
}

const emit = defineEmits<Emits>()

const isRequired = computed(() => {
  if (props.rules && props.rules.length > 0) {
    for (let i = 0; i < props.rules.length; i++) {
      if ('required' in props.rules[i] && props.rules[i].required) {
        errorMessage.value = props.rules[i].message
        return true
      }
    }
  }
  return false
})

const inputFocus = ref<boolean>()

const error = ref<boolean>(false)

const errorMessage = ref<string>('')

const inputValue = computed({
  get() {
    return props.value
  },
  set(newValue: string) {
    emit('update:value', newValue)
  },
})

function validate() {
  if (isRequired && !inputValue.value) {
    error.value = true
  } else {
    error.value = false
  }
}

function onBlur() {
  inputFocus.value = false
  validate()
}

const showError = computed(() => (error.value ? 1 : 0))

const color = computed(() =>
  inputValue.value && inputValue.value.trim() !== ''
    ? 'var(--primary-dark)'
    : 'var(--primary-grey)'
)

const borderBottomColor = computed(() =>
  error.value
    ? 'var(--danger)'
    : inputFocus.value
    ? 'var(--primary)'
    : 'var(--outline)'
)
</script>
<style scoped></style>
