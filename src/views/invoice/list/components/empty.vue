<template>
  <div class="flex flex-col items-center mt-137">
    <icon-local-no-invoice class="width-590 height-377" />
    <div
      class="color-primary-dark font-size-32 font-700 line-height-42 mt-30 cursor-default"
    >
      No invoices found?
    </div>
    <div
      class="width-371 break-words color-primary-grey font-size-14 font-400 line-height-21 mt-13 text-center cursor-default"
    >
      Try to create more new invoices, send these documents and wait for a
      payment
    </div>
    <primary-button label="Create Invoice" class="p-14-44-15-44 mt-21" />
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'EmptyInvoice' })
</script>
