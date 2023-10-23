<template>
  <div class="flex background-color-3061EA w-screen min-h-screen">
    <div
      class="background-color-white w%-55 rounded-0-16-16-0 flex justify-center"
    >
      <div class="mt-108 mb-110 width-405">
        <div
          class="color-primary-dark font-size-32 font-700 line-height-42 cursor-default"
        >
          Welcome to our CRM. <br />
          Sign In to see latest updates.
        </div>
        <div
          class="mt-11 color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
        >
          Enter your details to proceed further
        </div>
        <div class="mt-62 width-361">
          <div class="flex flex-col gap-5">
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
          <div class="flex justify-between items-center mt-13">
            <v-checkbox
              :value="checkboxValue"
              @update:value="setCheckboxValue"
              :options="checkboxOptions"
            />
            <div
              class="cursor-pointer color-primary hover:color-primary-hover font-size-14 font-700"
            >
              Recover password
            </div>
          </div>
          <div class="flex justify-between mt-38">
            <primary-button
              class="p-14-64-15-64"
              label="Sign In"
              :loading="auth.loginLoading"
              @click="handleSignInBtnClick"
            />
            <resting-button
              class="p-14-64-15-64"
              label="Sign Up"
              @click="handleSignUpBtnClick"
            />
          </div>
          <div class="mt-77 flex gap-13 items-center">
            <div class="flex flex-row gap-6 justify-left">
              <div
                v-for="item in icons"
                class="group border border-solid border-color-resting-outline hover:border-color-primary rounded-8 width-46 height-46 flex justify-center items-center cursor-pointer transition"
              >
                <component
                  :is="item.component"
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
      <svg-login width="45vw" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { reactive } from 'vue'
import IconLocalTwitter from '@/components/svg/svg-twitter.vue'
import IconLocalGoogle from '@/components/svg/svg-google.vue'
import IconLocalFacebook from '@/components/svg/svg-facebook.vue'
import { useAuthStore } from '~/src/store'

const model = reactive({
  email: '',
  password: '',
  agreement: false,
})

const rules: any = {
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

const icons = [
  { component: IconLocalTwitter },
  { component: IconLocalGoogle },
  { component: IconLocalFacebook },
]

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
    label: 'Remember me',
  },
]

function setEmail(v: any) {
  model.email = v
}

function setPassword(v: any) {
  model.password = v
}

function handleSignUpBtnClick() {
  console.log('handleSignUpBtnClick')
}

const auth = useAuthStore()
const { login } = useAuthStore()

async function handleSignInBtnClick() {
  const { email, password } = model

  login(email, password)
}
</script>

<style lang="scss"></style>
