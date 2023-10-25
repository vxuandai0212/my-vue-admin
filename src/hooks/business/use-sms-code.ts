import { computed } from 'vue'
import { REGEXP_PHONE } from '@/config'
import { fetchSmsCode } from '@/service'
import { useLoading } from '@/hooks/common'
import useCountDown from '@/hooks/business/use-count-down'

export default function useSmsCode() {
  const { loading, startLoading, endLoading } = useLoading()
  const { counts, start, isCounting } = useCountDown(60)

  const initLabel = 'Get verification code'
  const countingLabel = (second: number) => `Retrieve after ${second} seconds`
  const label = computed(() => {
    let text = initLabel
    if (loading.value) {
      text = ''
    }
    if (isCounting.value) {
      text = countingLabel(counts.value)
    }
    return text
  })

  function isPhoneValid(phone: string) {
    let valid = true
    if (phone.trim() === '') {
      window.$message?.error('Phone number can not be blank!')
      valid = false
    } else if (!REGEXP_PHONE.test(phone)) {
      window.$message?.error('Wrong format of phone number!')
      valid = false
    }
    return valid
  }

  async function getSmsCode(phone: string) {
    const valid = isPhoneValid(phone)
    if (!valid || loading.value) return

    startLoading()
    const { data } = await fetchSmsCode(phone)
    if (data) {
      window.$message?.success('Verification code sent successfully!')
      start()
    }
    endLoading()
  }

  return {
    label,
    start,
    isCounting,
    getSmsCode,
    loading,
  }
}
