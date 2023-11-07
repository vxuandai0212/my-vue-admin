<template>
  <div>
    <div
      class="flex gap-8 p-0-23-0-28 items-center overflow-x-no-scrollbar relative"
    >
      <simple-tab
        @update:value="changeFilterTab"
        :tabs="dateFilters"
        init-active-tab="day"
      />
      <icon-button
        ref="transportationChartDatePickerIconRef"
        @click="showDatePicker = true"
        icon="date"
        class="grow-0 shrink-0"
      />
      <n-date-picker
        ref="transportationChartDatePickerRef"
        :class="[showDatePicker ? 'opacity-100 z-2' : 'opacity-0 -z-1']"
        class="absolute top-50px right-10px border-1 border-solid border-color-resting-outline transition"
        @confirm="chooseRange"
        panel
        v-model:value="chartRange"
        type="datetimerange"
      />
    </div>
    <pie-chart v-if="!loading" :option="chartData" class="height-320 grow" />
    <v-loading class="height-320 grow" v-else />
  </div>
</template>
<script setup lang="ts">
import { SimpleTabItem } from '@/components/tab/simple-tab.vue'
import { $t } from '@/locales'
import { ref, watch } from 'vue'
import { useLoading } from '@/hooks'
import { fetchTransportation } from '@/service'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { useClick } from '@/hooks'
import { I18nType } from '@/typings/system'

defineOptions({ name: 'TransportationChart' })

const showDatePicker = ref<boolean>(false)
const transportationChartDatePickerRef = ref(null)
const transportationChartDatePickerIconRef = ref(null)

const { el } = useClick()

watch(el, (newValue) => {
  if (!showDatePicker.value) return
  const inputWrapperEl: any = (
    transportationChartDatePickerIconRef.value as any
  ).$el
  const datePickerEl: any = (transportationChartDatePickerRef.value as any).$el
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

const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  car: 'page.report.transportationChart.car',
  bicycle: 'page.report.transportationChart.bicycle',
  bus: 'page.report.transportationChart.bus',
  train: 'page.report.transportationChart.train',
  walking: 'page.report.transportationChart.walking',
}

const chartData = ref()

function setChartData(data: ApiReport.Transportation[]) {
  chartData.value = {
    name: $t('page.report.transportationChart.title'),
    data: data.map((i) => {
      i.name = $t(I18N_MAP[i.name])
      return i
    }),
  }
}

async function getChartData() {
  startLoading()
  const { data } = await fetchTransportation()
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
