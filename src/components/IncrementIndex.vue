<!--
 * @Date: 2022-05-31 10:28:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:01:51
 * @FilePath: /shopify-front-plugin/src/components/Increment.vue
-->
<template>
  <BaseContainer>
    <template #main>
      <div class="increment-wrapper" :style="{ backgroundImage: `url(${bg})` }">
        <IncrementVip v-model:visible="vipVisible" :data="vipData" @close="handleVipClose" @next="handleVipConfirm" />
        <IncrementProduct
          v-model:visible="productVisible" :data="productData" @close="handleProductClose"
          @next="handleProductConfirm" />
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import BaseContainer from '../base/BaseContainer.vue'
import IncrementVip from './IncrementVip.vue'
import IncrementProduct from './IncrementProduct.vue'
import { steps } from '../config'

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  bg: {
    type: String,
    default: ''
  }
})

const emits = defineEmits({
  back: null,
  confirm: null
})

// 关联产品
const productVisible = ref(true)
const productData = ref({
  config: toRaw(props.data.relatedProducts),
  value: []
})

function handleProductClose () {
  emits('back', steps.STEP_TWO)
}

function handleProductConfirm () {
  // productVisible.value = false;
  // vipVisible.value = true;
  handleFinished()
}

// VIP
const vipVisible = ref(false)
const vipData = ref({
  config: toRaw(props.data.vip),
  value: false
})

function handleVipClose () {
  productVisible.value = true
  vipVisible.value = false
}

function handleVipConfirm () {
  handleFinished()
}

function handleFinished () {
  emits('confirm', {
    productData: toRaw(productData.value)
    // vipData: toRaw(vipData.value),
  })
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.increment-wrapper {
  @include absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}
</style>
