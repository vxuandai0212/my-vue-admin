<template>
  <div class="flex">
    <div class="basis-1/4 grow-0 shrink-0 overflow-hidden background-color-white h-screen flex flex-col gap-28">
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
          Invoices breakdown
        </div>
        <div class="color-primary-grey font-size-14 font-400 line-height-21">
          Learn more about invoices created
        </div>
        <div class="mt-20 flex flex-col gap-6">
          <progress-card
            backgroundColor="background-1"
            v-for="item in progressCards"
            v-bind="(item as any)"
          />
        </div>
      </div>
    </div>
    <div class="p-0-28-27-28 basis-3/4 grow shrink overflow-hidden flex flex-col h-screen">
      <custom-header class="basis-84px grow-0 shrink-0 overflow-hidden" />
      <div
        class="rounded-12 background-color-white p-24-29-33-26 flex gap-31 overflow-hidden"
      >
        <div class="flex flex-col gap-97 basis-2/3 grow-0 shrink-0">
          <Transition name="fade" mode="out-in">
            <invoice-bill-to v-if="activeTab === 'bill'" class="flex flex-col gap-11 overflow-y-no-scrollbar" />
            <invoice-description v-else-if="activeTab === 'description'" class="overflow-y-no-scrollbar" />
          </Transition>
          <div class="flex gap-6">
            <primary-button class="p-14-47-15-46" label="Save & Send" />
            <resting-button class="p-14-43-15-43" label="Cancel" />
          </div>
        </div>
        <div class="flex flex-col grow shrink justify-between h-full">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Tab } from '@/components/tab/advance-tab.vue'
import InvoiceDescription from '@/views/invoice/new/components/description.vue'
import InvoiceBillTo from '@/views/invoice/new/components/bill-to.vue'
import CustomHeader from '@/layouts/basic-layout/components/custom-header.vue'

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