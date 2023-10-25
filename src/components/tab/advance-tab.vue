<template>
  <div
    class="rounded-12 border-1 border-solid border-color-resting-outline background-color-white flex flex-col"
  >
    <div
      @click="chooseTab(item.key)"
      v-for="(item, index) in tabs"
      class="p-26-33-26-33 flex gap-21 items-center cursor-pointer transition"
      :class="[
        index < tabs.length - 1
          ? 'border-bottom-1 border-bottom-solid border-bottom-color-EEE'
          : '',
      ]"
    >
      <v-icon
        :icon="item.icon"
        class="width-22 transition"
        :class="[item.key === active ? 'fill-primary' : 'fill-primary-grey']"
      />
      <div class="flex flex-col gap-3">
        <div
          class="font-size-14 font-700 transition"
          :class="[
            item.key === active ? 'color-primary' : 'color-primary-dark',
          ]"
        >
          {{ item.label }}
        </div>
        <div class="font-size-12 font-400 color-primary-grey">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { LocalIcon } from '@/typings/icon'

defineOptions({ name: 'AdvanceTab' })

export type Tab = {
  key: any
  label: string
  description: string
  icon: LocalIcon
}

interface Props {
  tabs: Tab[]
  active?: any
}

const props = withDefaults(defineProps<Props>(), {})

const active = ref<any>(props.active)

interface Emits {
  (e: 'update:active-tab', value: any): void
}

const emits = defineEmits<Emits>()

function chooseTab(v: any) {
  active.value = v
  emits('update:active-tab', v)
}
</script>
