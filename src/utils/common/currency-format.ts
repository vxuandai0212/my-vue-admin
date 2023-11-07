export function moneyFormat(
  locale: string,
  style: string,
  currency: string,
  value: number
) {
  return new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}
