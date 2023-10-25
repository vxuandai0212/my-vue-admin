<template>
  <div class="h-full">
    <n-card
      title="Text copy"
      :bordered="false"
      class="h-full rounded-8px shadow-sm"
    >
      <n-input-group>
        <n-input
          v-model:value="source"
          placeholder="Please enter the content you want to copy"
        />
        <n-button type="primary" @click="handleCopy">Copy</n-button>
      </n-input-group>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

const source = ref('')
const { copy, isSupported } = useClipboard()

function handleCopy() {
  if (!isSupported) {
    window.$message?.error('Your browser does not support the Clipboard API')
    return
  }
  if (!source.value) {
    window.$message?.error('Please enter the content you want to copy')
    return
  }
  copy(source.value)
  window.$message?.success(`Copied successfully: ${source.value}`)
}
</script>

<style scoped></style>
