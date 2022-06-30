<!--
 * @Date: 2022-05-26 15:58:56
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 10:47:24
 * @FilePath: /shopify-front-plugin/src/base/BaseHeader.vue
-->
<template>
  <div class="base-header">
    <span class="base-header__icon" @click="emits('back')">
      <BaseIcon :icon="icon" color="#333333" />
    </span>
    <h2 class="base-header__heading">
      {{ title }}
    </h2>
    <div class="base-header__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup>
import BaseIcon from '../base/BaseIcon.vue'

defineProps({
  title: {
    type: String
  },
  icon: {
    type: String,
    default: 'close'
  }
})

const emits = defineEmits({
  back: null
})
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.base-header {
  height: 50px;
  position: relative;
  background-color: $color-white;
  border-bottom: 1px solid $color-grey-light-1;
  box-shadow: 0 0 5px $color-grey-light-2;

  &__heading {
    @include pos-center;
    width: max-content;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 0;
    color: rgba($color: $color-black, $alpha: .8);
  }

  &__icon {
    @include absolute(50%, auto, auto, 0);
    @include flex-row-center;
    transform: translate3d(0, -50%, 0);
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  &__buttons {
    @include absolute(50%, 10px, auto, auto);
    @include flex-row-center;
    transform: translate3d(0, -50%, 0);
  }
}
</style>
