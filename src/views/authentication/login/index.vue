<template>
  <div
    class="flex background-color-3061EA w-screen h-screen overflow-y-no-scrollbar <lg:landscape:h-auto"
  >
    <div
      class="background-color-white grow shrink rounded-0-16-16-0 <lg:portrait:rounded-0 flex flex-col items-center justify-between"
    >
      <div
        class="2xl:mt-108 xl:mt-55 lg:mt-40 md:portrait:mt-140 <md:portrait:mt-20 md:landscape:mt-30 mb-110 width-406 <md:portrait:width-306"
      >
        <div
          class="color-primary-dark font-size-32 font-700 line-height-42 cursor-default whitespace-pre-line"
        >
          {{ $t('page.login.welcome') }}
        </div>
        <div
          class="mt-11 color-primary-grey font-size-14 font-400 line-height-21 cursor-default"
        >
          {{ $t('page.login.welcomeDescription') }}
        </div>
        <div class="mt-62 width-361 <md:portrait:width-290">
          <div class="flex flex-col gap-5">
            <v-input
              :label="$t('page.login.form.email.label')"
              :value="model.email"
              :rules="rules.email"
              @update:value="setEmail"
              icon="email"
              :placeholder="$t('page.login.form.email.placeholder')"
              type="text"
            />
            <v-input
              :label="$t('page.login.form.password.label')"
              :value="model.password"
              :rules="rules.password"
              @update:value="setPassword"
              icon="password"
              :placeholder="$t('page.login.form.password.placeholder')"
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
              {{ $t('page.login.form.recoverPassword.label') }}
            </div>
          </div>
          <div class="flex gap-9 mt-38">
            <primary-button
              class="h-46px basis-1/2 grow-0 shrink-0 overflow-hidden flex items-center justify-center"
              :label="$t('button.login')"
              :loading="auth.loginLoading"
              @click="handleSignInBtnClick"
            />
            <resting-button
              class="h-46px basis-1/2 grow-0 shrink-0 overflow-hidden flex items-center justify-center"
              :label="$t('button.signup')"
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
              {{ $t('page.login.loginWith') }}
            </div>
          </div>
        </div>
      </div>
      <div class="self-start m-0-0-30-30"><lang-button placement="right" /></div>
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
      <svg-login class="h-full w-full" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import IconLocalTwitter from '@/components/svg/svg-twitter.vue'
import IconLocalGoogle from '@/components/svg/svg-google.vue'
import IconLocalFacebook from '@/components/svg/svg-facebook.vue'
import { useAuthStore } from '@/store'
import { $t } from '@/locales'
import { useRouterPush } from '@/composables'

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
      message: 'page.login.error.email.required',
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: 'page.login.error.password.required',
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

const checkboxOptions = reactive([
  {
    key: 1,
    value: 1,
    label: 'page.login.form.rememberLogin.label',
  },
])

function setEmail(v: any) {
  model.email = v
}

function setPassword(v: any) {
  model.password = v
}

const { routerPush } = useRouterPush()

function handleSignUpBtnClick() {
  routerPush({ name: 'signup' })
}

const auth = useAuthStore()
const { login } = useAuthStore()

async function handleSignInBtnClick() {
  const { email, password } = model

  login(email, password)
}
</script>

<style lang="scss"></style>
