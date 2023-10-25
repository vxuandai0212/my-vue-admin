<template>
  <div class="h-full">
    <n-card title="Print" :bordered="false" class="rounded-8px shadow-sm">
      <n-button type="primary" class="mr-10px" @click="printTable"
        >Print form</n-button
      >
      <n-button type="primary" @click="printImage">Print pictures</n-button>
      <template #footer>
        <github-link
          label="printJS："
          link="https://github.com/crabbly/Print.js"
          class="mt-10px"
        />
      </template>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import printJS from 'print-js'

function printTable() {
  printJS({
    printable: [
      {
        name: 'soybean',
        wechat: 'honghuangdc',
        remark: 'Welcome to technical exchange',
      },
      {
        name: 'soybean',
        wechat: 'honghuangdc',
        remark: 'Welcome to technical exchange',
      },
    ],
    properties: ['name', 'wechat', 'remark'],
    type: 'json',
  })
}
function printImage() {
  printJS({
    printable: [
      'https://i.loli.net/2021/11/24/1J6REWXiHomU2kM.jpg',
      'https://i.loli.net/2021/11/24/1J6REWXiHomU2kM.jpg',
    ],
    type: 'image',
    header: 'Multiple Images',
    imageStyle: 'width:100%;',
  })
}
</script>

<style scoped></style>
