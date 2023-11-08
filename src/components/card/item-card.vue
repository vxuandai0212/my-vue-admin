<template>
  <div
    class="p-17-20-17-17 background-color-background-1 flex justify-between items-center rounded-12 transition"
  >
    <div class="flex gap-13 items-center">
      <div
        class="flex items-center justify-center width-38 height-38 rounded-8 background-color-primary-resting"
      >
        <v-icon class="fill-primary width-16" :icon="props.icon" />
      </div>
      <div class="color-primary-dark font-size-14 font-700 line-height-21">
        {{ formatLabel }}
      </div>
    </div>
    <div class="color-primary-grey font-size-12 font-700 line-height-18">
      {{ formatValue }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { LocalIcon } from '@/typings/icon'
import { computed } from 'vue'
import { useDatetime, useNumber } from '@/composables'
import { $t } from '@/locales'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'ItemCard' })

export interface ItemCardProps {
  label: I18nType.I18nKey
  value: number
  valueType?: 'number' | 'currency' | 'datetime'
  code?: string
  icon: LocalIcon
}

const props = withDefaults(defineProps<ItemCardProps>(), {
  valueType: 'number',
})

const { timeFromNow } = useDatetime()
const { moneyFormat, numberFormat } = useNumber()

const formatValue = computed(() => {
  if (props.valueType === 'currency') {
    return `+${moneyFormat('currency', 'USD', props.value)}`
  } else if (props.valueType === 'datetime') {
    return timeFromNow(props.value)
  } else {
    return numberFormat(props.value)
  }
})

const formatLabel = computed(() => {
  if (props.label === 'page.report.latestUpdate.itemSale') {
    return `${$t(props.label)} #${props.code}`
  } else {
    return $t(props.label)
  }
})
</script>
