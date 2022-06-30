<!--
 * @Date: 2022-05-26 15:40:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 14:12:39
 * @FilePath: /shopify-front-plugin/src/base/BaseContainer.vue
-->
<template>
  <div class="base-container">
    <div class="base-container__header">
      <slot name="header" />
    </div>
    <div class="base-container__main">
      <slot name="main" />
    </div>
    <div class="base-container__footer">
      <slot name="footer" />
    </div>
    <BaseLoading v-if="loading" />
  </div>
</template>

<script setup>
import BaseLoading from './BaseLoading.vue'
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.base-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 400px;
  height: 600px;
  border-radius: $radius-lg;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  &__header {
    flex: none;
  }

  &__main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    background-color: $color-grey-light-1;
  }

  &__footer {
    flex: none;
  }

}

@media screen and (max-width: 749px) {
  .base-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
</style>
