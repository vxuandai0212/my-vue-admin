<template>
  <n-config-provider
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <n-global-style />
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { subscribeStore, useThemeStore } from '@/store'
import { useGlobalEvents } from '@/composables'
import { useNaiveUI } from '@/composables'

const theme = useThemeStore()

const { naiveDateLocale, naiveLocale } = useNaiveUI()

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
