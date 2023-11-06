<template>
  <div class="relative">
    <div
      :class="{ required: isRequired }"
      class="color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
    >
      {{ props.label }}
    </div>
    <div
      ref="inputWrapperRef"
      @click="showDatePicker = true"
      class="transition border-bottom-solid border-bottom-1 p-6-0-17-0 flex flex-row gap-2"
      :style="{ borderBottomColor: borderBottomColor }"
    >
      <input
        class="__input__ flex-grow border-none color-primary-dark font-size-14 font-700"
        type="text"
        :placeholder="placeholder"
        v-model="inputValue"
        :disabled="disabled"
        @focus="inputFocus = true"
        @blur="onBlur"
      />
      <div
        v-if="icon"
        :class="{ opacity70: disabled }"
        class="flex justify-center items-center width-18 height-18"
      >
        <v-icon :icon="icon" :fill="color" />
      </div>
    </div>
    <n-date-picker
      ref="datePickerRef"
      :class="[showDatePicker ? 'opacity-100 z-1' : 'opacity-0 -z-1']"
      class="absolute border-1 border-solid border-color-resting-outline transition"
      @confirm="() => (showDatePicker = false)"
      panel
      :type="type"
    />
    <div
      class="color-danger font-size-14 font-400 line-height-21 transition"
      :style="{ opacity: showError }"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useClick } from '@/hooks'
import { LocalIcon } from '@/typings/icon'

defineOptions({ name: 'VDatepicker' })

type DatepickerType =
  | 'date'
  | 'datetime'
  | 'daterange'
  | 'datetimerange'
  | 'month'
  | 'monthrange'
  | 'year'
  | 'quarter'

interface Props {
  label?: string
  value: any
  rules?: any
  icon?: LocalIcon
  placeholder?: string
  disabled?: boolean
  type: DatepickerType
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  disabled: false,
  type: 'date',
})

interface Emits {
  (e: 'update:value', value: string): void
}

const emit = defineEmits<Emits>()

const datePickerRef = ref(null)

const inputWrapperRef = ref(null)

const showDatePicker = ref<boolean>(false)

const { el } = useClick()

watch(el, (newValue) => {
  if (!showDatePicker.value) return
  const inputWrapperEl: any = inputWrapperRef.value
  const datePickerEl: any = (datePickerRef.value as any).$el
  if (!inputWrapperEl && !datePickerEl) return
  if (
    showDatePicker.value &&
    !inputWrapperEl.contains(newValue) &&
    !datePickerEl.contains(newValue)
  ) {
    showDatePicker.value = false
  }
})

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

const errorMessage = ref<string>()

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
