<!--
 * @Date: 2022-05-26 15:38:48
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:01:37
 * @FilePath: /shopify-front-plugin/src/components/BackgroundList.vue
-->
<template>
  <BaseContainer>
    <template #header>
      <BaseHeader title="Background Choose" @back="handleBack" />
    </template>
    <template #main>
      <div class="list-wrapper">
        <VirtualScroll
          ref="vScroll" :list="list" :grid="2" :wrapper-style="wrapperStyle" :col-space="10"
          :row-space="40"
          :height="cardHeight">
          <template #default="{ item }">
            <div :style="{ height: cardHeight + 'px' }">
              <BackgroundListCard :data="item" :width="cardWidth" :height="cardHeight" @click="handleStepCustom(item)" />
            </div>
          </template>
        </VirtualScroll>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { computed, inject } from 'vue'
import BaseContainer from '../base/BaseContainer.vue'
import BaseHeader from '../base/BaseHeader.vue'
import BackgroundListCard from './BackgroundListCard.vue'
import { VirtualScroll } from 'vue3-virtual-scroll'
import 'vue3-virtual-scroll/style.css'
import { stage } from '../config'

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits({
  stepCustom: null,
  back: null
})

// 卡片高宽
const containerWidth = inject('containerWidth')
const cardWidth = computed(() => {
  return ((containerWidth.value - 20) / 2) - 10
})
const cardHeight = computed(() => {
  return cardWidth.value * stage.HEIGHT / stage.WIDTH
})
const wrapperStyle = computed(() => {
  return {
    padding: '10px'
  }
})

// 定制开始
function handleStepCustom (item) {
  emits('stepCustom', item)
}

// 返回
function handleBack () {
  emits('back')
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";
.list-wrapper {
  height: 100%;
  padding-top: 10px;
}
</style>
