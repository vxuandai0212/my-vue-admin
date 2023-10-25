import { ref } from 'vue'
import type { Ref } from 'vue'
import { useContext } from '@/hooks'

interface DemoContext {
  counts: Ref<number>
  setCounts: (count: number) => void
}

const { useProvide: useDemoProvide, useInject: useDemoInject } =
  useContext<DemoContext>()

export function useDemoContext() {
  const counts = ref(0)

  function setCounts(count: number) {
    counts.value = count
  }

  const demoContext: DemoContext = {
    counts,
    setCounts,
  }

  function useProvide() {
    return useDemoProvide(demoContext)
  }

  return {
    useProvide,
    useInject: useDemoInject,
  }
}
