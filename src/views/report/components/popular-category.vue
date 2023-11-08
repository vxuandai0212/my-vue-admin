<template>
  <div
    class="2xl:col-span-3 <lg:col-span-3 col-span-1 flex flex-col gap-18 2xl:p-20-23-20-28 p-28-23-28-28 background-color-white rounded-12"
  >
    <div class="flex flex-col">
      <div class="color-primary-dark font-size-16 font-700 line-height-24">
        {{ $t('page.report.popularCategory.title') }}
      </div>
      <div class="color-primary-grey font-size-14 font-400 line-height-21">
        {{ $t('page.report.popularCategory.description') }}
      </div>
    </div>
    <div v-if="!loading" class="flex flex-col gap-9">
      <category-card v-for="item in data" v-bind="item" />
    </div>
    <v-loading v-else />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { fetchPopularCategory } from '@/service'
import { I18nType } from '@/typings/system'
import { useLoading } from '@/hooks'
import { LocalIcon } from '@/typings/icon'
import { $t } from '@/locales'
import { CategoryCardProps } from '@/components/card/category-card.vue'

defineOptions({ name: 'PopularCategory' })

const { loading, startLoading, endLoading } = useLoading(false)

const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  electronic: 'page.report.popularCategory.electronic',
  accessory: 'page.report.popularCategory.accessory',
  'digital-good': 'page.report.popularCategory.digitalGood',
}

const ICON_MAP: { [key: string]: LocalIcon } = {
  electronic: 'laptop',
  accessory: 'diamond',
  'digital-good': 'keyboard',
}

const ICON_FILL_COLOR = {
  electronic: 'primary',
  accessory: 'danger',
  'digital-good': 'primary-grey',
}

const ICON_BACKGROUND_COLOR = {
  electronic: 'primary-resting',
  accessory: 'danger-light',
  'digital-good': 'background-2',
}

const data = ref<CategoryCardProps[]>()

function setData(value: ApiReport.PopularCategory[]) {
  data.value = value.map(function (i): CategoryCardProps {
    return {
      icon: ICON_MAP[i.type],
      title: I18N_MAP[i.type],
      value: i.value,
      iconFillColor: ICON_FILL_COLOR[i.type],
      iconBackgroundColor: ICON_BACKGROUND_COLOR[i.type],
    }
  })
}

async function getData() {
  startLoading()
  const { data } = await fetchPopularCategory()
  if (data) {
    setTimeout(() => {
      setData(data)
      endLoading()
    }, 1000)
  }
}

function init() {
  getData()
}

init()
</script>
