<template>
  <div ref="lineRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'
import { $t } from '@/locales'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'LineChart' })

export interface LineChartProps {
  option: {
    legend: I18nType.I18nKey[]
    x: string[] | number[]
    y: {
      name: I18nType.I18nKey
      color: string
      data: any[]
    }[]
  }
}

const props = withDefaults(defineProps<LineChartProps>(), {})

const lineOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: props.option.legend.map((i) => $t(i)),
    textStyle: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 14,
      fontWeight: 400,
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: props.option.x,
      axisLabel: {
        fontStyle: 'normal',
        fontFamily: 'Lato',
        fontSize: 13,
        fontWeight: 400,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        fontStyle: 'normal',
        fontFamily: 'Lato',
        fontSize: 13,
        fontWeight: 400,
      },
    },
  ],
  series: props.option.y.map((i) => ({
    color: i.color,
    name: $t(i.name),
    type: 'line',
    smooth: true,
    stack: 'Total',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0.25,
            color: i.color,
          },
          {
            offset: 1,
            color: '#fff',
          },
        ],
      },
    },
    emphasis: {
      focus: 'series',
    },
    data: i.data,
  })),
}) as Ref<ECOption>
const { domRef: lineRef } = useEcharts(lineOptions)
</script>
