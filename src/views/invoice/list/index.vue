<template>
  <div class="flex">
    <div class="basis-1/4 overflow-hidden grow-0 shrink-0 h-screen flex flex-col gap-28 background-color-white">
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
      <div class="flex flex-col overflow-hidden grow shrink p-20-0-25-0 gap-20 rounded-12 background-color-white">
        <simple-tab
          class="p-0-0-0-25"
          :tabs="tabs"
          :initActiveTab="tabs[0]['value']"
        />
        <div class="grow shrink overflow-hidden">
          <v-table
            @invoice:view="handleCreateInvoice"
            @invoice:edit="handleEditInvoice"
            @invoice:delete="handleDeleteInvoice"
            @invoice:retry="handleRetryInvoice"
            :headers="headers"
            :data="data"
          />
        </div>
        <n-modal v-model:show="showModal">
          <div
            class="rounded-4 background-color-white width-1079"
            style="box-shadow: 0px 6px 16px 0px rgba(153, 155, 168, 0.1)"
          >
            <invoice-detail />
          </div>
        </n-modal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InvoiceDetail from '@/views/invoice/list/components/detail.vue'
import CustomHeader from '@/layouts/custom-layout/components/custom-header.vue'

import type { Header } from '@/components/table/v-table.vue'

const showModal = ref<boolean>(false)

const headers: Header[] = [
  {
    key: 'number',
    label: 'Number',
    type: 'icon-text',
    style: 'bold',
    width: 25,
  },
  {
    key: 'date',
    label: 'Date',
    type: 'text',
    format: {
      type: 'datetime',
      value: 'DD MMM YYYY',
    },
    width: 15,
  },
  {
    key: 'customer',
    label: 'Customer',
    type: 'image-text',
    width: 25,
  },
  {
    key: 'status',
    label: 'Status',
    type: 'tag',
    width: 20,
    align: 'center',
  },
  {
    key: 'amount',
    label: 'Amount',
    type: 'text',
    style: 'bold',
    format: {
      type: 'currency',
      value: {
        locale: 'en-US',
        style: 'currency',
        currency: 'USD',
      },
    },
    width: 20,
  },
]

const data = [
  {
    id: 1,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Paid', type: 'primary' },
    amount: 1890.0,
  },
  {
    id: 2,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Scheduled', type: 'success' },
    amount: 1890.0,
  },
  {
    id: 3,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Unpaid', type: 'warning' },
    amount: 1890.0,
  },
  {
    id: 4,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Pending', type: 'danger' },
    amount: 1890.0,
    commands: [
      {
        label: 'Retry',
        key: 'invoice:retry',
        type: 'warning',
      },
    ],
  },
  {
    id: 5,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Processing', type: 'info' },
    amount: 1890.0,
    commands: [
      {
        label: 'Edit',
        key: 'invoice:edit',
      },
      {
        label: 'Delete',
        key: 'invoice:delete',
        type: 'danger',
      },
    ],
  },
  {
    id: 6,
    number: { icon: '', text: 'AA-04-19-1890' },
    date: 1548381600000,
    customer: {
      image: '@/assets/images/avatar.png',
      text: 'Sophia Wagner',
    },
    status: { value: 'Finished', type: 'default' },
    amount: 1890.0,
    commands: [
      {
        label: 'View',
        key: 'invoice:view',
      },
      {
        label: 'Edit',
        key: 'invoice:edit',
      },
      {
        label: 'Delete',
        key: 'invoice:delete',
        type: 'danger',
      },
    ],
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

function handleCreateInvoice(v: any) {
  console.log('Create invoice: ' + v.id)
}

function handleEditInvoice(v: any) {
  showModal.value = true
  console.log('Edit invoice: ' + v.id)
}

function handleDeleteInvoice(v: any) {
  console.log('Delete invoice: ' + v.id)
}

function handleRetryInvoice(v: any) {
  console.log('Retry invoice: ' + v.id)
}

const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
  },
  {
    label: 'Paid',
    value: 'paid',
  },
]
</script>
<style>
.h-full--84 {
  height: calc(100vh - 84px);
}

</style>