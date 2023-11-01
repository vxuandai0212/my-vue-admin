<template>
  <div ref="pieRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'
import { $t } from '@/locales'

defineOptions({ name: 'PieChart' })

const pieOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0,
    },
  },
  series: [
    {
      color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
      name: $t('page.invoice.detail.activity'),
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
      },
      bottom: 30,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 20, name: $t('page.invoice.table.header.customer') },
        { value: 10, name: $t('page.invoice.table.header.amount') },
        { value: 30, name: $t('page.invoice.table.header.status') },
        { value: 40, name: $t('page.invoice.table.header.date') },
      ],
    },
  ],
}) as Ref<ECOption>
const { domRef: pieRef } = useEcharts(pieOptions)
</script>
