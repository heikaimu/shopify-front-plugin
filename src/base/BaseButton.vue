<!--
 * @Date: 2022-05-27 13:15:05
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 10:30:42
 * @FilePath: /shopify-front-plugin/src/base/BaseButton.vue
-->
<template>
  <div
    class="base-button" :class="[
      `base-button--${color}`,
      `base-button--${size}`,
      {
        'base-button--fill': fill,
        'base-button--plain': plain
      }
    ]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'base'
  },
  fill: {
    type: Boolean
  },
  plain: {
    type: Boolean
  }
})
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.base-button {
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  transition: all .2s;
  position: relative;
  text-align: center;
  cursor: pointer;

  &:hover {
    // transform: translate3d(0, -3px, 0);
    // box-shadow: 0 10px 20px rgba($color-black, .2);

    // &::after {
    //   transform: scale3d(1.4, 1.6, 0);
    //   opacity: 0;
    // }
  }

  &:active {
    // transform: translate3d(0, -1px, 0);
    // box-shadow: 0 5px 10px r0px($color-black, .2);
  }

  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: all .4s;
  }

  &--sm {
    padding: 6px 18px;
    border-radius: 4px;
    font-size: $font-size-sm;
  }

  &--base {
    padding: 8px 25px;
    border-radius: 6px;
    font-size: $font-size-default;
  }

  &--large {
    padding: 15px 25px;
    border-radius: 10px;
    font-size: 18px;
  }

  &--white {
    background-color: $color-white;
    color: $color-grey-dark;

    &::after {
      background-color: $color-white;
    }
  }

  &--green {
    background-color: $color-primary;
    color: $color-white;

    &::after {
      background-color: $color-primary;
    }
  }

  &--orange {
    background-color: $color-secondary-dark;
    color: $color-white;

    &::after {
      background-color: $color-secondary-dark;
    }
  }

    &--grey {
    background-color: $color-grey-light-2;
    color: rgba($color-black, .6);

    &::after {
      background-color: $color-grey-light-2;
    }
  }

  &--fill {
    width: 100%;
  }

  &--animation {
    animation: moveInBottom .5s ease-out .75s;
    /* 知识点3，backwards可以在动画延迟的时候保持开始动画第一帧的状态 */
    animation-fill-mode: backwards;
  }
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
