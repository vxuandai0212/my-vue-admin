<template>
  <div class="flex justify-between items-center height-84">
    <div class="flex items-center">
      <icon-button icon="hamburger" @click="app.toggleSiderCollapse" />
      <div
        class="ml-20 color-primary-dark font-size-20 font-700 line-height-32 cursor-default"
      >
        {{ routeName }}
      </div>
    </div>
    <div class="flex items-center justify-end gap-6">
      <simple-search />
      <add-button v-if="hasPermission(['admin', 'super'])" />
      <lang-button />
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'CustomHeader' })
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { $t } from '@/locales'
import { usePermission } from '@/composables'

const route = useRoute()

const { hasPermission } = usePermission()

const routeName = computed(() => {
  return $t(route.meta.i18nTitle)
})

const app = useAppStore()
</script>
