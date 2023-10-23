import type { PiniaPluginContext } from 'pinia'
import { cloneDeep } from 'lodash-es'

export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = ['setup-store']

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = cloneDeep($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}
