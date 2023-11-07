<template>
  <progress-card
    class="col-span-1 <lg:col-span-3"
    v-for="item in data"
    v-bind="item"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ProgressCardProps } from '@/components/card/progress-card.vue'
import { fetchOverviewStat } from '@/service'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'OverviewStat' })

const progressCards: ProgressCardProps[] = [
  {
    label: 'page.invoice.progress.sale',
    description: 'page.invoice.progress.duration.week',
    value: 0,
    progressColor: 'primary',
    trend: 'up',
    percent: 0,
    backgroundColor: 'white',
  },
  {
    label: 'page.invoice.progress.lead',
    description: 'page.invoice.progress.duration.month',
    value: 0,
    progressColor: 'warning',
    trend: 'down',
    percent: 0,
    backgroundColor: 'white',
  },
  {
    label: 'page.invoice.progress.income',
    description: 'page.invoice.progress.duration.week',
    valuePrefix: '$',
    value: 0,
    progressColor: 'danger',
    trend: 'up',
    percent: 0,
    backgroundColor: 'white',
  },
]


const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  sale: 'page.invoice.progress.sale',
  lead: 'page.invoice.progress.lead',
  profit: 'page.invoice.progress.income',
  weekly: 'page.invoice.progress.duration.week',
  monthly: 'page.invoice.progress.duration.month',
}

const COLOR_MAP: {
  [key: string]: 'primary' | 'warning' | 'danger' | 'success'
} = {
  sale: 'primary',
  lead: 'warning',
  profit: 'danger',
}

const data = ref<ProgressCardProps[]>(progressCards)

function setData(value: ApiReport.OverviewStat[]) {
  data.value = value.map(function (i): ProgressCardProps {
    const label = I18N_MAP[i.type]
    let description = I18N_MAP[i.duration]
    let valuePrefix = i.type === 'sale' || i.type === 'profit' ? '$' : ''
    let value = i.currentValue
    let progressColor = COLOR_MAP[i.type]
    let trend: ProgressCardProps['trend'] =
      i.currentValue > i.previousDurationValue ? 'up' : 'down'
    let percent = (i.currentValue / i.targetValue) * 100
    let backgroundColor = 'white'

    return {
      label,
      description,
      valuePrefix,
      value,
      progressColor,
      trend,
      percent,
      backgroundColor,
    }
  })
}

async function getChartData() {
  const { data } = await fetchOverviewStat()
  if (data) {
    setTimeout(() => {
      setData(data)
    }, 1000)
  }
}

function init() {
  getChartData()
}

init()
</script>
