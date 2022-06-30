<!--
 * @Date: 2022-06-28 14:57:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-29 13:39:29
 * @FilePath: /shopify-front-plugin/src/pages/tab-custom/SelectorColor.vue
-->
<template>
  <div class="selector-color">
    <span
      v-for="item in options" :key="item.color" class="selector-color__item"
      :class="{ 'selector-color__item--active': item.color === value }" :style="{ backgroundImage: `url(${item.url})` }"
      @click="handleChange(item)" />
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    default: () => []
  },
  value: {
    type: String
  }
})

const emits = defineEmits({
  change: null
})

const handleChange = (item) => {
  emits('change', item)
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/mixins";

.selector-color {
  padding: 5px 0;
  display: flex;
  flex-wrap: wrap;

  &__item {
    width: 40px;
    height: 40px;
    border: 3px solid $color-grey-light-2;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    cursor: pointer;

    &--active {
      border: 3px solid $color-primary;
    }
  }

  &__item:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
