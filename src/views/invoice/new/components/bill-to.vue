<template>
  <div class="flex flex-col gap-11">
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
          upload image
        </div>
      </n-upload-dragger>
    </n-upload>
    <div class="flex flex-col gap-22">
      <div class="flex gap-28">
        <v-input
          class="flex-grow"
          label="Invoice number"
          icon="invoice"
          type="text"
          placeholder="Start typing…"
        />
        <v-select
          :options="templateOptions"
          class="flex-grow"
          label="Template"
          icon="caret-down"
          type="text"
          placeholder="Select invoice template"
        />
      </div>
      <div class="flex gap-28">
        <v-input
          class="flex-grow"
          label="Company name"
          icon="company"
          type="text"
          placeholder="Start typing…"
        />
        <v-datepicker
          class="flex-grow"
          label="Date"
          icon="date"
          placeholder="Select due date"
        />
      </div>
      <div class="flex gap-28">
        <v-input
          class="flex-grow"
          label="Business address"
          icon="business"
          type="text"
          placeholder="Start typing..."
        />
      </div>
      <div class="flex gap-28">
        <v-select
          :options="templateOptions"
          class="flex-grow"
          label="Country"
          icon="caret-down"
          type="text"
          placeholder="Select country"
        />
        <v-select
          :options="templateOptions"
          class="flex-grow"
          label="City"
          icon="caret-down"
          type="text"
          placeholder="Select city"
        />
      </div>
      <div class="flex gap-28">
        <v-input
          class="flex-grow"
          label="Phone number"
          icon="phone"
          type="text"
          placeholder="Start typing..."
        />
        <v-input
          class="flex-grow"
          label="Email"
          icon="email"
          type="text"
          placeholder="Start typing..."
        />
      </div>
      <div class="flex gap-28">
        <v-input
          style="flex: 50%"
          label="Tax rate"
          icon="rate"
          type="text"
          placeholder="Start typing..."
        />
        <div style="flex: 50%"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface';

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
