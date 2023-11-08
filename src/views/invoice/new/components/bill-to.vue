<template>
  <div class="flex flex-col gap-15">
    <n-upload
      multiple
      directory-dnd
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :max="5"
    >
      <n-upload-dragger
        class="flex justify-center items-center gap-5 height-206"
      >
        <v-icon icon="upload" class="fill-primary-dark width-18" />
        <div class="color-primary-dark font-size-12 font-900 uppercase">
          {{ $t('page.invoice.detail.billTo.uploadImage') }}
        </div>
      </n-upload-dragger>
    </n-upload>
    <div class="grid grid-cols-2 gap-y-22px gap-x-28px">
      <v-input
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.invoiceNumber.title')"
        icon="invoice"
        type="text"
        :placeholder="
          $t('page.invoice.detail.billTo.invoiceNumber.placeholder')
        "
      />
      <v-select
        :options="templateOptions"
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.template.title')"
        icon="caret-down"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.template.placeholder')"
      />
      <v-input
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.companyName.title')"
        icon="company"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.companyName.placeholder')"
      />
      <v-datepicker
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.date.title')"
        icon="date"
        :placeholder="$t('page.invoice.detail.billTo.date.placeholder')"
      />
      <v-input
        class="col-span-2"
        :label="$t('page.invoice.detail.billTo.businessAddress.title')"
        icon="business"
        type="text"
        :placeholder="
          $t('page.invoice.detail.billTo.businessAddress.placeholder')
        "
      />
      <v-select
        :options="templateOptions"
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.country.title')"
        icon="caret-down"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.country.placeholder')"
      />
      <v-select
        :options="templateOptions"
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.city.title')"
        icon="caret-down"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.city.placeholder')"
      />
      <v-input
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.phoneNumber.title')"
        icon="phone"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.phoneNumber.placeholder')"
      />
      <v-input
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.email.title')"
        icon="email"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.email.placeholder')"
      />
      <v-input
        class="col-span-1 <md:col-span-2"
        :label="$t('page.invoice.detail.billTo.taxRate.title')"
        icon="rate"
        type="text"
        :placeholder="$t('page.invoice.detail.billTo.taxRate.placeholder')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { $t } from '@/locales'
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

defineOptions({ name: 'InvoiceBillTo' })

const templateOptions: DropdownMixedOption[] = [
  {
    key: 'Option 1',
    label: 'Option 1',
  },
  {
    key: 'Option 2',
    label: 'Option 2',
  },
  {
    key: 'Option 3',
    label: 'Option 3',
  },
  {
    key: 'Option 4',
    label: 'Option 4',
  },
  {
    key: 'Option 5',
    label: 'Option 5',
  },
  {
    key: 'Option 6',
    label: 'Option 6',
  },
  {
    key: 'Option 7',
    label: 'Option 7',
  },
  {
    key: 'Option 8',
    label: 'Option 8',
  },
  {
    key: 'Option 9',
    label: 'Option 9',
  },
  {
    key: 'Option 10',
    label: 'Option 10',
  },
]
</script>
