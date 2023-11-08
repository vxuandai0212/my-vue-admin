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
            <simple-tab
              @update:value="changeStatus"
              :tabs="tabs"
              :initActiveTab="tabs[0]['value']"
            />
          </div>
          <div class="overflow-x-no-scrollbar">
            <div class="flex flex-col gap-36 h-full min-w-1000px">
              <v-table
                v-if="!loading"
                @invoice:view="handleCreateInvoice"
                @invoice:edit="handleEditInvoice"
                @invoice:delete="handleDeleteInvoice"
                @invoice:retry="handleRetryInvoice"
                :headers="headers"
                :data="table.items"
                :total="table.total"
              />
              <v-loading v-else />
              <div
                class="flex justify-end p-0-25-0-25 basis-34px grow-0 shrink-0 overflow-hidden"
              >
                <n-pagination
                  :page="table.filter.page"
                  :page-size="table.filter.limit"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-count="pageCount"
                  size="large"
                  show-quick-jumper
                  show-size-picker
                  :on-update:page-size="handlePageSizeChange"
                  :on-update:page="handlePageChange"
                />
              </div>
            </div>
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
import { computed, onMounted, reactive, ref } from 'vue'
import InvoiceDetail from '@/views/invoice/list/components/detail.vue'
import CustomHeader from '@/layouts/basic-layout/components/custom-header.vue'
import type { Header } from '@/components/table/v-table.vue'
import { $t } from '@/locales'
import { useScreen } from '@/composables'
import { I18nType } from '@/typings/system'
import { useLoading } from '@/hooks'
import { fetchAllInvoice } from '@/service'

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

const STATUS_MAP = {
  1: { value: 'page.invoice.status.paid', type: 'primary' },
  2: { value: 'page.invoice.status.scheduled', type: 'success' },
  3: { value: 'page.invoice.status.unpaid', type: 'warning' },
  4: { value: 'page.invoice.status.pending', type: 'danger' },
  5: { value: 'page.invoice.status.processing', type: 'info' },
  6: { value: 'page.invoice.status.finished', type: 'default' },
}

const tabs: {
  label: I18nType.I18nKey
  value: ApiInvoice.Invoice['status'] | 'all'
}[] = [
  {
    label: 'page.invoice.tab.all',
    value: 'all',
  },
  {
    label: 'page.invoice.status.pending',
    value: 4,
  },
  {
    label: 'page.invoice.tab.scheduled',
    value: 2,
  },
  {
    label: 'page.invoice.tab.paid',
    value: 1,
  },
]

const COMMAND_MAP: any = {
  4: [
    {
      label: 'page.invoice.command.retry',
      key: 'invoice:retry',
      type: 'warning',
    },
  ],
  5: [
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
  6: [
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
}

const table = reactive<{
  filter: {
    status: ApiInvoice.Invoice['status'] | 'all'
    page: number
    limit: number
  }
  total: number
  items: any[]
}>({
  filter: {
    status: 'all',
    page: 1,
    limit: 10,
  },
  total: 0,
  items: [],
})

function changeStatus(v: ApiInvoice.Invoice['status']) {
  table.filter.status = v
  table.filter.page = 1
  table.filter.limit = 10
  getData()
}

function handlePageChange(v: number) {
  table.filter.page = v
  getData()
}

function handlePageSizeChange(v: number) {
  table.filter.limit = v
  getData()
}

const pageSize = ref<number>(10)
const pageCount = computed(() => Math.ceil(table.total / pageSize.value))

const { loading, startLoading, endLoading } = useLoading(false)

function setData(data: ApiInvoice.GetAllInvoice) {
  const { total, items } = data
  table.total = total
  table.items = items.map((i) => {
    return {
      id: i.id,
      number: { icon: '', text: i.code },
      date: i.createdAt,
      customer: {
        image: '@/assets/images/avatar.png',
        text: i.customerName,
      },
      status: STATUS_MAP[i.status],
      amount: i.amount,
      commands: COMMAND_MAP[i.status],
    }
  })
}

async function getData() {
  startLoading()
  const { data } = await fetchAllInvoice({ ...table.filter })
  if (data) {
    setTimeout(() => {
      setData(data)
      endLoading()
    }, 1000)
  }
}

function init() {
  getData()
}

init()
</script>
