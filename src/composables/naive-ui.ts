import { dateEnUS, enUS, dateViVN, viVN } from 'naive-ui/es'
import type { NDateLocale, NLocale } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { effectScope, onScopeDispose, ref, watch } from 'vue'
import { I18nType } from '@/typings/system'

export function useNaiveUI() {
  const { locale } = useI18n()
  const scope = effectScope()

  type NaiveLocaleConfig = {
    [key in I18nType.LangType]: {
      locale: NLocale
      dateLocale: NDateLocale
    }
  }

  const naiveLocaleConfig: NaiveLocaleConfig = {
    vi: {
      locale: viVN,
      dateLocale: dateViVN,
    },
    en: {
      locale: enUS,
      dateLocale: dateEnUS,
    },
  }

  const naiveLocale = ref<NLocale>(viVN)
  const naiveDateLocale = ref<NDateLocale>(dateViVN)

  scope.run(() => {
    watch(
      () => locale.value,
      () => {
        naiveLocale.value =
          naiveLocaleConfig[locale.value as I18nType.LangType].locale
        naiveDateLocale.value =
          naiveLocaleConfig[locale.value as I18nType.LangType].dateLocale
      }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    naiveLocale,
    naiveDateLocale,
  }
}
