<template>
  <div
    class="2xl:col-span-3 <lg:col-span-3 col-span-1 flex flex-col gap-18 2xl:p-20-23-20-28 p-28-23-28-28 background-color-white rounded-12"
  >
    <div class="color-primary-dark font-size-16 font-700 line-height-24">
      {{ $t('page.report.latestUpdate.title') }}
    </div>
    <div v-if="!loading" class="flex flex-col gap-9">
      <item-card v-for="item in data" v-bind="item" />
    </div>
    <v-loading v-else />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchLatestUpdate } from '@/service'
import { I18nType } from '@/typings/system'
import { ItemCardProps } from '@/components/card/item-card.vue'
import { useLoading } from '@/hooks'
import { LocalIcon } from '@/typings/icon'
import { $t } from '@/locales'
import { useDatetime } from '@/composables'
import { moneyFormat } from '@/utils/common/currency-format'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'LatestUpdate' })

const { timeFromNow } = useDatetime()

const { loading, startLoading, endLoading } = useLoading(false)

const I18N_MAP: { [key: string]: I18nType.I18nKey } = {
  'item-sale': 'page.report.latestUpdate.itemSale',
  'lead-created': 'page.report.latestUpdate.newLeadCreated',
  'item-upload-complete': 'page.report.latestUpdate.itemUploadComplete',
  'email-notification-sent': 'page.report.latestUpdate.emailNotificationSent',
}

const ICON_MAP: { [key: string]: LocalIcon } = {
  'item-sale': 'cart',
  'lead-created': 'create',
  'item-upload-complete': 'upload',
  'email-notification-sent': 'notification',
}

const { locale } = useI18n()
watch(locale, () => {
  getData()
})

const data = ref<ItemCardProps[]>()

function setData(value: ApiReport.LatestUpdate[]) {
  data.value = value.map(function (i): ItemCardProps {
    let label = `${$t(I18N_MAP[i.type])}`
    if (i.type === 'item-sale') {
      label = `${$t(I18N_MAP[i.type])} #${i.code}`
    }

    let value = ''
    if (i.type === 'item-sale') {
      value = `+${moneyFormat('en-US', 'currency', 'USD', i.value as number)}`
    } else {
      value = `${timeFromNow(i.value)}`
    }
    return {
      label,
      value,
      icon: ICON_MAP[i.type],
    }
  })
}

async function getData() {
  startLoading()
  const { data } = await fetchLatestUpdate()
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
