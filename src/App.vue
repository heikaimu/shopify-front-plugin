<!--
 * @Date: 2022-05-26 15:21:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 11:19:37
 * @FilePath: /shopify-front-plugin/src/App.vue
-->
<template>
  <PicturePuzzle v-if="visible" :config="config" :options="form" @close="visible = false" @complete="handleComplete" />
  <button @click="visible = true">定制</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PicturePuzzle from './pages/PicturePuzzle.vue'

const config = ref({})

const tag = 'puzzle-1'
const optionSize = '30x40'
const form = ref({
  color: 'color-1'
})

onMounted(async () => {
  fetch('/config.json').then(res => res.json()).then(res => {
    const curSize = res.size.find(item => item.name === optionSize)
    const curBackground = res.background.find(item => item.tag === tag)
    const background = curBackground ? curBackground.list.find(item => item.size === curSize.id) : undefined
    background.size = curSize
    background.composing = background.composing.map(id => {
      return res.composing.find(item => item.id === id)
    })
    config.value = background
  })
})

const visible = ref(false)

function handleComplete (data) {
  console.log(data)
}
</script>

<style>
</style>
