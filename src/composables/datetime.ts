import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { useI18n } from 'vue-i18n'

dayjs.extend(relativeTime)

export function useDatetime() {
  const { locale } = useI18n()

  function datetime(value: any) {
    return dayjs(value).locale(locale.value)
  }

  function now() {
    return dayjs().locale(locale.value)
  }

  function timeFromNow(value: any) {
    return dayjs(value).locale(locale.value).fromNow(true)
  }

  return {
    now,
    datetime,
    timeFromNow
  }
}
