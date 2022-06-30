<!--
 * @Date: 2022-05-26 15:39:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 10:23:24
 * @FilePath: /shopify-front-plugin/src/components/BackgroundListCard.vue
-->
<template>
  <div class="background-card" :style="cardStyle">
    <img class="background-card__img" :src="url" alt="">
    <span class="background-card__menu">type & edit</span>
    <p v-if="loading" class="background-card__loading">Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Renderer from 'fabric-renderer'
import { stage } from '../config'

const props = defineProps({
  data: {
    type: Object,
    default: () => { }
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  }
})

const url = ref('')
const loading = ref(false)
let renderer = null

const cardStyle = computed(() => {
  return {
    height: props.height + 'px'
  }
})

function generateURL () {
  if (!renderer) {
    renderer = new Renderer('canvas', {
      width: stage.WIDTH,
      height: stage.HEIGHT,
      scale: 1,
      completeCustom: false
    })
  }

  loading.value = true
  const rects = []
  renderer.loadFromJSON(props.data.json, (instance, object) => {
    const { type, top, left, width, height } = object
    if (type === 'rect') {
      rects.push({
        top, left, width, height
      })
    }
  }, () => {
    url.value = renderer.toDataURL(1)
    loading.value = false
    renderer = null
  })
}

onMounted(() => {
  generateURL()
})

</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.background-card {
  border-radius: $radius-sm;
  background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark);
  outline: 1px solid $color-grey-light-1;
  position: relative;
  box-shadow: 0 5px 10px rgba($color-black, .5);
  transition: all .2s ease-in-out;
  cursor: pointer;

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__menu {
    @include absolute(auto, auto, 0, 50%);
    display: block;
    padding: 5px 10px;
    border-radius: $radius-full;
    background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark);
    width: max-content;
    font-size: 12px;
    color: $color-white;
    text-transform: capitalize;
    transform: translate3d(-50%, 50%, 0);
    box-shadow: 0 5px 10px rgba($color-black, .5);
    transition: all .2s ease-in-out;
  }

  &__loading {
    @include pos-center;
    font-size: 14px;
    color: $color-white;
  }

  &:hover {
    box-shadow: 0 15px 20px rgba($color-black, .3);
  }

  &:active {
    box-shadow: 0 5px 10px rgba($color-black, .5);
  }

  &:hover &__menu {
    box-shadow: 0 15px 20px rgba($color-black, .3);
  }
}
</style>
