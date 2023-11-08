import { useI18n } from 'vue-i18n'

export function useNumber() {
  const { locale } = useI18n()

  const LOCALE_MAP: { [key: string]: string } = {
    vi: 'vi-VN',
    en: 'en-US',
  }

  function moneyFormat(style: string, currency: string, value: number) {
    return new Intl.NumberFormat(LOCALE_MAP[locale.value], {
      style,
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }

  function numberFormat(value: number) {
    return new Intl.NumberFormat(LOCALE_MAP[locale.value], {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value)
  }
  return {
    moneyFormat,
    numberFormat,
  }
}
