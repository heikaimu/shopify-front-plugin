<!--
 * @Date: 2022-06-06 15:18:43
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:49
 * @FilePath: /shopify-front-plugin/src/base/BaseLoading.vue
-->
<template>
  <div class="base-loading">
    <div class="wavecontainer">
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
      <div class="wave" />
    </div>
    <p class="base-loading__text">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Loading'
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.base-loading {
  @include absolute;
  @include flex-row-center;
  flex-direction: column;
  background-color: rgba($color-black, 0.7);

  &__text {
    padding-top: 5px;
    font-size: 14px;
    color: $color-white;
  }
}

.wavecontainer {
  .wave {
    margin-top: 15px;
    float: left;
    width: 18px;
    height: 40px;
    box-sizing: border-box;
    border: 2px solid $color-white;
    margin-left: -2px;
    animation: slide 0.6s infinite linear;

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &:nth-child(2n+1) {
      animation-delay: 0.3s;
    }
  }
}

@keyframes slide {
  50% {
    margin-top: 25px;
  }
}
</style>
