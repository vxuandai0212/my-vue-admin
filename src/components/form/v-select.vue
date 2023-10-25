<template>
  <div>
    <div
      :class="{ required: isRequired }"
      class="color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
    >
      {{ props.label }}
    </div>
    <n-dropdown
      style="max-height: 265px; overflow-y: auto"
      trigger="click"
      :options="options"
      size="large"
      :show="showDropdown"
      :on-clickoutside="() => (showDropdown = false)"
      :render-option="renderOption"
    >
      <div
        @click="showDropdown = true"
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
    </n-dropdown>
    <div
      class="color-danger font-size-14 font-400 line-height-21 transition"
      :style="{ opacity: showError }"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { LocalIcon } from '@/typings/icon'

defineOptions({ name: 'VSelect' })

interface Props {
  label?: string
  value: any
  rules?: any
  icon?: LocalIcon
  placeholder?: string
  disabled?: boolean
  options: any
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  disabled: false,
})

interface Emits {
  (e: 'update:value', value: string): void
}

const emit = defineEmits<Emits>()

const showDropdown = ref<boolean>(false)

function renderOption(arg: any) {
  const color =
    arg.option.type === 'warning'
      ? 'warning'
      : arg.option.type === 'danger'
      ? 'danger'
      : 'primary-dark'
  return h(
    'div',
    {
      style: `color: var(--${color});`,
      class: `cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary width-300 hover:background-color-background-extra-light transition`,
      onClick: () => {
        // emit
        inputValue.value = arg.option.label
        showDropdown.value = false
      },
    },
    arg.option.label
  )
}

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
