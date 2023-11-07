<template>
  <div>
    <template v-if="!loading">
      <line-chart :option="chartData" class="height-270 grow" />
      <div
        class="height-75 border-top-1 border-top-solid border-top-color-border flex"
      >
        <div
          class="flex flex-col justify-center items-center grow border-right-1 border-right-solid border-right-color-border"
        >
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
            {{ menSale }}
          </div>
          <div class="color-primary-grey font-size-14 font-400 line-height-21">
            {{ $t('page.report.smokingChart.menSale') }}
          </div>
        </div>
        <div class="flex flex-col justify-center items-center grow">
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
            {{ womenSale }}
          </div>
          <div class="color-primary-grey font-size-14 font-400 line-height-21">
            {{ $t('page.report.smokingChart.womenSale') }}
          </div>
        </div>
      </div>
    </template>
    <v-loading class="height-320 grow" v-else />
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchSmoking } from '@/service'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { moneyFormat } from '~/src/utils/common/currency-format'

defineOptions({ name: 'SmokingChart' })

const { locale } = useI18n()
watch(locale, () => {
  getChartData()
})

const { loading, startLoading, endLoading } = useLoading(false)

const chartData = ref()

const fromDate = ref<number>(dayjs().startOf('day').valueOf())
const toDate = ref<number>(dayjs().endOf('day').valueOf())
const menSale = ref<string>()
const womenSale = ref<string>()

function setChartData(data: ApiReport.Smoking) {
  const { x, y, totalMen, totalWomen } = data
  menSale.value = moneyFormat('en-US', 'currency', 'USD', totalMen)
  womenSale.value = moneyFormat('en-US', 'currency', 'USD', totalWomen)
  const { men, women } = y
  chartData.value = {
    legend: [
      $t('page.report.smokingChart.men'),
      $t('page.report.smokingChart.women'),
    ],
    x,
    y: [
      {
        name: $t('page.report.smokingChart.men'),
        data: men,
      },
      {
        name: $t('page.report.smokingChart.women'),
        data: women,
      },
    ],
    yAxis: {
      name: $t('page.report.smokingChart.unit')
    }
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchSmoking(fromDate.value, toDate.value)
  if (data) {
    setTimeout(() => {
      setChartData(data)
      endLoading()
    }, 1000)
  }
}

function init() {
  getChartData()
}

init()
</script>
