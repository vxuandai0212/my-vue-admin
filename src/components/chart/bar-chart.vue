<template>
  <div ref="barRef" style="width: 100%"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'

defineOptions({ name: 'BarChart' })

export interface LineChartProps {
  option: {
    dimensions: string[]
    source: { [key: string]: any }
    yAxis?: {
      name?: string
    }
  }
}

const props = withDefaults(defineProps<LineChartProps>(), {})

const barOptions = ref<ECOption>({
  grid: {
    bottom: '20px',
    right: '20px',
  },
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: props.option.dimensions,
    source: props.option.source,
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
    name: props.option.yAxis?.name,
    axisLabel: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 13,
      fontWeight: 400,
    },
    nameLocation: 'end',
    nameTextStyle: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 13,
      fontWeight: 400,
      align: 'left',
    },
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: props.option.dimensions.map(() => ({
    type: 'bar',
    itemStyle: {
      borderRadius: [6.5, 6.5, 0, 0],
    },
    barWidth: '5',
  })),
}) as Ref<ECOption>
const { domRef: barRef } = useEcharts(barOptions)
</script>
