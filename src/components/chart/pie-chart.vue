<template>
  <div ref="pieRef"></div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { type ECOption, useEcharts } from '@/composables'
import { COLOR } from '@/utils'

defineOptions({ name: 'PieChart' })

export interface LineChartProps {
  option: {
    name: string
    data: { name: string; value: number }[]
  }
}

const props = withDefaults(defineProps<LineChartProps>(), {})

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
      color: props.option.data.map((_item, index) => COLOR[index]),
      name: props.option.name,
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
      data: props.option.data,
    },
  ],
}) as Ref<ECOption>
const { domRef: pieRef } = useEcharts(pieOptions)
</script>
