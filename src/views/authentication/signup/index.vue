<template>
  <div
    style="background-color: #3061ea; width: 100vw; height: 100vh"
    class="flex"
  >
    <div
      style="
        background-color: #fff;
        width: 55%;
        border-radius: 0 16px 16px 0;
        display: flex;
        justify-content: center;
      "
    >
      <div style="margin-top: 108px; width: 371px">
        <div
          style="
            color: #1c1d21;
            font-family: Lato;
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 42px;
            cursor: default;
          "
        >
          Welcome to our CRM. Sign Up to getting started.
        </div>
        <div
          style="
            margin-top: 11px;
            color: #8181a5;
            font-family: Lato;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 150% */
            cursor: default;
          "
        >
          Enter your details to proceed further
        </div>
        <div style="margin-top: 62px">
          <div style="display: flex; flex-direction: column; gap: 5px">
            <div>
              <div
                class="required"
                style="
                  color: #8181a5;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  cursor: default;
                "
              >
                Full name
              </div>
              <div
                style="
                  transition: border-bottom-color 0.3s
                    cubic-bezier(0.4, 0, 0.2, 1);
                  border-bottom-style: solid;
                  border-bottom-width: 1px;
                  padding: 6px 0 17px 0;
                  position: relative;
                "
                :style="{ borderBottomColor: borderBottomColor }"
              >
                <div style="position: absolute; right: 0; bottom: 19px">
                  <icon-local-fullname :fill="color" />
                </div>
                <input
                  class="__input__"
                  style="
                    border: none;
                    color: #1c1d21;
                    font-family: Lato;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    width: 100%;
                    padding-right: 22px;
                  "
                  type="text"
                  placeholder="Start typing…"
                  v-model="model.fullname"
                  @focus="inputFocus = true"
                  @blur="onBlur"
                  @input="validate()"
                />
              </div>
              <div
                style="
                  color: #ff808b;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                "
                :style="{ opacity: showError }"
              >
                Please enter your full name
              </div>
            </div>
            <div>
              <div
                class="required"
                style="
                  color: #8181a5;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  cursor: default;
                "
              >
                Email
              </div>
              <div
                style="
                  transition: border-bottom-color 0.3s
                    cubic-bezier(0.4, 0, 0.2, 1);
                  border-bottom-style: solid;
                  border-bottom-width: 1px;
                  padding: 6px 0 17px 0;
                  position: relative;
                "
                :style="{ borderBottomColor: borderBottomColor }"
              >
                <div style="position: absolute; right: 0; bottom: 19px">
                  <icon-local-email :fill="color" />
                </div>
                <input
                  class="__input__"
                  style="
                    border: none;
                    color: #1c1d21;
                    font-family: Lato;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    width: 100%;
                    padding-right: 22px;
                  "
                  type="text"
                  placeholder="Start typing…"
                  v-model="model.fullname"
                  @focus="inputFocus = true"
                  @blur="onBlur"
                  @input="validate()"
                />
              </div>
              <div
                style="
                  color: #ff808b;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                "
                :style="{ opacity: showError }"
              >
                Please enter your email
              </div>
            </div>
            <div>
              <div
                class="required"
                style="
                  color: #8181a5;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  cursor: default;
                "
              >
                Password
              </div>
              <div
                style="
                  transition: border-bottom-color 0.3s
                    cubic-bezier(0.4, 0, 0.2, 1);
                  border-bottom-style: solid;
                  border-bottom-width: 1px;
                  padding: 6px 0 17px 0;
                  position: relative;
                "
                :style="{ borderBottomColor: borderBottomColor }"
              >
                <div style="position: absolute; right: 0; bottom: 19px">
                  <icon-local-email :fill="color" />
                </div>
                <input
                  class="__input__"
                  style="
                    border: none;
                    color: #1c1d21;
                    font-family: Lato;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    width: 100%;
                    padding-right: 22px;
                  "
                  type="password"
                  placeholder="Start typing…"
                  v-model="model.fullname"
                  @focus="inputFocus = true"
                  @blur="onBlur"
                  @input="validate()"
                />
              </div>
              <div
                style="
                  color: #ff808b;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                "
                :style="{ opacity: showError }"
              >
                Please enter your password
              </div>
            </div>
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
              style="
                margin-top: 13px;
                cursor: pointer;
                display: flex;
                gap: 10px;
                align-items: center;
              "
              @click="model.agreement = !model.agreement"
            >
              <div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 20px;
                  height: 20px;
                  transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                "
                :style="{
                  background: outerCheckBoxBackground,
                  borderRadius: outerCheckBoxBorderRadius,
                }"
              >
                <div
                  style="
                    width: 8px;
                    height: 8px;
                    border-radius: 10px;
                    transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  "
                  :style="{ background: innerCheckBoxBackground }"
                ></div>
              </div>
              <div
                style="
                  color: #1c1d21;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                "
              >
                I agree with terms & conditions
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 38px;
              "
            >
              <div
                style="
                  cursor: pointer;
                  padding: 14px 64px 15px 65px;
                  color: #ffffff;
                  background-color: #5e81f4;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                  border-radius: 8px;
                "
                @click="handleSignUpBtnClick"
              >
                Sign Up
              </div>
              <div
                style="
                  cursor: pointer;
                  padding: 14px 69px 15px 67px;
                  color: #5e81f4;
                  background: linear-gradient(
                      0deg,
                      rgba(94, 129, 244, 0.1) 0%,
                      rgba(94, 129, 244, 0.1) 100%
                    ),
                    #fff;
                  font-family: Lato;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 700;
                  line-height: normal;
                  border-radius: 8px;
                "
                @click="handleSignInBtnClick"
              >
                Sign In
              </div>
            </div>
            <div
              style="
                margin-top: 77px;
                display: flex;
                gap: 13px;
                align-items: center;
              "
            >
              <div class="flex flex-row flex-col-gap-6 justify-left">
                <div
                  style="
                    border: 1px solid #ececf2;
                    border-radius: 8px;
                    width: 46px;
                    height: 46px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  "
                >
                  <icon-local-twitter />
                </div>
                <div
                  style="
                    border: 1px solid #ececf2;
                    border-radius: 8px;
                    width: 46px;
                    height: 46px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  "
                >
                  <icon-local-google />
                </div>
                <div
                  style="
                    border: 1px solid #ececf2;
                    border-radius: 8px;
                    width: 46px;
                    height: 46px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  "
                >
                  <icon-local-facebook />
                </div>
              </div>
              <div
                style="
                  color: #8181a5;
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 21px;
                  cursor: default;
                "
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
      <svg-signup width="45vw" height="100vh" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { FormInst, FormRules } from 'naive-ui'
import { watch } from 'vue'
import { computed, reactive, ref } from 'vue'

const formRef = ref<FormInst | null>(null)

const model = reactive({
  fullname: null,
  email: null,
  password: null,
  agreement: false,
})

const rules: FormRules = {
  fullname: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please enter your fullname',
  },
  email: {
    required: true,
    trigger: ['blur', 'input'],
    message: 'Please enter your email',
  },
  password: {
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please enter your password',
  },
  agreement: {
    type: 'boolean',
    required: true,
    trigger: 'change',
    message: 'Please agree with our terms & conditions',
  },
}

watch(model, () => {
  console.log(model)
})

const color = computed(() => (model.fullname ? '#1C1D21' : '#8181A5'))

const innerCheckBoxBackground = computed(() =>
  model.agreement ? '#FFF' : '#EEE'
)
const outerCheckBoxBackground = computed(() =>
  model.agreement ? '#1B51E5' : '#EEE'
)
const outerCheckBoxBorderRadius = computed(() =>
  model.agreement ? '10px' : '4px'
)

const inputFocus = ref<boolean>()

const borderBottomColor = computed(() =>
  error.value ? '#FF808B' : inputFocus.value ? '#5E81F4' : '#f0f0f3'
)

const error = ref<boolean>(false)

function validate() {
  if (!model.fullname) {
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

function handleSignUpBtnClick() {
  console.log('handleSignUpBtnClick')
}

function handleSignInBtnClick() {
  console.log('handleSignInBtnClick')
}
</script>

<style lang="scss">
.__input__ {
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #8181a5;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
.required:after {
  content: ' *';
  color: #ff808b;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: none;
  -webkit-text-fill-color: #1c1d21;
  -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
