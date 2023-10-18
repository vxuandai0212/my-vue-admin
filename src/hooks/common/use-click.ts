import { ref } from 'vue'

export default function useClick() {
  const el = ref<EventTarget | null>(null)

  document.addEventListener('click', (e) => (el.value = e.target), false)

  return {
    el,
  }
}
