<template>
  <div ref="polarBarRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'
import { COLOR } from '@/utils'

defineOptions({ name: 'PolarBarChart' })

export interface LineChartProps {
  option: {
    dimensions: string[]
    source: number[]
  }
}

const props = withDefaults(defineProps<LineChartProps>(), {})

const polarBarOptions = ref<ECOption>({
  polar: {
    radius: [40, '100%'],
  },
  angleAxis: {
    max: 100,
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
    data: props.option.dimensions,
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
    data: props.option.source.map((item, index) => ({
      value: item,
      itemStyle: {
        color: COLOR[index],
        borderRadius: [6.5, 6.5, 6.5, 6.5],
      },
    })),
    barWidth: '10',
    showBackground: true,
    backgroundStyle: {
      color: '#EEEEEE',
    },
    coordinateSystem: 'polar',
  },
}) as Ref<ECOption>
const { domRef: polarBarRef } = useEcharts(polarBarOptions)
</script>
