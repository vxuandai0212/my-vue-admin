<template>
  <div class="flex">
    <div
      class="basis-1/4 grow-0 shrink-0 background-color-white p-28-29-28-28 h-screen overflow-y-no-scrollbar"
    >
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
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
            Latest updates
          </div>
          <div class="flex flex-col gap-9">
            <item-card v-for="item in items" v-bind="item" />
          </div>
          <div class="color-primary-dark font-size-16 font-700 line-height-24">
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
    <div class="p-0-28-28-28 basis-3/4 grow shrink overflow-hidden">
      <custom-header />
      <div class="grid grid-cols-3 gap-28 pb-28 __main-section__">
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
</template>

<script setup lang="ts">
import ItemCard, { ItemCardProps } from '@/components/card/item-card.vue'
import EventCard, { EventCardProps } from '@/components/card/event-card.vue'
import { ProgressCardProps } from '~/src/components/card/progress-card.vue'
import { SimpleTabItem } from '@/components/tab/simple-tab.vue'
import CategoryCard, {
  CategoryCardProps,
} from '~/src/components/card/category-card.vue'
import CustomHeader from '@/layouts/custom-layout/components/custom-header.vue'

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


</script>
<style>
.__navigation__,
.__sidebar__,
.__main-section__ {
  overflow: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.__navigation__::-webkit-scrollbar {
  display: none;
}
.__sidebar__::-webkit-scrollbar {
  display: none;
}
.__main-section__::-webkit-scrollbar {
  display: none;
}
.__main-section__ {
  max-height: calc(100vh - 84px);
  overflow-y: auto;
}

.__navigation__:hover {
  overflow-y: auto;
}
.__sidebar__:hover {
  overflow-y: auto;
}
</style>
