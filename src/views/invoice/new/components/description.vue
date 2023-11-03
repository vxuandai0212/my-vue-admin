<template>
  <div class="flex flex-col gap-51">
    <div class="flex flex-col gap-28">
      <div class="flex flex-col gap-28">
        <div class="flex flex-col gap-28">
          <div
            class="flex p-0-18-0-18 justify-between items-center background-color-FBFBFD rounded-8 height-50"
          >
            <div>Item</div>
            <div class="flex gap-7">
              <v-icon class="fill-primary-dark height-15" icon="delete" />
              <div class="uppercase color-primary-dark font-size-12 font-900">
                remove
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-12">
            <v-input
              class="flex-grow"
              label="Item description"
              icon="cart"
              placeholder="Start typing..."
            />
            <div class="flex gap-30">
              <v-input
                class="flex-grow"
                label="Hours"
                icon="hour"
                placeholder="Start typing..."
              />
              <v-input
                class="flex-grow"
                label="Rate"
                icon="money"
                placeholder="Start typing..."
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-28">
          <div
            class="flex p-0-18-0-18 justify-between items-center background-color-FBFBFD rounded-8 height-50"
          >
            <div>Item</div>
            <div class="flex gap-7">
              <v-icon class="fill-primary-dark height-15" icon="delete" />
              <div class="uppercase color-primary-dark font-size-12 font-900">
                remove
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-12px gap-x-30px">
            <v-input
              class="col-span-2"
              label="Item description"
              icon="cart"
              placeholder="Start typing..."
            />
            <v-input
              class="col-span-1 <md:col-span-2"
              label="Hours"
              icon="hour"
              placeholder="Start typing..."
            />
            <v-input
              class="col-span-1 <md:col-span-2"
              label="Rate"
              icon="money"
              placeholder="Start typing..."
            />
          </div>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <v-icon class="fill-primary-dark width-18" icon="add" />
        <div class="uppercase color-primary-dark font-size-12 font-900">
          add new item
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex flex-col width-208">
        <div class="flex flex-col gap-26">
          <div class="flex flex-col gap-16">
            <div class="flex justify-between items-center">
              <div
                class="color-primary-dark font-size-14 font-700 line-height-21"
              >
                Subtotal
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                $11960
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div
                class="color-primary-dark font-size-14 font-700 line-height-21"
              >
                Tax 10%
              </div>
              <div
                class="color-primary-dark font-size-14 font-400 line-height-21"
              >
                $1196
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div
              class="color-primary-dark font-size-16 font-700 line-height-24"
            >
              Total
            </div>
            <div
              class="color-primary-dark font-size-16 font-700 line-height-24"
            >
              $13156
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({ name: 'InvoiceDescription' })
</script>
