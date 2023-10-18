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
      <div class="w%-25 background-color-white p-28-29-28-28">
        <div class="flex flex-col gap-33">
          <div class="mt-55">
            <img
              class="width-98 height-98"
              src="@/assets/images/company.png"
              alt="Company"
            />
            <div
              class="mt-12 color-primary-dark font-size-22 font-400"
              style="letter-spacing: 0.4px"
            >
              Welcome,
            </div>
            <div
              class="mt-2 color-primary-dark font-size-26 font-700 line-height-38"
            >
              WhiteUI.Store
            </div>
          </div>
          <div class="flex flex-col gap-18">
            <div
              class="color-primary-dark font-size-16 font-700 line-height-24"
            >
              Latest updates
            </div>
            <div class="flex flex-col gap-9">
              <item-card v-for="item in items" v-bind="item" />
            </div>
            <div
              class="color-primary-dark font-size-16 font-700 line-height-24"
            >
              Upcoming events
            </div>
            <div class="flex flex-col gap-9">
              <event-card v-for="item in events" v-bind="item" />
            </div>
            <div class="flex flex-col">
              <div
                class="color-primary-dark font-size-16 font-700 line-height-24"
              >
                Popular categories
              </div>
              <div
                class="color-primary-grey font-size-14 font-400 line-height-21"
              >
                Explore most popular product categories
              </div>
            </div>

            <div class="flex flex-col gap-9">
              <category-card v-for="item in categories" v-bind="item" />
            </div>
          </div>
        </div>
      </div>
      <div class="p-0-28-28-28 flex-grow">
        <div class="flex justify-between items-center height-84">
          <div class="flex items-center">
            <icon-button icon="hamburger" @click="collapsed = !collapsed" />
            <div
              class="ml-20 color-primary-dark font-size-20 font-700 line-height-32 cursor-default"
            >
              Report
            </div>
          </div>
          <div class="flex items-center justify-end gap-6">
            <simple-search />
            <add-button />
          </div>
        </div>
        <!-- report -->
        <div class="grid grid-cols-3 gap-28">
          <progress-card
            class="col-span-1"
            v-for="item in progressCards"
            v-bind="item"
          />
          <div
            class="col-span-2 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          >
            <div class="flex justify-between items-center p-0-23-0-28">
              <div
                class="color-primary-dark font-size-18 font-700 line-height-27"
              >
                Orders
              </div>
              <div class="flex gap-8">
                <simple-tab :tabs="dateFilters" init-active-tab="day" />
                <icon-button icon="date" />
              </div>
            </div>
            <line-chart class="height-320 grow" />
          </div>
          <div
            class="col-span-1 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          >
            <div class="flex justify-between items-center p-0-23-0-28">
              <div
                class="color-primary-dark font-size-18 font-700 line-height-27"
              >
                Planned Income
              </div>
              <icon-button icon="date" />
            </div>
            <line-chart class="height-320 grow" />
          </div>
          <div
            class="pt-20 gap-20 col-span-1 flex flex-col background-color-white rounded-12"
          >
            <div class="flex justify-center items-end">
              <bar-chart class="height-270 grow" />
            </div>
            <div
              class="height-75 border-top-1 border-top-solid border-top-color-border flex"
            >
              <div
                class="flex flex-col justify-center items-center grow border-right-1 border-right-solid border-right-color-border"
              >
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $342.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Total sales
                </div>
              </div>
              <div class="flex flex-col justify-center items-center grow">
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $200.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Spendings
                </div>
              </div>
            </div>
          </div>
          <div
            class="pt-20 col-span-1 flex flex-col gap-20 background-color-white rounded-12"
          >
            <div class="flex justify-center items-center">
              <polar-bar-chart class="height-270 grow" />
              <!-- <pie-chart class="height-270 grow" /> -->
            </div>
            <div
              class="height-75 border-top-1 border-top-solid border-top-color-border flex"
            >
              <div
                class="flex flex-col justify-center items-center grow border-right-1 border-right-solid border-right-color-border"
              >
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $342.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Total sales
                </div>
              </div>
              <div class="flex flex-col justify-center items-center grow">
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $200.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Spendings
                </div>
              </div>
            </div>
          </div>
          <div
            class="pt-20 col-span-1 flex flex-col gap-20 background-color-white rounded-12"
          >
            <line-chart class="height-270 grow" />
            <div
              class="height-75 border-top-1 border-top-solid border-top-color-border flex"
            >
              <div
                class="flex flex-col justify-center items-center grow border-right-1 border-right-solid border-right-color-border"
              >
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $342.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Total sales
                </div>
              </div>
              <div class="flex flex-col justify-center items-center grow">
                <div
                  class="color-primary-dark font-size-16 font-700 line-height-24"
                >
                  $200.000
                </div>
                <div
                  class="color-primary-grey font-size-14 font-400 line-height-21"
                >
                  Spendings
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-span-2 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          >
            <div class="flex justify-between items-center p-0-23-0-28">
              <div
                class="color-primary-dark font-size-18 font-700 line-height-27"
              >
                Your Sales
              </div>
              <div class="flex gap-8">
                <simple-tab :tabs="dateFilters" init-active-tab="day" />
                <icon-button icon="date" />
              </div>
            </div>
            <line-chart class="height-320 grow" />
          </div>
          <div
            class="col-span-1 flex flex-col gap-28 p-28-0-28-0 background-color-white rounded-12"
          >
            <div class="flex gap-8 p-0-23-0-28">
              <simple-tab :tabs="dateFilters" init-active-tab="day" />
              <icon-button icon="date" />
            </div>
            <pie-chart class="height-320 grow" />
          </div>
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
import ItemCard, { ItemCardProps } from '@/components/card/item-card.vue'
import EventCard, { EventCardProps } from '@/components/card/event-card.vue'
import { ProgressCardProps } from '~/src/components/card/progress-card.vue'
import { SimpleTabItem } from '@/components/tab/simple-tab.vue'
import CategoryCard, {
  CategoryCardProps,
} from '~/src/components/card/category-card.vue'

const dateFilters: SimpleTabItem[] = [
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
  },
]

const items: ItemCardProps[] = [
  {
    label: 'Item sale #340-00',
    value: '+$890.00',
    icon: 'cart',
  },
  {
    label: 'New lead created',
    value: '30 min',
    icon: 'create',
  },
  {
    label: 'Item sale #360-20',
    value: '+$940.00',
    icon: 'cart',
  },
  {
    label: 'Items upload complete',
    value: '45 min',
    icon: 'upload',
  },
  {
    label: 'Email notifications sent',
    value: '2 hrs',
    icon: 'notification',
  },
]

const events: EventCardProps[] = [
  {
    date: '05:48AM',
    title: 'Meeting with a client',
    description: 'Tell how to boost website traffic',
    color: 'primary',
  },
  {
    date: '10:28AM',
    title: 'New project discussion',
    description: 'Business Cards Does Your Business',
    color: 'warning',
  },
]

const categories: CategoryCardProps[] = [
  {
    icon: 'laptop',
    title: 'Electronics',
    value: '1.345',
    iconFillColor: 'primary',
    iconBackgroundColor: 'primary-resting',
  },
  {
    icon: 'diamond',
    title: 'Accessories',
    value: '1.042',
    iconFillColor: 'danger',
    iconBackgroundColor: 'danger-light',
  },
  {
    icon: 'keyboard',
    title: 'Digital goods',
    value: '980',
    iconFillColor: 'primary-grey',
    iconBackgroundColor: 'background-2',
  },
]

const progressCards: ProgressCardProps[] = [
  {
    label: 'Sales',
    description: 'Week comparison',
    value: 1.345,
    progressColor: 'primary',
    trend: 'up',
    percent: 80,
    backgroundColor: 'white',
  },
  {
    label: 'Leads',
    description: 'Month comparison',
    value: 3.82,
    progressColor: 'warning',
    trend: 'down',
    percent: 60,
    backgroundColor: 'white',
  },
  {
    label: 'Income',
    description: 'Week comparison',
    valuePrefix: '$',
    value: 4690,
    progressColor: 'danger',
    trend: 'up',
    percent: 30,
    backgroundColor: 'white',
  },
]

const current = 'Dashboard'
const haveNotification = 'Messages'

const collapsed = ref<boolean>(false)

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
