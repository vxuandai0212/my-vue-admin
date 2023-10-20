<template>
  <div
    class="background-color-background-light flex m-height-screen overflow-hidden"
  >
    <div
      class="pb-10 background-color-white border-right-1 border-right-color-outline border-right-solid transition flex flex-col max-h-screen"
      :class="[collapsed ? 'width-89' : 'width-242']"
    >
      <div class="__navigation__">
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
    <div class="flex flex-grow max-h-screen">
      <slot name="side-content"></slot>
      <div class="p-0-28-28-28 flex-grow">
        <div class="flex justify-between items-center height-84">
          <div class="flex items-center">
            <icon-button icon="hamburger" @click="collapsed = !collapsed" />
            <div
              class="ml-20 color-primary-dark font-size-20 font-700 line-height-32 cursor-default"
            >
              {{ routeName }}
            </div>
          </div>
          <div class="flex items-center justify-end gap-6">
            <simple-search />
            <add-button />
          </div>
        </div>
        <!-- report -->
        <slot name="main-content"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useRouteStore } from '~/src/store';
import { translateMenuLabel } from '~/src/utils';

defineOptions({ name: 'CustomLayout' })

const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const current = 'Dashboard'
const haveNotification = 'Messages'

const app = useAppStore()

const collapsed = computed(() => app.siderCollapse)

const routeStore = useRouteStore();

const menus = computed(() => translateMenuLabel(routeStore.menus as App.GlobalMenuOption[]));
</script>
