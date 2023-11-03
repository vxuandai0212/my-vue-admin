<template>
  <div class="flex">
    <div
      class="2xl:basis-1/4 basis-0 overflow-hidden grow-0 shrink-0 h-screen flex flex-col gap-28 background-color-white"
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
          class="flex flex-col grow-0 shrink-0 p-20-0-25-0 gap-25 rounded-12 background-color-white"
        >
          <div class="p-0-25-0-25">
            <simple-tab :tabs="tabs" :initActiveTab="tabs[0]['value']" />
          </div>
          <div class="overflow-x-no-scrollbar">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InvoiceDetail from '@/views/invoice/list/components/detail.vue'
import CustomHeader from '@/layouts/basic-layout/components/custom-header.vue'
import type { Header } from '@/components/table/v-table.vue'
import { $t } from '@/locales'
import { useScreen } from '~/src/composables'

const { isNotPC } = useScreen()
const isMounted = ref<boolean>(false)

onMounted(() => {
  isMounted.value = true
})

const showModal = ref<boolean>(false)

const headers: Header[] = [
  {
    key: 'number',
    label: 'page.invoice.table.header.number',
    type: 'icon-text',
    style: 'bold',
    width: 25,
  },
  {
    key: 'date',
    label: 'page.invoice.table.header.date',
    type: 'text',
    format: {
      type: 'datetime',
      value: 'DD MMM YYYY',
    },
    width: 15,
  },
  {
    key: 'customer',
    label: 'page.invoice.table.header.customer',
    type: 'image-text',
    width: 25,
  },
  {
    key: 'status',
    label: 'page.invoice.table.header.status',
    type: 'tag',
    width: 20,
    align: 'center',
  },
  {
    key: 'amount',
    label: 'page.invoice.table.header.amount',
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
    status: { value: 'page.invoice.status.paid', type: 'primary' },
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
    status: { value: 'page.invoice.status.scheduled', type: 'success' },
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
    status: { value: 'page.invoice.status.unpaid', type: 'warning' },
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
    status: { value: 'page.invoice.status.pending', type: 'danger' },
    amount: 1890.0,
    commands: [
      {
        label: 'page.invoice.command.retry',
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
    status: { value: 'page.invoice.status.processing', type: 'info' },
    amount: 1890.0,
    commands: [
      {
        label: 'page.invoice.command.edit',
        key: 'invoice:edit',
      },
      {
        label: 'page.invoice.command.delete',
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
    status: { value: 'page.invoice.status.finished', type: 'default' },
    amount: 1890.0,
    commands: [
      {
        label: 'page.invoice.command.view',
        key: 'invoice:view',
      },
      {
        label: 'page.invoice.command.edit',
        key: 'invoice:edit',
      },
      {
        label: 'page.invoice.command.delete',
        key: 'invoice:delete',
        type: 'danger',
      },
    ],
  },
]

const progressCards = [
  {
    label: 'page.invoice.progress.all',
    description: 'page.invoice.progress.duration.week',
    value: 1.345,
    progressColor: 'primary',
    trend: 'up',
    percent: 80,
  },
  {
    label: 'page.invoice.progress.scheduled',
    description: 'page.invoice.progress.duration.month',
    value: 3.82,
    progressColor: 'warning',
    trend: 'down',
    percent: 60,
  },
  {
    label: 'page.invoice.progress.unpaid',
    description: 'page.invoice.progress.duration.week',
    valuePrefix: '$',
    value: 4690,
    progressColor: 'danger',
    trend: 'up',
    percent: 30,
  },
  {
    label: 'page.invoice.progress.paid',
    description: 'page.invoice.progress.duration.month',
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
    label: 'page.invoice.tab.all',
    value: 'all',
  },
  {
    label: 'page.invoice.tab.draft',
    value: 'draft',
  },
  {
    label: 'page.invoice.tab.scheduled',
    value: 'scheduled',
  },
  {
    label: 'page.invoice.tab.paid',
    value: 'paid',
  },
]
</script>
