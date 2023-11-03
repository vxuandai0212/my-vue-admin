<template>
  <div class="flex">
    <div
      class="2xl:basis-1/4 basis-0 grow-0 shrink-0 overflow-hidden background-color-white h-screen flex flex-col gap-28"
    >
      <teleport v-if="isMounted" to="#sider" :disabled="!isNotPC">
        <div
          class="flex p-24-28-23-28 justify-between border-bottom-1 border-bottom-solid border-bottom-color-outline"
        >
          <div class="flex gap-12">
            <img src="@/assets/images/company.png" alt="Company avatar" />
            <div>
              <div
                class="color-primary-dark font-size-14 font-700 line-height-21 cursor-default"
              >
                WHITEUI.STORE LLC
              </div>
              <div
                class="color-primary-grey font-size-12 font-400 line-height-18 cursor-default"
              >
                8484 Ross Wells
              </div>
            </div>
          </div>
          <icon-button icon="caret-down" />
        </div>
        <div class="h-full p-0-21-28-30 overflow-y-no-scrollbar">
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
            {{ $t('page.invoice.progress.title') }}
          </div>
          <div class="color-primary-grey font-size-14 font-400 line-height-21">
            {{ $t('page.invoice.progress.description') }}
          </div>
          <div class="mt-20 grid grid-cols-4 gap-6">
            <progress-card
              class="2xl:col-span-4 <2xl:col-span-2 <md:col-span-4"
              backgroundColor="background-1"
              v-for="item in progressCards"
              v-bind="(item as any)"
            />
          </div>
        </div>
      </teleport>
    </div>
    <div
      class="p-0-28-27-28 basis-3/4 grow shrink overflow-hidden flex flex-col h-screen"
    >
      <custom-header class="basis-84px grow-0 shrink-0 overflow-hidden" />
      <div class="flex flex-col gap-20 overflow-y-no-scrollbar">
        <div
          class="2xl:hidden flex flex-col gap-28 background-color-white rounded-12"
          id="sider"
        ></div>
        <div
          class="rounded-12 background-color-white p-24-29-33-26 flex <md:flex-col-reverse gap-31"
        >
          <div class="flex flex-col gap-97 basis-2/3 <md:basis-1 grow-0 shrink-0">
            <Transition name="fade" mode="out-in">
              <invoice-bill-to
                v-if="activeTab === 'bill'"
                class="flex flex-col gap-11"
              />
              <invoice-description
                v-else-if="activeTab === 'description'"
              />
            </Transition>
            <div class="flex gap-6">
              <primary-button class="p-14-47-15-46" label="Save & Send" />
              <resting-button class="p-14-43-15-43" label="Cancel" />
            </div>
          </div>
          <div class="flex flex-col <md:gap-20 grow shrink justify-between h-full">
            <advance-tab
              @update:active-tab="chooseTab"
              :active="activeTab"
              :tabs="topTabs"
            />
            <advance-tab :tabs="bottomTabs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Tab } from '@/components/tab/advance-tab.vue'
import InvoiceDescription from '@/views/invoice/new/components/description.vue'
import InvoiceBillTo from '@/views/invoice/new/components/bill-to.vue'
import CustomHeader from '@/layouts/basic-layout/components/custom-header.vue'
import { useScreen } from '@/composables'

const { isNotPC } = useScreen()
const isMounted = ref<boolean>(false)

onMounted(() => {
  isMounted.value = true
})

const topTabs: Tab[] = [
  {
    key: 'bill',
    label: 'Bill To',
    description: "Set your customer's details",
    icon: 'bill',
  },
  {
    key: 'from',
    label: 'From',
    description: 'Set your personal details',
    icon: 'from',
  },
  {
    key: 'description',
    label: 'Description',
    description: 'Add products or items',
    icon: 'description',
  },
]

const activeTab = ref('bill')

function chooseTab(v: any) {
  activeTab.value = v
}

const bottomTabs: Tab[] = [
  {
    key: 'save',
    label: 'Save As a Draft',
    description: 'Edit and send this invoice later',
    icon: 'save',
  },
  {
    key: 'delete',
    label: 'Delete Invoice',
    description: 'Hide & disable current invoice',
    icon: 'delete',
  },
]

const progressCards = [
  {
    label: 'All Invoices',
    description: 'Week comparison',
    value: 1.345,
    progressColor: 'primary',
    trend: 'up',
    percent: 80,
  },
  {
    label: 'Scheduled',
    description: 'Month comparison',
    value: 3.82,
    progressColor: 'warning',
    trend: 'down',
    percent: 60,
  },
  {
    label: 'Unpaid',
    description: 'Week comparison',
    valuePrefix: '$',
    value: 4690,
    progressColor: 'danger',
    trend: 'up',
    percent: 30,
  },
  {
    label: 'Paid',
    description: 'Month comparison',
    valuePrefix: '$',
    value: 3820,
    progressColor: 'success',
    trend: 'down',
    percent: 85,
  },
]
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
