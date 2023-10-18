<template>
  <div ref="polarBarRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'

defineOptions({ name: 'PolarBarChart' })

const polarBarOptions = ref<ECOption>({
  polar: {
    radius: [30, '80%'],
  },
  angleAxis: {
    max: 4,
    startAngle: 90,
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  radiusAxis: {
    type: 'category',
    data: ['a', 'b', 'c', 'd'],
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: [
      {
        value: 2,
        itemStyle: {
          color: '#FF808B',
          borderRadius: [6.5, 6.5, 6.5, 6.5],
        },
      },
      {
        value: 1.2,
        itemStyle: {
          color: '#9698D6',
          borderRadius: [6.5, 6.5, 6.5, 6.5],
        },
      },
      {
        value: 2.4,
        itemStyle: {
          color: '#5E81F4',
          borderRadius: [6.5, 6.5, 6.5, 6.5],
        },
      },
      {
        value: 3.6,
        itemStyle: {
          color: '#7CE7AC',
          borderRadius: [6.5, 6.5, 6.5, 6.5],
        },
      },
    ],
    barWidth: '8',
    showBackground: true,
    backgroundStyle: {
      color: '#EEEEEE',
    },
    coordinateSystem: 'polar',
  },
}) as Ref<ECOption>
const { domRef: polarBarRef } = useEcharts(polarBarOptions)
</script>
