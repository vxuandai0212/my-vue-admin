<template>
  <div class="flex">
    <div
      class="2xl:basis-1/4 <2xl:basis-0 grow-0 shrink-0 background-color-white h-screen overflow-y-no-scrollbar"
    >
      <div class="grid grid-cols-3">
        <teleport v-if="isMounted" to="#sider" :disabled="!isNotPC">
          <div
            class="col-span-3 flex 2xl:flex-col 2xl:gap-5 gap-15 <2xl:items-center 2xl:mt-55 2xl:p-28-23-10-28 p-28-23-28-28 background-color-white rounded-12"
          >
            <img
              class="2xl:width-98 2xl:height-98 width-40 height-40"
              src="@/assets/images/company.png"
              alt="Company"
            />
            <div
              class="flex 2xl:flex-col <md:flex-col <md:items-start <2xl:items-center gap-5"
            >
              <div
                class="color-primary-dark font-size-22 font-400"
                style="letter-spacing: 0.4px"
              >
                {{ $t('page.report.welcome') }},
              </div>
              <div
                class="color-primary-dark font-size-26 font-700 line-height-38"
              >
                WhiteUI.Store
              </div>
            </div>
          </div>
          <latest-update />
          <upcoming-event />
          <popular-category />
        </teleport>
      </div>
    </div>
    <div class="p-0-28-0-28 grow shrink overflow-hidden flex flex-col h-screen">
      <custom-header class="basis-84px grow-0 shrink-0 overflow-hidden" />
      <div class="flex flex-col gap-28 overflow-y-no-scrollbar p-0-0-28-0">
        <div class="grid grid-cols-3 gap-28 2xl:hidden" id="sider"></div>
        <div class="grid grid-cols-3 gap-28">
          <overview-stat />
          <visit-chart
            class="col-span-2 <lg:col-span-3 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          />
          <spread-consumption-chart
            class="col-span-1 <lg:col-span-3 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          />
          <road-transport-spend-chart
            class="pt-20 gap-20 col-span-1 <lg:col-span-3 flex flex-col background-color-white rounded-12"
          />
          <sale-chart
            class="pt-20 col-span-1 <lg:col-span-3 flex flex-col gap-20 background-color-white rounded-12"
          />
          <smoking-chart
            class="pt-20 col-span-1 <lg:col-span-3 flex flex-col gap-20 background-color-white rounded-12"
          />
          <air-pollutant-chart
            class="col-span-2 <lg:col-span-3 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          />
          <transportation-chart
            class="col-span-1 <lg:col-span-3 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomHeader from '@/layouts/basic-layout/components/custom-header.vue'
import { useScreen } from '@/composables'
import VisitChart from '@/views/report/components/chart/visit-chart.vue'
import SpreadConsumptionChart from '@/views/report/components/chart/spread-consumption-chart.vue'
import RoadTransportSpendChart from '@/views/report/components/chart/road-transport-spend-chart.vue'
import SaleChart from '@/views/report/components/chart/sale-chart.vue'
import SmokingChart from '@/views/report/components/chart/smoking-chart.vue'
import AirPollutantChart from '@/views/report/components/chart/air-pollutant-chart.vue'
import TransportationChart from '@/views/report/components/chart/transportantion-chart.vue'
import OverviewStat from '@/views/report/components/overview-stat.vue'
import LatestUpdate from '@/views/report/components/latest-update.vue'
import UpcomingEvent from '@/views/report/components/upcoming-event.vue'
import PopularCategory from '@/views/report/components/popular-category.vue'
import { $t } from '@/locales'

const { isNotPC } = useScreen()
const isMounted = ref<boolean>(false)

onMounted(() => {
  isMounted.value = true
})
</script>
