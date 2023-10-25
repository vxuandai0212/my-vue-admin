<template>
  <div class="h-full">
    <n-card
      title="Map plugin"
      :bordered="false"
      class="h-full rounded-8px shadow-sm"
      content-style="overflow:hidden"
    >
      <n-tabs
        type="line"
        class="flex-col-stretch h-full"
        pane-class="flex-1-hidden"
      >
        <n-tab-pane
          v-for="item in maps"
          :key="item.id"
          :name="item.id"
          :tab="item.label"
        >
          <component :is="item.component" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { BaiduMap, GaodeMap, TencentMap } from './components'

interface Map {
  id: string
  label: string
  component: Component
}

const maps: Map[] = [
  { id: 'gaode', label: 'Gaode', component: GaodeMap },
  { id: 'tencent', label: 'Tencent', component: TencentMap },
  { id: 'baidu', label: 'Baidu', component: BaiduMap },
]
</script>

<style scoped></style>
