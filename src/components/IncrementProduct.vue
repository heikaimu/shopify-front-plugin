<!--
 * @Date: 2022-05-30 17:01:37
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:02:28
 * @FilePath: /shopify-front-plugin/src/components/IncrementProduct.vue
-->
<template>
  <BaseGlassDialog v-model:visible="isVisible" v-bind="$attrs">
    <div class="single-product-wrapper">
      <div class="product-card">
        <div class="product-card__image">
          <img :src="product.url" alt="" srcset="">
        </div>
        <div class="product-card__info">
          <p class="product-card__title">{{ product.title }}</p>
          <p class="product-card__price">+ ${{ product.price }}</p>
        </div>
      </div>
    </div>

    <BaseButton color="orange" size="base" fill @click="handleNext(true)">Sure & Add To Card</BaseButton>
    <BaseDivider>or</BaseDivider>
    <BaseButton color="grey" size="base" fill @click="handleNext(false)">No Thanks & Add To Cart</BaseButton>
  </BaseGlassDialog>
</template>

<script setup>
import { computed } from 'vue'
import BaseGlassDialog from '../base/BaseGlassDialog.vue'
import BaseDivider from '../base/BaseDivider.vue'
import BaseButton from '../base/BaseButton.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits({
  next: null,
  'update:visible': null
})

const product = computed(() => {
  return props.data.config[0] || {}
})

const isVisible = useVModel(props, 'visible', emits)

// function removeId(id) {
//   const index = props.data.value.findIndex(item => item.id === id);
//   props.data.value.splice(index, 1);
// }

function addId (id) {
  // eslint-disable-next-line vue/no-mutating-props
  props.data.value.push(id)
}

// function getColor(itemID) {
//   return props.data.value.includes(itemID) ? '#28b485' : '#ffffff';
// }

function handleNext (flag) {
  if (flag) {
    addId(product.value.id)
  }
  emits('next')
}

</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.single-product-wrapper {
  width: 240px;
  margin: 0 auto 20px;
}
.related-product {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  margin-left: -10px;
  margin-right: -10px;

  &__item {
    width: 50%;
    padding: 10px;
  }
}

.product-card {
  position: relative;
  cursor: pointer;

  &__image {
    border-radius: 4px;
    overflow: hidden;

    img {
      display: block;
    }
  }

  &__info {
    padding-top: 10px;
    text-align: center;
  }

  &__price {
    font-size: 14px;
    font-weight: 600;
    color: $color-secondary-dark;
  }

  &__title {
    font-size: 12px;
    color: $color-grey-dark;
    margin-bottom: 5px;
  }

  &__check {
    @include absolute(10px, 10px, auto, auto);
  }
}
</style>
