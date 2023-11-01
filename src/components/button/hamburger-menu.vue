<template>
  <n-dropdown
    style="max-height: 265px; overflow-y: auto; width: 150px"
    trigger="click"
    :options="options"
    :placement="props.placement"
    size="large"
    :show="showDropdown"
    :on-clickoutside="
      () => {
        showDropdown = false
      }
    "
  >
    <div
      class="flex items-center gap-10 cursor-pointer"
      @click="showDropdown = true"
    >
      <div
        class="flex items-center justify-center width-36 height-36 rounded-6"
        :style="[
          showDropdown
            ? 'background-color: var(--primary)'
            : 'background-color: var(--background-3)',
        ]"
      >
        <v-icon
          class="width-16 height-16"
          :style="[
            showDropdown ? 'fill: var(--white)' : 'fill: var(--primary-grey)',
          ]"
          icon="hamburger"
        />
      </div>
    </div>
  </n-dropdown>
</template>

<script lang="tsx" setup>
import { computed, ref } from 'vue'
import { translateCustomMenuLabel } from '@/utils'
import { App } from '@/typings/system'
import { DropdownRenderOption } from 'naive-ui/es/dropdown/src/interface'
import { useRouterPush } from '@/composables'
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/store'

defineOptions({ name: 'LangButton' })

type PopoverPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'

interface LangButtonProps {
  placement?: PopoverPlacement
  showButtonLabel?: boolean
}

const props = withDefaults(defineProps<LangButtonProps>(), {
  placement: 'bottom',
  showButtonLabel: false,
})

const { routerPush } = useRouterPush()

const route = useRoute()

const current = computed(
  () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
)

const routeStore = useRouteStore()

const menus = computed(() =>
  translateCustomMenuLabel(routeStore.menus as App.CustomMenuOption[])
)

const options: DropdownRenderOption[] = menus.value.map((item, index) => {
  const { key, label } = item
  return {
    key,
    type: 'render',
    render() {
      return (
        <div
          class={`w-full cursor-pointer p-12-20-13-17 flex items-center group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light ${
            index !== menus.value.length - 1
              ? 'border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled'
              : ''
          } transition`}
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: key })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <div
              class={`group-hover:color-primary ${
                key === current.value ? 'color-primary' : 'color-primary-dark'
              } font-size-14 font-700 line-height-21 transition`}
            >
              {label}
            </div>
          </div>
        </div>
      )
    },
  }
})

const showDropdown = ref<boolean>(false)
</script>
<style scoped></style>
