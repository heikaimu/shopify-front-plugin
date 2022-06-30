<!--
 * @Date: 2022-05-30 17:01:37
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:04:33
 * @FilePath: /shopify-front-plugin/src/components/IncrementProductMultiple.vue
-->
<template>
  <BaseGlassDialog v-model:visible="isVisible" v-bind="$attrs">
    <ul class="related-product">
      <li v-for="(item, index) in data.config" :key="index" class="related-product__item">
        <div class="product-card" @click="handleToggleCheck(item)">
          <div class="product-card__image">
            <img :src="item.url" alt="" srcset="">
          </div>
          <div class="product-card__info">
            <p class="product-card__title">{{ item.title }}</p>
            <p class="product-card__price">$ {{ item.price }}</p>
          </div>
          <div class="product-card__check">
            <base-icon icon="check" :size="24" :color="getColor(item.id)" />
          </div>
        </div>
      </li>
    </ul>
    <BaseButton color="orange" size="large" fill @click="handleNext">Add Cart</BaseButton>
  </BaseGlassDialog>
</template>

<script setup>
import BaseGlassDialog from '../base/BaseGlassDialog.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseIcon from '../base/BaseIcon.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const emits = defineEmits({
  next: null,
  'update:visible': null
})

const isVisible = useVModel(props, 'visible', emits)

function handleToggleCheck (item) {
  if (props.data.value.includes(item.id)) {
    removeId(item.id)
  } else {
    addId(item.id)
  }
}

function removeId (id) {
  const index = props.data.value.findIndex(item => item.id === id)
  // eslint-disable-next-line vue/no-mutating-props
  props.data.value.splice(index, 1)
}

function addId (id) {
  // eslint-disable-next-line vue/no-mutating-props
  props.data.value.push(id)
}

function getColor (itemID) {
  return props.data.value.includes(itemID) ? '#28b485' : '#ffffff'
}

function handleNext () {
  emits('next')
}

</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

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
