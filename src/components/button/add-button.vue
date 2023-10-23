<template>
  <n-dropdown
    style="max-height: 265px; overflow-y: auto; width: 285px"
    trigger="click"
    :options="options"
    size="large"
    :show="showDropdown"
    :on-clickoutside="
      () => {
        showDropdown = false
      }
    "
  >
    <div
      class="cursor-pointer flex items-center justify-center width-36 height-36 rounded-6"
      :style="[
        showDropdown
          ? 'background-color: var(--primary)'
          : 'background-color: var(--background-3)',
      ]"
      @click="showDropdown = true"
    >
      <v-icon
        class="width-16 height-16"
        :style="[
          showDropdown ? 'fill: var(--white)' : 'fill: var(--primary-grey)',
        ]"
        icon="add"
      />
    </div>
  </n-dropdown>
</template>
<script setup lang="tsx">
import { DropdownRenderOption } from 'naive-ui/es/dropdown/src/interface'
import { ref } from 'vue'
import { useRouterPush } from '~/src/composables';
const { routerPush } = useRouterPush()

const showDropdown = ref<boolean>(false)

const options: DropdownRenderOption[] = [
  {
    key: 'Option 1',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'project_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'keyboard'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Project
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'Option 2',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'task_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'phone'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Task
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'Option 3',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'contact_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'cart'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Contact
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'Option 4',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'notification_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'business'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Event
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'Option 5',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'product_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'money'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Product
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'Option 6',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light transition'
          }
          onClick={() => {
            showDropdown.value = false
            routerPush({ name: 'invoice_new' })
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <icon-button
              icon={'laptop'}
              iconFillColor={'primary'}
              iconBackgroundColor={'primary-resting'}
            />
            <div
              class={
                'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
              }
            >
              New Invoice
            </div>
          </div>
        </div>
      )
    },
  },
]
</script>
