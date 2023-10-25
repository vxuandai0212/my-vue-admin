<template>
  <div class="h-full">
    <n-card
      title="Icon component example"
      :bordered="false"
      class="rounded-8px shadow-sm"
    >
      <div class="grid grid-cols-10">
        <template v-for="item in icons" :key="item">
          <div class="mt-5px flex-x-center">
            <svg-icon :icon="item" class="text-30px" />
          </div>
        </template>
      </div>
      <div class="mt-50px">
        <h1 class="mb-20px text-18px font-500">Icon selector</h1>
        <icon-select v-model:value="selectValue" :icons="icons" />
      </div>
      <template #footer>
        <web-site-link
          label="iconify address:"
          link="https://icones.js.org/"
          class="mt-10px"
        />
      </template>
    </n-card>
    <n-card
      title="Custom icon example"
      :bordered="false"
      class="mt-10px rounded-8px shadow-sm"
    >
      <div class="pb-12px text-16px">
        svg file in the src/assets/svg-icon folder, by entering it in the
        template with icon-local-{file name} is rendered directly, where
        icon-local is in the .env file VITE_ICON_LOCAL_PREFIX
      </div>
      <div class="grid grid-cols-10">
        <div class="mt-5px flex-x-center">
          <icon-local-activity class="text-40px text-success" />
        </div>
        <div class="mt-5px flex-x-center">
          <icon-local-cast class="text-20px text-error" />
        </div>
      </div>
      <div class="py-12px text-16px">
        Dynamically rendered through the SvgIcon component, the menu renders
        custom icons through the localIcon attribute of meta
      </div>
      <div class="grid grid-cols-10">
        <div
          v-for="(fileName, index) in localIcons"
          :key="index"
          class="mt-5px flex-x-center"
        >
          <svg-icon :local-icon="fileName" class="text-30px text-primary" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { icons } from './icons'
import { LocalIcon } from '@/typings/icon'

const selectValue = ref('')

const localIcons: LocalIcon[] = [
  'add',
  'bill',
  'business',
  'calendar',
  'cart',
  'company',
  'contact',
]
</script>

<style scoped></style>
