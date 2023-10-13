<template>
  <div class="background-color-background-light flex">
    <div
      class="pb-10 background-color-white border-right-1 border-right-color-outline border-right-solid transition flex flex-col min-h-full justify-between"
      :class="[collapsed ? 'width-89' : 'width-242']"
    >
      <div>
        <div class="pt-26 pl-29 flex gap-23 items-center cursor-pointer">
          <svg-logo />
          <span
            :class="collapsed ? 'width-0' : ''"
            class="color-primary font-size-20 font-900 overflow-hidden transition"
            >betaCRM</span
          >
        </div>
        <div class="mt-22">
          <div
            v-for="item in menus"
            class="p-8-0-8-19 group flex jusity-between cursor-pointer"
          >
            <div
              class="group-hover:background-color-info flex items-center transition flex-grow mr-19 rounded-4 relative"
              :class="[
                item.label === current
                  ? 'background-color-primary-resting'
                  : 'background-color-white',
                collapsed ? 'gap-0' : 'gap-15',
              ]"
            >
              <div
                v-if="item.label === haveNotification"
                class="background-color-danger absolute width-12 height-12 left-26 top-11 rounded-50 border-color-white border-2"
              ></div>
              <component
                class="group-hover:fill-white width-48 text-center transition"
                :class="[
                  item.label === current ? 'fill-primary' : 'fill-primary-grey',
                ]"
                :is="item.icon"
              ></component>
              <span
                class="group-hover:color-white font-size-14 font-700 line-height-21 overflow-hidden truncate transition"
                :class="[
                  item.label === current
                    ? 'color-primary-dark'
                    : 'color-primary-grey',
                  collapsed ? 'width-0' : '',
                ]"
                >{{ item.label }}</span
              >
            </div>
            <div
              class="width-2 height-48 rounded-1 transition"
              :class="[
                item.label === current
                  ? 'background-color-primary'
                  : 'background-color-white',
              ]"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="mt-38 p-8-0-18-19 flex items-center gap-15 cursor-pointer relative"
      >
        <img
          class="width-30 height-30 rounded-5 m-0-9-0-9"
          src="@/assets/images/avatar.png"
          alt="Avatar"
        />
        <div
          class="absolute width-12 height-12 left-51 bottom-14 background-color-success rounded-50 border-color-white border-2"
        ></div>
        <span
          v-if="!collapsed"
          class="font-size-14 font-700 line-height-21 color-primary-grey truncate transition"
          >John Doe</span
        >
      </div>
    </div>
    <div class="flex flex-grow">
      <div class="width-387 background-color-white">
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
          <icon-button>
            <icon-local-caret-down
              class="fill-primary-grey width-16 height-16"
            />
          </icon-button>
        </div>
        <div class="p-28-21-28-30">
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
            Invoices breakdown
          </div>
          <div class="color-primary-grey font-size-14 font-400 line-height-21">
            Learn more about invoices created
          </div>
          <div class="mt-20 flex flex-col gap-6">
            <progress-card
              v-for="item in progressCards"
              v-bind="(item as any)"
            />
          </div>
        </div>
      </div>
      <div class="p-0-28-28-28 flex-grow">
        <div class="flex justify-between items-center height-84">
          <div class="flex items-center">
            <icon-button @click="collapsed = !collapsed">
              <icon-local-hamburger
                class="fill-primary-grey width-16 height-16"
              />
            </icon-button>
            <div
              class="ml-20 color-primary-dark font-size-20 font-700 line-height-32 cursor-default"
            >
              Page title
            </div>
          </div>
          <div class="flex items-center justify-end gap-6">
            <icon-button>
              <icon-local-search class="fill-primary-grey width-16 height-16" />
            </icon-button>
            <icon-button>
              <icon-local-add class="fill-primary-grey width-16 height-16" />
            </icon-button>
          </div>
        </div>
        <!-- empty-invoice -->
        <div class="rounded-12 background-color-white">
          <tab
            class="p-20-0-0-25"
            :tabs="tabs"
            :initActiveTab="tabs[0]['value']"
          />
          <v-table
            @invoice:view="handleCreateInvoice"
            @invoice:edit="handleEditInvoice"
            @invoice:delete="handleDeleteInvoice"
            @invoice:retry="handleRetryInvoice"
            class="p-20-0-30-0"
            :headers="headers"
            :data="data"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgDashboard from '@/components/svg/svg-dashboard.vue'
import SvgProject from '@/components/svg/svg-project.vue'
import SvgTask from '@/components/svg/svg-task.vue'
import SvgKanban from '@/components/svg/svg-kanban.vue'
import SvgCalendar from '@/components/svg/svg-calendar.vue'
import SvgContact from '@/components/svg/svg-contact.vue'
import SvgMessage from '@/components/svg/svg-message.vue'
import SvgProduct from '@/components/svg/svg-product.vue'
import SvgInvoice from '@/components/svg/svg-invoice.vue'
import SvgFile from '@/components/svg/svg-file.vue'
import SvgNotification from '@/components/svg/svg-notification.vue'
import SvgReport from '@/components/svg/svg-report.vue'
import SvgHelp from '@/components/svg/svg-help.vue'

import type { Header } from '@/components/table/v-table.vue'

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
]

function handleCreateInvoice(v: any) {
  console.log('Create invoice: ' + v.id)
}

function handleEditInvoice(v: any) {
  console.log('Edit invoice: ' + v.id)
}

function handleDeleteInvoice(v: any) {
  console.log('Delete invoice: ' + v.id)
}

function handleRetryInvoice(v: any) {
  console.log('Retry invoice: ' + v.id)
}

const current = 'Dashboard'
const haveNotification = 'Messages'

const collapsed = ref<boolean>(false)

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

const menus = [
  {
    label: 'Dashboard',
    icon: SvgDashboard,
  },
  {
    label: 'Projects',
    icon: SvgProject,
  },
  {
    label: 'Tasks',
    icon: SvgTask,
  },
  {
    label: 'Kanban',
    icon: SvgKanban,
  },
  {
    label: 'Calendar',
    icon: SvgCalendar,
  },
  {
    label: 'Contacts',
    icon: SvgContact,
  },
  {
    label: 'Messages',
    icon: SvgMessage,
  },
  {
    label: 'Products',
    icon: SvgProduct,
  },
  {
    label: 'Invoices',
    icon: SvgInvoice,
  },
  {
    label: 'File Browser',
    icon: SvgFile,
  },
  {
    label: 'Notifications',
    icon: SvgNotification,
  },
  {
    label: 'Reports',
    icon: SvgReport,
  },
  {
    label: 'Help Center',
    icon: SvgHelp,
  },
]
</script>
