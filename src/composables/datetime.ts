import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useI18n } from 'vue-i18n'

export function useDatetime() {
  const { locale } = useI18n()

  function datetime(value: any) {
    return dayjs(value).locale(locale.value)
  }

  return {
    datetime
  }
}
