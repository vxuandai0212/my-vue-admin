<template>
  <n-dropdown
    style="max-height: 265px; overflow-y: auto; width: 454px"
    trigger="click"
    :options="options"
    size="large"
    :show="showDropdown"
    :on-clickoutside="
      () => {
        showDropdown = false
        showInput = false
      }
    "
  >
    <div
      ref="simpleSearchContainerRef"
      :style="[
        showInput
          ? 'background: white;box-shadow: 0px 6px 20px 0px rgba(153, 155, 168, 0.1)'
          : 'background: rgba(129, 129, 165, 0.1)',
      ]"
      class="flex items-center height-36 rounded-6 cursor-pointer transition"
    >
      <input
        ref="inputRef"
        class="border-none color-primary-dark font-size-14 font-400 line-height-21 transition"
        :style="[
          `width: ${inputWidth}px`,
          showInput ? 'margin-left: 18px' : 'margin-left: 0',
        ]"
        type="text"
        :placeholder="$t('common.header.search.placeholder')"
        v-model="inputValue"
        @input="showDropdown = true"
      />
      <div
        class="flex items-center justify-center width-36"
        @click="() => {showInput = true; (inputRef as any).focus()}"
      >
        <v-icon
          class="width-16 height-16"
          :class="[showInput ? 'fill-primary' : 'fill-primary-grey']"
          icon="search"
        />
      </div>
    </div>
  </n-dropdown>
</template>
<script setup lang="tsx">
import { DropdownRenderOption } from 'naive-ui/es/dropdown/src/interface'
import { computed, watch } from 'vue'
import { ref } from 'vue'
import { useClick } from '@/hooks'
import { $t } from '@/locales'

const inputRef = ref(null)
const inputValue = ref()
const showInput = ref<boolean>(false)
const inputWidth = computed(() => (showInput.value ? 400 : 0))
const showDropdown = ref<boolean>(false)

const { el } = useClick()

const simpleSearchContainerRef = ref(null)

watch(el, (newValue) => {
  const simpleSearchContainerEl: any = simpleSearchContainerRef.value
  if (!showInput.value) return
  if (!simpleSearchContainerEl) return
  if (showInput.value && !simpleSearchContainerEl.contains(newValue)) {
    showInput.value = false
  }
})

const options: DropdownRenderOption[] = [
  {
    key: 'Empty',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-default p-12-20-13-17 flex items-center justify-between'
          }
        >
          <div
            class={'color-primary-dark font-size-14 font-700 line-height-21'}
          >
            No item found!
          </div>
        </div>
      )
    },
  },
]

// const options: DropdownRenderOption[] = [
//   {
//     key: 'Option 1',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 1'
//             showDropdown.value = false
//           }}
//         >
//           <div class={'flex gap-15 items-center'}>
//             <icon-button icon={'keyboard'} iconFillColor={'danger'} iconBackgroundColor={'background-light'} />
//             <div class={'flex flex-col justify-between'}>
//               <div
//                 class={
//                   'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
//                 }
//               >
//                 Dribble Redesign
//               </div>
//               <div
//                 class={
//                   'color-primary-grey font-size-14 font-400 line-height-21'
//                 }
//               >
//                 Webdesign
//               </div>
//             </div>
//           </div>
//           <div
//             class={
//               'flex items-center justify-center width-110 background-color-background-light rounded-8 color-primary-grey font-size-14 font-700 line-height-21'
//             }
//           >
//             24 Feb 2019
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 2',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 2'
//             showDropdown.value = false
//           }}
//         >
//           <div class={'flex gap-15 items-center'}>
//             <icon-button icon={'diamond'} iconFillColor={'success'} iconBackgroundColor={'background-light'} />
//             <div class={'flex flex-col justify-between'}>
//               <div
//                 class={
//                   'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
//                 }
//               >
//                 New HTML Theme
//               </div>
//               <div
//                 class={
//                   'color-primary-grey font-size-14 font-400 line-height-21'
//                 }
//               >
//                 Theme
//               </div>
//             </div>
//           </div>
//           <div
//             class={
//               'flex items-center justify-center width-110 background-color-background-light rounded-8 color-primary-grey font-size-14 font-700 line-height-21'
//             }
//           >
//             20 May 2019
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 3',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 3'
//             showDropdown.value = false
//           }}
//         >
//         <div class={'flex gap-15 items-center'}>
//             <img src={'https://cdn-images.kiotviet.vn/anhkienpc/01b0e3a8ad4242248b110f431dbd5ee7.bmp'} class={'width-36 height-36 rounded-8'} />
//             <div class={'flex flex-col justify-between'}>
//               <div
//                 class={
//                   'group-hover:color-primary color-primary-dark font-size-14 font-700 line-height-21 transition'
//                 }
//               >
//               Bradley Wilkins
//               </div>
//               <div
//                 class={
//                   'color-primary-grey font-size-14 font-400 line-height-21'
//                 }
//               >
//               b.wilkins@gmail.com
//               </div>
//             </div>
//           </div>
//           <div
//             class={
//               'flex items-center justify-center width-110 background-color-background-light rounded-8 color-primary-grey font-size-14 font-700 line-height-21'
//             }
//           >
//           Designer
//           </div>
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 4',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 4'
//             showDropdown.value = false
//           }}
//         >
//           Option 4
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 5',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 5'
//             showDropdown.value = false
//           }}
//         >
//           Option 5
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 6',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 6'
//             showDropdown.value = false
//           }}
//         >
//           Option 6
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 7',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 7'
//             showDropdown.value = false
//           }}
//         >
//           Option 7
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 8',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 8'
//             showDropdown.value = false
//           }}
//         >
//           Option 8
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 9',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 9'
//             showDropdown.value = false
//           }}
//         >
//           Option 9
//         </div>
//       )
//     },
//   },
//   {
//     key: 'Option 10',
//     type: 'render',
//     render() {
//       return (
//         <div
//           class={
//             'w-full cursor-pointer p-12-20-13-17 line-height-24 font-size-14 font-700 hover:color-primary hover:background-color-background-extra-light transition'
//           }
//           onClick={() => {
//             inputValue.value = 'Option 10'
//             showDropdown.value = false
//           }}
//         >
//           Option 10
//         </div>
//       )
//     },
//   },
// ]
</script>
<style scoped>
input {
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #8181a5;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>
