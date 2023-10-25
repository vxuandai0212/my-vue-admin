<template>
  <div class="h-full">
    <n-card
      title="markdown plugin"
      :bordered="false"
      class="rounded-8px shadow-sm"
    >
      <div ref="domRef"></div>
      <template #footer>
        <github-link link="https://github.com/Vanessa219/vditor" />
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditor = ref<Vditor>()
const domRef = ref<HTMLElement>()

function renderVditor() {
  if (!domRef.value) return
  vditor.value = new Vditor(domRef.value, {
    minHeight: 400,
    theme: 'classic',
    icon: 'material',
    cache: { enable: false },
  })
}

onMounted(() => {
  renderVditor()
})
</script>

<style scoped></style>
