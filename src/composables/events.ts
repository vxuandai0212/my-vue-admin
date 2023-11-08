import { effectScope, onScopeDispose, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export function useGlobalEvents() {
  const route = useRoute()
  const { locale, t } = useI18n()
  const scope = effectScope()

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
