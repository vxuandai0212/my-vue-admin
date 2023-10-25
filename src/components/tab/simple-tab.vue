<template>
  <div class="flex gap-6">
    <div
      v-for="item in tabs"
      class="hover:background-color-info hover:border-color-info hover:color-white cursor-pointer rounded-8 border-1 border-solid p-11-29-11-29 font-size-14 font-700 transition"
      :class="[
        item.value === activeTab
          ? 'color-primary-dark border-color-resting-outline'
          : 'color-primary-grey border-color-white',
      ]"
      @click="chooseTab(item.value)"
    >
      {{ $t(item.label) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { $t } from '@/locales'

defineOptions({ name: 'SimpleTab' })

export interface SimpleTabItem {
  label: string
  value: any
}

export interface SimpleTabProps {
  tabs: SimpleTabItem[]
  initActiveTab: any
}

const props = withDefaults(defineProps<SimpleTabProps>(), {})

const activeTab = ref<string>(props.initActiveTab)

function chooseTab(v: any) {
  activeTab.value = v
}
</script>
