<template>
  <div ref="lineRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'
import { $t } from '@/locales'

defineOptions({ name: 'LineChart' })

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
    data: [$t('page.invoice.table.header.customer'), $t('page.invoice.table.header.amount')],
    textStyle: {
      fontStyle: 'normal',
      fontFamily: 'Lato',
      fontSize: 14,
      fontWeight: 400
    }
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
      data: [
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ],
      axisLabel: {
        fontStyle: 'normal',
        fontFamily: 'Lato',
        fontSize: 13,
        fontWeight: 400
      }
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        fontStyle: 'normal',
        fontFamily: 'Lato',
        fontSize: 13,
        fontWeight: 400
      }
    },
  ],
  series: [
    {
      color: '#8e9dff',
      name: $t('page.invoice.table.header.customer'),
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
              color: '#8e9dff',
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
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
    },
    {
      color: '#26deca',
      name: $t('page.invoice.table.header.amount'),
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
              color: '#26deca',
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
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
    },
  ],
}) as Ref<ECOption>
const { domRef: lineRef } = useEcharts(lineOptions)
</script>
