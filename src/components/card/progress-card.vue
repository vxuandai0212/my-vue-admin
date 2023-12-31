<template>
  <div
    class="height-98 p-14-22-20-26 flex flex-col grow gap-15 rounded-12 transition"
    :class="[`background-color-${props.backgroundColor}`]"
  >
    <div class="flex justify-between items-center">
      <div>
        <div class="color-primary-dark font-size-18 font-700 line-height-27">
          {{ $t(label) }}
        </div>
        <div class="color-primary-grey font-size-14 font-400 line-height-21">
          {{ $t(description) }}
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="color-primary-dark font-size-20 font-700 line-height-32">
          {{ valuePrefix }}{{ formatValue }}
        </div>
        <v-icon
          icon="arrow"
          width="12px"
          height="12px"
          :style="{ fill: trendColor }"
          :class="[trend === 'down' ? 'rotate-x-180' : '']"
        />
      </div>
    </div>
    <n-progress
      type="line"
      :color="COLOR[progressColor]"
      rail-color="#F6F6F6"
      :height="4"
      :percentage="props.percent"
      :show-indicator="false"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { $t } from '@/locales'
import { I18nType } from '@/typings/system'
import { useNumber } from '@/composables'

defineOptions({ name: 'ProgressCard' })

export interface ProgressCardProps {
  label: I18nType.I18nKey
  description: I18nType.I18nKey
  valuePrefix?: string
  value?: number | string
  valueType?: 'currency' | 'number'
  currencyType?: 'USD' | 'VND'
  progressColor: 'primary' | 'warning' | 'danger' | 'success'
  trend: 'up' | 'down'
  percent: number
  backgroundColor: string
}

const COLOR = {
  primary: '#5E81F4',
  success: '#7CE7AC',
  danger: '#FF808B',
  warning: '#F4BE5E',
}

const props = withDefaults(defineProps<ProgressCardProps>(), {
  progressColor: 'primary',
  trend: 'up',
  percent: 60,
  backgroundColor: 'background-extra-light',
  valueType: 'number',
  currencyType: 'USD',
})

const { numberFormat, moneyFormat } = useNumber()

const trendColor = computed(() =>
  props.trend === 'up' ? '#7CE7AC' : '#FF808B'
)

const formatValue = computed(() => {
  if (props.valueType === 'currency') {
    return moneyFormat('currency', props.currencyType, props.value as number)
  } else {
    return numberFormat(props.value as number)
  }
})
</script>
