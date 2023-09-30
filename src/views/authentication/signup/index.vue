<template>
  <div class="bg-5E81F4">
    <div class="absolute-lt w%-55 bg-FFFFFF">
      <div class="mt-108 w-370 flex-center">
        <div
          style="
            color: #1c1d21;
            font-family: Lato;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 42px;
          "
          class="mt-108"
        >
          Welcome to our CRM. Sign Up to getting started.
        </div>
        <div
          class="mt-11"
          style="
            color: #8181a5;
            font-family: Lato;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 150% */
          "
        >
          Enter your details to proceed further
        </div>
        <div class="mt-62">
          <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-placement="left"
            require-mark-placement="right-hanging"
            label-width="auto"
            :style="{
              maxWidth: '640px',
            }"
          >
            <n-form-item label="Full name" path="fullname">
              <n-input
                v-model:value="model.fullname"
                placeholder="Start typing…"
              >
                <template #suffix> $ </template>
              </n-input>
            </n-form-item>
            <n-form-item label="Email" path="email">
              <n-input
                v-model:value="model.email"
                placeholder="Start typing…"
              />
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input
                type="password"
                v-model:value="model.password"
                show-password-on="mousedown"
                placeholder="Start typing…"
                :maxlength="8"
              />
            </n-form-item>
            <n-checkbox-group v-model:value="model.agreement">
              <n-space>
                <n-checkbox value="accept">
                  I agree with terms & conditions
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
            <div>
              <n-button round type="primary" @click="handleSignUpBtnClick">
                Sign Up
              </n-button>
              <n-button round type="primary" @click="handleSignInBtnClick">
                Sign In
              </n-button>
            </div>
          </n-form>
        </div>
      </div>
    </div>
    <div
      class="absolute-rt w%-45 flex-center"
      style="
        background: radial-gradient(
          98.58% 98.58% at 57.43% 48.15%,
          #5e81f4 0%,
          #1b51e5 100%
        );
      "
    >
      <svg-signup></svg-signup>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { reactive, ref } from 'vue'

const formRef = ref<FormInst | null>(null)

const model = reactive({
  inputValue: null,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null,
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null,
})

const rules: FormRules = {
  inputValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please input inputValue',
  },
  textareaValue: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please input textareaValue',
  },
  selectValue: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please select selectValue',
  },
  multipleSelectValue: {
    type: 'array',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please select multipleSelectValue',
  },
  datetimeValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please input datetimeValue',
  },
  nestedValue: {
    path1: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input nestedValue.path1',
    },
    path2: {
      required: true,
      trigger: ['blur', 'change'],
      message: 'Please input nestedValue.path2',
    },
  },
  checkboxGroupValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: 'Please select checkboxGroupValue',
  },
  radioGroupValue: {
    required: true,
    trigger: 'change',
    message: 'Please select radioGroupValue',
  },
  radioButtonGroupValue: {
    required: true,
    trigger: 'change',
    message: 'Please select radioButtonGroupValue',
  },
  inputNumberValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please input inputNumberValue',
  },
  timePickerValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please input timePickerValue',
  },
  sliderValue: {
    validator(_rule: FormItemRule, value: number) {
      return value > 50
    },
    trigger: ['blur', 'change'],
    message: 'sliderValue should be larger tha 50',
  },
  transferValue: {
    type: 'array',
    required: true,
    trigger: 'change',
    message: 'Please input transferValue',
  },
}
</script>

<style scoped></style>
