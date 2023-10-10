<template>
  <div class="flex background-color-3061EA w-screen min-h-screen">
    <div
      class="background-color-white w%-55 rounded-0-16-16-0 flex justify-center"
    >
      <div class="mt-108 mb-110 width-371">
        <div
          class="color-primary-dark font-size-32 font-700 line-height-42 cursor-default"
        >
          Welcome to our CRM. Sign Up to getting started.
        </div>
        <div
          class="mt-11 color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
        >
          Enter your details to proceed further
        </div>
        <div class="mt-62">
          <div class="flex flex-col gap-5">
            <v-input
              label="Full name"
              :value="model.fullname"
              :rules="rules.fullname"
              @update:value="setFullname"
              icon="fullname"
              placeholder="Start typing…"
              type="text"
            />
            <v-input
              label="Email"
              :value="model.email"
              :rules="rules.email"
              @update:value="setEmail"
              icon="email"
              placeholder="Start typing…"
              type="text"
            />
            <v-input
              label="Password"
              :value="model.password"
              :rules="rules.password"
              @update:value="setPassword"
              icon="password"
              placeholder="Start typing…"
              type="password"
            />
          </div>
          <v-checkbox
            class="mt-13"
            :value="checkboxValue"
            @update:value="setCheckboxValue"
            :options="checkboxOptions"
          />
          <div class="flex justify-between mt-38">
            <div
              class="cursor-pointer font-700 hover:background-color-primary-hover rounded-8 font-size-14 background-color-primary p-14-64-15-65 color-white transition"
              @click="handleSignUpBtnClick"
            >
              Sign Up
            </div>
            <div
              class="cursor-pointer hover:background-color-primary-hover hover:color-white p-14-69-15-67 color-primary background-color-primary-resting font-size-14 font-700 rounded-8 transition"
              @click="handleSignInBtnClick"
            >
              Sign In
            </div>
          </div>
          <div class="mt-77 flex gap-13 items-center">
            <div class="flex flex-row gap-6 justify-left">
              <div
                class="group border border-solid border-color-resting-outline hover:border-color-primary rounded-8 width-46 height-46 flex justify-center items-center cursor-pointer transition"
              >
                <icon-local-twitter
                  class="fill-primary-grey group-hover:fill-primary-dark transition"
                />
              </div>
              <div
                class="group border border-solid border-color-resting-outline hover:border-color-primary rounded-8 width-46 height-46 flex justify-center items-center cursor-pointer transition"
              >
                <icon-local-google
                  class="fill-primary-grey group-hover:fill-primary-dark transition"
                />
              </div>
              <div
                class="group border border-solid border-color-resting-outline hover:border-color-primary rounded-8 width-46 height-46 flex justify-center items-center cursor-pointer transition"
              >
                <icon-local-facebook
                  class="fill-primary-grey group-hover:fill-primary-dark transition"
                />
              </div>
            </div>
            <div
              class="color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
            >
              Or sign in with
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        background: radial-gradient(
          98.58% 98.58% at 57.43% 48.15%,
          #5e81f4 0%,
          #1b51e5 100%
        );
      "
    >
      <svg-signup width="45vw" />
    </div>
    <!-- todo: select, select autocomplete, tag, datepicker, datetime picker, tab, table, pagination -->
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { reactive } from 'vue'

const model = reactive({
  fullname: 'aaa',
  email: null,
  password: null,
  agreement: false,
})

const rules: any = {
  fullname: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter your full name',
    },
  ],
  email: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please enter your email',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: 'Please enter your password',
    },
  ],
}

const checkboxValue = ref<Array<any>>([1])
function setCheckboxValue(v: any) {
  if (checkboxValue.value.indexOf(v) === -1) {
    checkboxValue.value.push(v)
  } else {
    checkboxValue.value = checkboxValue.value.filter((i) => i !== v)
  }
}

const checkboxOptions = [
  {
    key: 1,
    value: 1,
    label: 'I agree with terms & conditions',
  },
]

function setFullname(v: any) {
  model.fullname = v
}

function setEmail(v: any) {
  model.email = v
}

function setPassword(v: any) {
  model.password = v
}

function handleSignUpBtnClick() {
  console.log('handleSignUpBtnClick')
}

function handleSignInBtnClick() {
  console.log('handleSignInBtnClick')
}
</script>

<style lang="scss"></style>
