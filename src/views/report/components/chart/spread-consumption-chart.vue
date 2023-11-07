<template>
  <div>
    <div class="flex justify-between items-center p-0-23-0-28 relative">
      <div class="color-primary-dark font-size-18 font-700 line-height-27">
        {{ $t('page.report.spreadConsumptionChart.title') }}
      </div>
      <icon-button
        ref="spreadConsumptionChartDatePickerIconRef"
        @click="showDatePicker = true"
        icon="date"
        class="grow-0 shrink-0"
      />
      <n-date-picker
        ref="spreadConsumptionChartDatePickerRef"
        :class="[showDatePicker ? 'opacity-100 z-2' : 'opacity-0 -z-1']"
        class="absolute top-50px right-10px border-1 border-solid border-color-resting-outline transition"
        @confirm="chooseRange"
        panel
        v-model:value="chartRange"
        type="datetimerange"
      />
    </div>
    <line-chart v-if="!loading" :option="chartData" class="height-320 grow" />
    <v-loading class="height-320 grow" v-else />
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchSpreadConsumption } from '@/service'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useClick } from '@/hooks'

defineOptions({ name: 'SpreadConsumptionChart' })

const showDatePicker = ref<boolean>(false)
const spreadConsumptionChartDatePickerRef = ref(null)
const spreadConsumptionChartDatePickerIconRef = ref(null)

const { el } = useClick()

watch(el, (newValue) => {
  if (!showDatePicker.value) return
  const inputWrapperEl: any = (
    spreadConsumptionChartDatePickerIconRef.value as any
  ).$el
  const datePickerEl: any = (spreadConsumptionChartDatePickerRef.value as any)
    .$el
  if (!inputWrapperEl && !datePickerEl) return
  if (
    showDatePicker.value &&
    !inputWrapperEl.contains(newValue) &&
    !datePickerEl.contains(newValue)
  ) {
    showDatePicker.value = false
  }
})

const chartRange = ref()

function chooseRange() {
  showDatePicker.value = false
  fromDate.value = chartRange.value[0]
  toDate.value = chartRange.value[1]
  getChartData()
}

const { locale } = useI18n()
watch(locale, () => {
  getChartData()
})

const fromDate = ref<number>(dayjs().startOf('day').valueOf())
const toDate = ref<number>(dayjs().endOf('day').valueOf())

const { loading, startLoading, endLoading } = useLoading(false)

const chartData = ref()
function setChartData(data: ApiReport.SpreadConsumption) {
  const { x, y } = data
  const { margarine, lowfat, butter } = y
  chartData.value = {
    legend: [
      $t('page.report.spreadConsumptionChart.legend.margarine'),
      $t('page.report.spreadConsumptionChart.legend.lowfat'),
      $t('page.report.spreadConsumptionChart.legend.butter'),
    ],
    x,
    y: [
      {
        name: $t('page.report.spreadConsumptionChart.legend.margarine'),
        data: margarine,
      },
      {
        name: $t('page.report.spreadConsumptionChart.legend.lowfat'),
        data: lowfat,
      },
      {
        name: $t('page.report.spreadConsumptionChart.legend.butter'),
        data: butter,
      },
    ],
    yAxis: {
      name: $t('page.report.spreadConsumptionChart.unit'),
    }
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchSpreadConsumption(fromDate.value, toDate.value)
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
