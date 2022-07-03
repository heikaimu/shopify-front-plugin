<!--
 * @Date: 2022-06-28 11:12:51
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-30 17:13:00
 * @FilePath: /shopify-front-plugin/src/pages/PicturePuzzle.vue
-->
<template>
  <div class="picture-puzzle-container">
    <TabCustom ref="tabCustom" :config="config" :options="options" @open-crop="handleOpenCrop" @confirm="handleConfirmCustom" />
    <TabCrop v-if="cropVisible" :image-url="cropRawURL" :aspect-ratio="cropRatio" @back="handleCloseCrop" @confirm="handleConfirmCrop" />
    <TabUpload />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TabCrop from './tab-crop/TabCrop.vue'
import TabCustom from './tab-custom/TabCustom.vue'
import TabUpload from './tab-upload/TabUpload.vue'
import Renderer from 'fabric-renderer'

defineProps({
  config: {
    type: Object,
    default: () => {}
  },
  options: {
    type: Object,
    default: () => {}
  }
})

onMounted(() => {
})

// 定制
const tabCustom = ref(null)
const handleConfirmCustom = (data) => {
  const { width, height, json } = data
  const renderer = new Renderer('canvas', {
    width,
    height,
    completeCustom: false
  })

  renderer.loadFromJSON(json, undefined, () => {
    const url = renderer.toDataURL()
    console.log(url)
  })
}

// 裁剪
const cropVisible = ref(false)
const cropRawURL = ref('')
const cropRatio = ref(1)

const handleOpenCrop = (data) => {
  cropRawURL.value = data.url
  cropRatio.value = data.aspectRatio
  cropVisible.value = true
}

const handleCloseCrop = () => {
  cropVisible.value = false
}

const handleConfirmCrop = (data) => {
  cropVisible.value = false
  tabCustom.value.cropHandler(data)
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.picture-puzzle-container {
  @include fixed(0, 0, 0, 0, 99999);
  background-color: rgba($color: #000000, $alpha: 0.6);
}
</style>
