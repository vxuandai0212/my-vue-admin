<template>
  <div>
    <div class="flex items-center justify-center">
      <div
        class="cursor-default color-primary-dark font-size-18 font-700 line-height-27"
      >
        {{ $t('page.report.saleChart.title') }}
      </div>
    </div>
    <div class="flex justify-center items-center grow">
      <polar-bar-chart
        v-if="!loading"
        :option="chartData"
        class="height-270 grow"
      />
      <v-loading class="height-320 grow" v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchSale } from '@/service'
import { useI18n } from 'vue-i18n'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'SaleChart' })

const { locale } = useI18n()
watch(locale, () => {
  getChartData()
})

const { loading, startLoading, endLoading } = useLoading(false)

const chartData = ref()

const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  housing: 'page.report.saleChart.housing',
  food: 'page.report.saleChart.food',
  clothing: 'page.report.saleChart.clothing',
  travelOrTransport: 'page.report.saleChart.travelOrTransport',
  entertainment: 'page.report.saleChart.entertainment',
  luxuryGood: 'page.report.saleChart.luxuryGood',
}

function setChartData(data: ApiReport.Sale) {
  const { dimensions, source } = data
  chartData.value = {
    dimensions: dimensions.map((i) => $t(I18N_MAP[i])),
    source,
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchSale()
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
