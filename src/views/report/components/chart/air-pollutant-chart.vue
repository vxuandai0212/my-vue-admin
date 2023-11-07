<template>
  <div>
    <div
      class="flex justify-between items-center p-0-23-0-28 <md:gap-20 relative"
    >
      <div
        class="cursor-default color-primary-dark font-size-18 font-700 line-height-27"
      >
        {{ $t('page.report.airPollutantChart.title') }}
      </div>
      <div class="flex gap-8 items-center overflow-x-no-scrollbar">
        <simple-tab
          @update:value="changeFilterTab"
          :tabs="dateFilters"
          init-active-tab="day"
        />
        <icon-button
          ref="airPollutantChartDatePickerIconRef"
          @click="showDatePicker = true"
          icon="date"
          class="grow-0 shrink-0"
        />
        <n-date-picker
          ref="airPollutantChartDatePickerRef"
          :class="[showDatePicker ? 'opacity-100 z-2' : 'opacity-0 -z-1']"
          class="absolute top-50px right-10px border-1 border-solid border-color-resting-outline transition"
          @confirm="chooseRange"
          panel
          v-model:value="chartRange"
          type="datetimerange"
        />
      </div>
    </div>
    <line-chart v-if="!loading" :option="chartData" class="height-320 grow" />
    <v-loading class="height-320 grow" v-else />
  </div>
</template>
<script setup lang="ts">
import { SimpleTabItem } from '@/components/tab/simple-tab.vue'
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchAirPollutant } from '@/service'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useClick } from '@/hooks'

defineOptions({ name: 'AirPollutantChart' })

const showDatePicker = ref<boolean>(false)
const airPollutantChartDatePickerRef = ref(null)
const airPollutantChartDatePickerIconRef = ref(null)

const { el } = useClick()

watch(el, (newValue) => {
  if (!showDatePicker.value) return
  const inputWrapperEl: any = (airPollutantChartDatePickerIconRef.value as any)
    .$el
  const datePickerEl: any = (airPollutantChartDatePickerRef.value as any).$el
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

const dateFilters: SimpleTabItem[] = [
  {
    label: 'common.tab.day',
    value: 'day',
  },
  {
    label: 'common.tab.week',
    value: 'week',
  },
  {
    label: 'common.tab.month',
    value: 'month',
  },
]

const fromDate = ref<number>(dayjs().startOf('day').valueOf())
const toDate = ref<number>(dayjs().endOf('day').valueOf())

function changeFilterTab(v: 'day' | 'week' | 'month') {
  if (v === 'day') {
    fromDate.value = dayjs().startOf('day').valueOf()
    toDate.value = dayjs().endOf('day').valueOf()
  } else if (v === 'week') {
    fromDate.value = dayjs().startOf('week').valueOf()
    toDate.value = dayjs().endOf('week').valueOf()
  } else if (v === 'month') {
    fromDate.value = dayjs().startOf('month').valueOf()
    toDate.value = dayjs().endOf('month').valueOf()
  }
  getChartData()
}

const { loading, startLoading, endLoading } = useLoading(false)

const chartData = ref()
function setChartData(data: ApiReport.AirPollutant) {
  const { x, y } = data
  const { transport, industry, airPollutant, household } = y
  chartData.value = {
    legend: [
      $t('page.report.airPollutantChart.legend.transport'),
      $t('page.report.airPollutantChart.legend.industry'),
      $t('page.report.airPollutantChart.legend.airPollutant'),
      $t('page.report.airPollutantChart.legend.household'),
    ],
    x,
    y: [
      {
        name: $t('page.report.airPollutantChart.legend.transport'),
        data: transport,
      },
      {
        name: $t('page.report.airPollutantChart.legend.industry'),
        data: industry,
      },
      {
        name: $t('page.report.airPollutantChart.legend.airPollutant'),
        data: airPollutant,
      },
      {
        name: $t('page.report.airPollutantChart.legend.household'),
        data: household,
      },
    ],
    yAxis: {
      name: $t('page.report.airPollutantChart.unit')
    }
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchAirPollutant(fromDate.value, toDate.value)
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
