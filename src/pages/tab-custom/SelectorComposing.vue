<!--
 * @Date: 2022-06-28 14:58:17
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-30 15:57:47
 * @FilePath: /shopify-front-plugin/src/pages/tab-custom/SelectorComposing.vue
-->
<template>
  <div class="selector-composing">
    <span
      v-for="item in options" :key="item.id" class="selector-composing__item"
      :style="{ backgroundImage: `url(${item.url})` }"
      :class="{ 'selector-composing__item--active': item.id === value }" @click="handleChange(item)" />
  </div>
</template>

<script setup>
import Renderer from 'fabric-renderer'
import 'fabric-renderer/style.css'
import { onMounted } from 'vue'

const props = defineProps({
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

onMounted(() => {
  props.options.forEach(getURL)
})

// 生成图片
const getURL = (item) => {
  const { json, width, height } = item
  const renderer = new Renderer('canvas', {
    width,
    height,
    completeCustom: false
  })

  renderer.loadFromJSON(json, undefined, () => {
    const url = renderer.toDataURL()
    item.url = url
  })
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/mixins";

.selector-composing {
  padding: 5px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    width: 78px;
    height: 78px;
    border: 3px solid $color-grey-light-2;
    border-radius: 4px;
    margin: 5px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    cursor: pointer;

    &--active {
      border: 3px solid $color-primary;
    }
  }
}
</style>
