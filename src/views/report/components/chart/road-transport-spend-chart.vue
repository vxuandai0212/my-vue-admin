<template>
  <div class="flex justify-center items-end">
    <bar-chart v-if="!loading" :option="chartData" class="height-270 grow" />
    <v-loading class="height-320 grow" v-else />
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchRoadTransportSpend } from '@/service'
import { useI18n } from 'vue-i18n'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'RoadTransportSpendChart' })

const { locale } = useI18n()
watch(locale, () => {
  getChartData()
})

const { loading, startLoading, endLoading } = useLoading(false)

const chartData = ref()

const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  italia: 'page.report.roadTransportSpendChart.italia',
  portugal: 'page.report.roadTransportSpendChart.portugal',
  uk: 'page.report.roadTransportSpendChart.uk',
  usa: 'page.report.roadTransportSpendChart.usa',
}

function setChartData(data: ApiReport.RoadTransportSpend) {
  const { dimensions, source } = data
  chartData.value = {
    dimensions,
    source: source.map((i) => {
      i.country = $t(I18N_MAP[i.country])
      return i
    }),
    yAxis: {
      name: $t('page.report.roadTransportSpendChart.unit'),
    },
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchRoadTransportSpend()
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
