<template>
  <n-config-provider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveThemeOverrides"
    :locale="enUS"
    :date-locale="dateEnUS"
    class="h-full"
  >
    <n-global-style  />
    <naive-provider>
      <router-view />
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateEnUS, enUS } from "naive-ui/es"
import { subscribeStore, useThemeStore } from "@/store"
import { useGlobalEvents } from "@/composables"

const theme = useThemeStore()

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
