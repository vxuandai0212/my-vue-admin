<template>
  <div
    class="2xl:col-span-3 <lg:col-span-3 col-span-1 flex flex-col gap-18 2xl:p-20-23-20-28 p-28-23-28-28 background-color-white rounded-12"
  >
    <div class="color-primary-dark font-size-16 font-700 line-height-24">
      {{ $t('page.report.upComingEvent.title') }}
    </div>
    <div v-if="!loading" class="flex flex-col gap-9">
      <event-card v-for="item in data" v-bind="item" />
    </div>
    <v-loading v-else />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchUpcomingEvent } from '@/service'
import { useLoading } from '@/hooks'
import { $t } from '@/locales'
import { useDatetime } from '@/composables'
import { useI18n } from 'vue-i18n'
import { EventCardProps } from '@/components/card/event-card.vue'

defineOptions({ name: 'UpcomingEvent' })

const { now, datetime } = useDatetime()

const { loading, startLoading, endLoading } = useLoading(false)

const { locale } = useI18n()
watch(locale, () => {
  getData()
})

const data = ref<EventCardProps[]>()

function setData(value: ApiReport.UpcomingEvent[]) {
  data.value = value.map(function (i): EventCardProps {
    const diff = Math.ceil(datetime(now()).diff(i.startAt, 'minutes', true))
    console.log(diff)
    let color: EventCardProps['color'] = 'primary'
    if (diff < 60) {
      color = 'danger'
    }
    return {
      date: datetime(i.startAt).format('hh:mm A'),
      title: i.title,
      description: i.description,
      color,
    }
  })
}

async function getData() {
  startLoading()
  const { data } = await fetchUpcomingEvent()
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
