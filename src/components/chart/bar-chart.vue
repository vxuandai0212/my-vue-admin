<template>
  <div ref="barRef" style="width: 100%"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'

defineOptions({ name: 'BarChart' })

const barOptions = ref<ECOption>({
  grid: {
    bottom: '20px',
    right: '20px',
  },
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['product', '2015', '2016', '2017'],
    source: [
      { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
      { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
      { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 },
    ],
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 13,
      fontWeight: 400,
    },
  },
  yAxis: {
    axisLabel: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 13,
      fontWeight: 400,
    },
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    {
      type: 'bar',
      itemStyle: {
        borderRadius: [6.5, 6.5, 0, 0],
      },
      barWidth: '3',
    },
    {
      type: 'bar',
      itemStyle: {
        borderRadius: [6.5, 6.5, 0, 0],
      },
      barWidth: '3',
    },
    {
      type: 'bar',
      itemStyle: {
        borderRadius: [6.5, 6.5, 0, 0],
      },
      barWidth: '3',
    },
  ],
}) as Ref<ECOption>
const { domRef: barRef } = useEcharts(barOptions)
</script>
