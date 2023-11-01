<template>
  <div class="background-color-background-light flex h-screen overflow-hidden">
    <div
      v-if="!isMobile"
      class="pb-10 background-color-white border-right-1 border-right-color-outline border-right-solid transition flex flex-col grow-0 shrink-0"
      :class="[collapsed ? 'basis-89px' : 'basis-242px']"
    >
      <div class="flex flex-col gap-38 h-screen">
        <div class="flex flex-col gap-22 grow shink overflow-hidden">
          <div
            class="basis-56px grow-0 shrink-0 pt-26 pl-29 flex gap-23 items-center cursor-pointer"
          >
            <svg-logo />
            <span
              :class="collapsed ? 'width-0' : ''"
              class="color-primary font-size-20 font-900 overflow-hidden transition"
              >betaCRM</span
            >
          </div>
          <div class="grow shink overflow-y-no-scrollbar">
            <div
              v-for="item in menus"
              class="p-8-0-8-19 group flex jusity-between cursor-pointer"
            >
              <div
                class="group-hover:background-color-info flex items-center transition flex-grow mr-19 rounded-4 relative"
                :class="[
                  item.key === current
                    ? 'background-color-primary-resting'
                    : 'background-color-white',
                  collapsed ? 'gap-0' : 'gap-15',
                ]"
                @click="routerPush({ name: item.key })"
              >
                <div
                  v-if="item.label === haveNotification"
                  class="background-color-danger absolute width-12 height-12 left-26 top-11 rounded-50 border-color-white border-2"
                ></div>
                <v-icon
                  class="group-hover:fill-white width-48 text-center transition"
                  :class="[
                    item.key === current ? 'fill-primary' : 'fill-primary-grey',
                  ]"
                  :icon="item.icon"
                />
                <span
                  class="group-hover:color-white font-size-14 font-700 line-height-21 overflow-hidden truncate transition"
                  :class="[
                    item.key === current
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
                  item.key === current
                    ? 'background-color-primary'
                    : 'background-color-white',
                ]"
              ></div>
            </div>
          </div>
        </div>
        <n-dropdown
          v-if="app.reloadFlag"
          trigger="click"
          :options="commands"
          size="large"
          :render-option="render"
        >
          <div
            class="p-8-0-18-19 flex basis-56px grow-0 shrink-0 items-center gap-15 cursor-pointer relative"
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
        </n-dropdown>
      </div>
    </div>
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in"
        :appear="true"
        @before-leave="app.setDisableMainXScroll(true)"
        @after-enter="app.setDisableMainXScroll(false)"
      >
        <keep-alive :include="routeStore.cacheRoutes">
          <component
            class="grow shrink overflow-hidden"
            :is="Component"
            v-if="app.reloadFlag"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, useAuthStore, useRouteStore } from '@/store'
import { translateCustomMenuLabel } from '@/utils'
import { App } from '@/typings/system'
import { useRouterPush } from '@/composables'
import { $t } from '@/locales'
import { useScreen } from '@/composables'

defineOptions({ name: 'BasicLayout' })

const { isMobile } = useScreen()

const { routerPush } = useRouterPush()

const route = useRoute()

const current = computed(
  () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
)
const haveNotification = 'Messages'

const app = useAppStore()

const auth = useAuthStore()

const collapsed = computed(() => app.siderCollapse)

const routeStore = useRouteStore()

const menus = computed(() =>
  translateCustomMenuLabel(routeStore.menus as App.CustomMenuOption[])
)

const commands = [
  {
    label: 'common.logout.title',
    key: 'logout',
  },
]

function render(arg: any) {
  const color =
    arg.option.type === 'warning'
      ? 'warning'
      : arg.option.type === 'danger'
      ? 'danger'
      : 'primary-dark'
  return h(
    'div',
    {
      style: `color: var(--${color})`,
      class: `cursor-pointer p-12-20-13-17 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light transition`,
      onClick: () => {
        window.$dialog?.info({
          title: $t('common.logout.title'),
          content: $t('common.logout.content'),
          positiveText: $t('common.logout.confirm'),
          negativeText: $t('common.logout.cancel'),
          onPositiveClick: () => {
            auth.resetAuthStore()
          },
        })
      },
    },
    $t(arg.option.label)
  )
}
</script>
