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
        icon="language"
      />
    </div>
  </n-dropdown>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { localStg } from '@/utils'
import { I18nType } from '@/typings/system'
import { DropdownRenderOption } from 'naive-ui/es/dropdown/src/interface'

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
}

const props = withDefaults(defineProps<LangButtonProps>(), {
  placement: 'bottom',
})

const showDropdown = ref<boolean>(false)

const options: DropdownRenderOption[] = [
  {
    key: 'vi',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light border-bottom-1 border-bottom-solid border-bottom-color-primary-disabled transition'
          }
          onClick={() => {
            showDropdown.value = false
            handleSelect('vi')
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <div
              class={`group-hover:color-primary ${
                language.value === 'vi' ? 'color-primary' : 'color-primary-dark'
              } font-size-14 font-700 line-height-21 transition`}
            >
              Tiếng Việt
            </div>
          </div>
        </div>
      )
    },
  },
  {
    key: 'en',
    type: 'render',
    render() {
      return (
        <div
          class={
            'w-full cursor-pointer p-12-20-13-17 flex items-center justify-between group line-height-24 font-size-14 font-700 hover:background-color-background-extra-light transition'
          }
          onClick={() => {
            showDropdown.value = false
            handleSelect('en')
          }}
        >
          <div class={'flex gap-15 items-center'}>
            <div
              class={`group-hover:color-primary ${
                language.value === 'en' ? 'color-primary' : 'color-primary-dark'
              } font-size-14 font-700 line-height-21 transition`}
            >
              English
            </div>
          </div>
        </div>
      )
    },
  },
]

const { locale } = useI18n()

const language = ref<I18nType.LangType>(localStg.get('lang') || 'vi')

const handleSelect = (key: string) => {
  language.value = key as I18nType.LangType
  locale.value = key
  localStg.set('lang', key as I18nType.LangType)
}
</script>
<style scoped></style>
