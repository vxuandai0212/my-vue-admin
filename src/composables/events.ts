import { effectScope, onScopeDispose, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/store'

export function useGlobalEvents() {
  const theme = useThemeStore()
  const route = useRoute()
  const { locale, t } = useI18n()
  const scope = effectScope()

  useEventListener(window, 'beforeunload', () => {
    theme.cacheThemeSettings()
  })

  scope.run(() => {
    watch(
      () => locale.value,
      () => {
        document.title = route.meta.i18nTitle
          ? t(route.meta.i18nTitle)
          : route.meta.title
      }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
