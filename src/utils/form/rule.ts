import type { Ref } from 'vue'
import type { FormItemRule } from 'naive-ui'
import {
  REGEXP_CODE_SIX,
  REGEXP_EMAIL,
  REGEXP_PHONE,
  REGEXP_PWD,
} from '@/config'

export const createRequiredFormRule = (
  message = 'Can not be empty'
): FormItemRule => ({ required: true, message })

export const requiredFormRule = createRequiredFormRule()

interface CustomFormRules {
  phone: FormItemRule[]
  pwd: FormItemRule[]
  code: FormItemRule[]
  email: FormItemRule[]
}

export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule('Please enter the phone number'),
    {
      pattern: REGEXP_PHONE,
      message: 'Wrong format of phone number',
      trigger: 'input',
    },
  ],
  pwd: [
    createRequiredFormRule('Please enter password'),
    {
      pattern: REGEXP_PWD,
      message:
        'Password is 6-18 digits/characters/symbols, at least 2 combinations',
      trigger: 'input',
    },
  ],
  code: [
    createRequiredFormRule('Please enter verification code'),
    {
      pattern: REGEXP_CODE_SIX,
      message: 'Verification code format error',
      trigger: 'input',
    },
  ],
  email: [
    { pattern: REGEXP_EMAIL, message: 'Email format error', trigger: 'blur' },
  ],
}

function isBlankString(str: string) {
  return str.trim() === ''
}

export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: 'Please enter the confirmation password' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: 'The entered value is inconsistent with the password',
      trigger: 'input',
    },
  ]
  return confirmPwdRule
}

export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: 'Please enter verification code' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: 'Incorrect verification code',
      trigger: 'blur',
    },
  ]
  return imgCodeRule
}
