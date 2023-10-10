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
          <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-placement="top"
            require-mark-placement="right-hanging"
            label-width="auto"
          >
            <div
              class="mt-13 cursor-pointer flex gap-10 items-center"
              @click="model.agreement = !model.agreement"
            >
              <div
                class="flex justify-center items-center width-20 height-20 transition"
                :style="{
                  background: outerCheckBoxBackground,
                  borderRadius: outerCheckBoxBorderRadius,
                }"
              >
                <div
                  class="width-8 height-8 rounded-10 transition"
                  :style="{ background: innerCheckBoxBackground }"
                ></div>
              </div>
              <div class="color-primary-dark font-size-14 font-700">
                I agree with terms & conditions
              </div>
            </div>
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
          </n-form>
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
  </div>
</template>

<script setup lang="tsx">
import { FormInst } from 'naive-ui'
import { watch } from 'vue'
import { computed, reactive, ref } from 'vue'

const formRef = ref<FormInst | null>(null)

const model = reactive({
  fullname: null,
  email: null,
  password: null,
  agreement: false,
})

const rules: any = {
  fullname: [{
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please enter your full name',
  }],
  email: [{
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please enter your email',
  }],
  password: [{
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please enter your password',
  }],
}

watch(model, () => {
  console.log(model)
})

const innerCheckBoxBackground = computed(() =>
  model.agreement ? '#FFF' : '#EEE'
)
const outerCheckBoxBackground = computed(() =>
  model.agreement ? '#1B51E5' : '#EEE'
)
const outerCheckBoxBorderRadius = computed(() =>
  model.agreement ? '10px' : '4px'
)

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
