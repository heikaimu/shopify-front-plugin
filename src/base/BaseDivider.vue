<!--
 * @Date: 2022-06-08 10:50:38
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:19
 * @FilePath: /shopify-front-plugin/src/base/BaseDivider.vue
-->
<template>
  <div class="base-divider">
    <div class="base-divider__text">
      <slot />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.base-divider {
  display: block;
  height: 1px;
  width: 90%;
  margin: 24px auto;
  background-color: #dcdfe6;
  position: relative;

  &__text {
    position: absolute;
    background-color: #fff;
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
    font-size: 14px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
