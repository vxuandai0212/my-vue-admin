<template>
  <div>
    <div class="flex p-14-25-16-45 background-color-FBFBFD cursor-default">
      <div
        v-for="item in props.headers"
        class="color-primary-grey font-size-12 font-700 line-height-18"
        :style="{
          width: `${item.width}%`,
          textAlign: item.align ? item.align : 'left',
        }"
      >
        {{ item.label }}
      </div>
      <div v-if="hasCommand" class="width-80"></div>
    </div>
    <div class="p-22-0-36-0 flex flex-col gap-7">
      <div
        v-for="item in data"
        class="border-1 border-solid border-color-resting-outline rounded-12 flex height-88 flex items-center m-0-25-0-25 p-0-0-0-20 hover:background-color-background-extra-light transition"
      >
        <div
          v-for="(value, key) in item"
          class="color-primary-dark font-size-16 line-height-24 flex items-center cursor-default"
          :style="{
            width: getWidth(key),
            justifyContent: getJustifyContent(key),
            fontStyle: getFontStyle(key),
            fontWeight: getFontWeight(key),
          }"
        >
          <template v-if="isShowField(key)">
            <template v-if="isMatchType(key, 'tag')">
              <tag :label="value.value" :type="value.type" />
            </template>
            <template v-else-if="isMatchType(key, 'icon-text')">
              <div
                class="width-52 height-52 rounded-8 flex justify-center items-center"
                style="
                  background: linear-gradient(
                      0deg,
                      rgba(94, 129, 244, 0.1) 0%,
                      rgba(94, 129, 244, 0.1) 100%
                    ),
                    #fff;
                "
              >
                <Icon
                  style="width: 18px; height: 18px; color: var(--primary)"
                  icon="ph:calculator"
                />
              </div>
              <div class="ml-20">{{ getFormatText(key, value.text) }}</div>
            </template>
            <template v-else-if="isMatchType(key, 'image-text')">
              <img
                class="width-36 height-36 rounded-6"
                src="@/assets/images/avatar.png"
                alt="image"
              />
              <div class="ml-12">{{ getFormatText(key, value.text) }}</div>
            </template>
            <template v-else>{{ getFormatText(key, value) }}</template>
          </template>
        </div>
        <div class="width-80 cursor-pointer" v-if="hasCommand">
          <n-dropdown
            v-if="isRenderCommandDropdown(item)"
            trigger="click"
            :options="item.commands"
            size="large"
            :show="selectedId === item.id"
            :on-clickoutside="dropdownOnClickOutside"
            :render-option="render"
          >
            <icon-button 
              class="border-1 border-solid border-color-resting-outline rounded-8" 
              icon="three-dot" 
              icon-fill-color="primary-grey"
              icon-background-color="white"
              @click="dropdownClick(item.id)" 
            />
          </n-dropdown>
        </div>
      </div>
    </div>
    <div class="flex justify-end p-0-25-0-25">
      <n-pagination
        v-model:page="page"
        :page-count="100"
        size="large"
        show-quick-jumper
        show-size-picker
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'

defineOptions({ name: 'VTable' })

interface Format {
  type: 'datetime' | 'currency'
  value: any
}

const selectedId = ref()

function dropdownClick(v: any) {
  selectedId.value = v
}

function dropdownOnClickOutside() {
  selectedId.value = null
}

export interface Header {
  key?: string
  label?: string
  type: 'text' | 'tag' | 'icon-text' | 'image-text'
  format?: Format
  style?: 'italic' | 'bold'
  align?: 'left' | 'center' | 'right'
  showLabel?: boolean
  width?: number
}

interface Props {
  headers: Array<Header>
  data: Array<any>
}

const emit = defineEmits()

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
        emit(arg.option.key, { id: selectedId.value })
        selectedId.value = null
      },
    },
    arg.option.label
  )
}

const props = withDefaults(defineProps<Props>(), {})

const hasCommand = computed(() => {
  const r =
    props.data &&
    props.data.filter((item) => item.commands && item.commands.length > 0)
      .length > 0
  return r
})

function isRenderCommandDropdown(item: any) {
  return item.commands && item.commands.length > 0
}

const page = ref<number>(2)

function getWidth(key: any) {
  if (!isShowField(key)) return
  const width = props.headers.filter((item) => item.key === key)[0].width
  return `${width}%`
}

function isMatchType(key: any, matchType: any) {
  if (!isShowField(key)) return
  const type = props.headers.filter((item) => item.key === key)[0].type
  return type === matchType
}

function getFontStyle(key: any) {
  if (!isShowField(key)) return
  const fontStyle = props.headers.filter((item) => item.key === key)[0].style
  if (fontStyle === 'italic') return 'italic'
  return
}

function getFontWeight(key: any) {
  if (!isShowField(key)) return
  const fontWeight = props.headers.filter((item) => item.key === key)[0].style
  if (fontWeight === 'bold') return '700'
  else return '400'
}

function getJustifyContent(key: any) {
  if (!isShowField(key)) return
  const align = props.headers.filter((item) => item.key === key)[0].align
  return align ? align : 'left'
}

function getFormatText(key: any, value: any) {
  if (!isShowField(key)) return
  const format = props.headers.filter((item) => item.key === key)[0].format
  if (format) {
    if (format.type === 'datetime') {
      return dayjs(value).locale('en').format(format.value)
    } else if (format.type === 'currency') {
      return new Intl.NumberFormat(format.value.locale, {
        style: format.value.style,
        currency: format.value.currency,
      }).format(value)
    } else {
      return value
    }
  } else {
    return value
  }
}

function isShowField(key: any) {
  return props.headers.filter((item) => item.key === key).length > 0
}
</script>
