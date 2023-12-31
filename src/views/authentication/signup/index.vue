<template>
  <div
    class="flex background-color-3061EA w-screen h-screen <2xl:landscape:h-auto overflow-y-no-scrollbar"
  >
    <div
      class="background-color-white grow shrink rounded-0-16-16-0 <lg:portrait:rounded-0 flex flex-col items-center justify-between gap-50"
    >
      <div
        class="2xl:mt-108 xl:mt-55 lg:mt-40 <md:portrait:mt-20 <lg:landscape:mt-30 width-372 <md:portrait:width-306"
      >
        <div
          class="color-primary-dark font-size-32 font-700 line-height-42 cursor-default whitespace-pre-line"
        >
          {{ $t('page.signup.welcome') }}
        </div>
        <div
          class="mt-11 color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
        >
          {{ $t('page.signup.welcomeDescription') }}
        </div>
        <div class="mt-62">
          <div class="flex flex-col gap-5">
            <v-input
              :label="$t('page.signup.form.fullname.label')"
              :value="model.fullname"
              :rules="rules.fullname"
              @update:value="setFullname"
              icon="fullname"
              :placeholder="$t('page.signup.form.fullname.placeholder')"
              type="text"
            />
            <v-input
              :label="$t('page.signup.form.email.label')"
              :value="model.email"
              :rules="rules.email"
              @update:value="setEmail"
              icon="email"
              :placeholder="$t('page.signup.form.email.placeholder')"
              type="text"
            />
            <v-input
              :label="$t('page.signup.form.password.label')"
              :value="model.password"
              :rules="rules.password"
              @update:value="setPassword"
              icon="password"
              :placeholder="$t('page.signup.form.password.placeholder')"
              type="password"
            />
          </div>
          <v-checkbox
            class="mt-13"
            :value="checkboxValue"
            @update:value="setCheckboxValue"
            :options="checkboxOptions"
          />
          <div class="flex gap-9 mt-38">
            <primary-button
              class="h-46px basis-1/2 grow-0 shrink-0 overflow-hidden flex items-center justify-center"
              :label="$t('button.signup')"
              @click="handleSignUpBtnClick"
            />
            <resting-button
              class="h-46px basis-1/2 grow-0 shrink-0 overflow-hidden flex items-center justify-center"
              :label="$t('button.login')"
              @click="handleSignInBtnClick"
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
              {{ $t('page.signup.loginWith') }}
            </div>
          </div>
        </div>
      </div>
      <div class="self-start m-0-0-30-30">
        <lang-button placement="right" show-button-label />
      </div>
    </div>
    <div
      class="basis-9/20 <lg:portrait:basis-0"
      style="
        background: radial-gradient(
          98.58% 98.58% at 57.43% 48.15%,
          #5e81f4 0%,
          #1b51e5 100%
        );
      "
    >
      <svg-signup class="h-full w-full" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import IconLocalTwitter from '@/components/svg/svg-twitter.vue'
import IconLocalGoogle from '@/components/svg/svg-google.vue'
import IconLocalFacebook from '@/components/svg/svg-facebook.vue'
import { $t } from '@/locales'
import { useRouterPush } from '@/composables'

const model = reactive({
  fullname: '',
  email: '',
  password: '',
  agreement: false,
})

const rules: any = {
  fullname: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: 'page.signup.error.fullname.required',
    },
  ],
  email: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: 'page.signup.error.email.required',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: 'page.signup.error.password.required',
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
    label: 'page.signup.form.agreement.label',
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

const { routerPush } = useRouterPush()

function handleSignUpBtnClick() {
  console.log('handleSignUpBtnClick')
}

function handleSignInBtnClick() {
  routerPush({ name: 'login' })
}
</script>

<style lang="scss"></style>
