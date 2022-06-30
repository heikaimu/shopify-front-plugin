<!--
 * @Date: 2022-05-26 15:38:48
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:54
 * @FilePath: /shopify-front-plugin/src/components/BackgroundCrop.vue
-->
<template>
  <BaseContainer>
    <template #header>
      <BaseHeader title="Image Crop" icon="arrowLeft" @back="handleBack" />
    </template>
    <template #main>
      <!-- <p class="crop__tips">Drag with two fingers or scroll with the mouse roller to zoom in and out.</p> -->
      <div class="crop__content">
        <img id="cropImage" class="crop__image" :src="imageUrl" alt="">
      </div>
    </template>
    <template #footer>
      <div class="crop__buttons">
        <BaseButton fill color="orange" @click="handleConfirm">Confirm</BaseButton>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { onMounted } from 'vue'
import BaseContainer from '../base/BaseContainer.vue'
import BaseHeader from '../base/BaseHeader.vue'
import BaseButton from '../base/BaseButton.vue'
import Cropper from 'cropperjs'
import '../sass/cropper.css'

// props
const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  },
  // 裁剪比例
  aspectRatio: {
    type: Number,
    default: 1
  }
})

// emits
const emits = defineEmits({
  back: null,
  confirm: null
})

// 裁剪对象
let cropper = null

// 初始化
function initialize () {
  cropper = new Cropper(document.getElementById('cropImage'), {
    viewMode: 1, // 定义裁剪器的视图模式。如果将viewMode设置为0，则裁剪框可以延伸到画布外部，而值为1、2或3将限制裁剪框的大小为画布的大小。viewMode为2或3会将画布限制为容器。请注意，如果画布和容器的比例相同，则2和3之间没有差别。
    dragMode: 'move', // 定义的拖动模式裁剪器.canvas和容器一样，2和3没有区别。move:移动画布 crop:创建新的裁剪框（默认） none:什么也不做
    aspectRatio: props.aspectRatio, // 定义裁剪框的固定纵横比。默认情况下，裁剪框为自由比率。
    autoCropArea: 0.7, // 定义0到1之间的fA编号。定义自动裁剪区域大小（百分比）。默认0.8
    cropBoxMovable: true, // 允许通过拖动移动裁剪框。默认true
    cropBoxResizable: true, // 以通过拖动来调整裁剪框的大小 默认true
    background: true, // 显示容器的网格背景
    movable: true // 移动图像
  })
}

onMounted(() => {
  initialize()
})

function handleConfirm () {
  if (!cropper) { return }

  const dataUrl = cropper.getCroppedCanvas().toDataURL('image/jpeg')
  const image = new Image()
  image.onload = () => {
    emits('confirm', {
      url: dataUrl,
      width: image.width,
      height: image.height
    })
  }
  image.src = dataUrl
}

function handleBack () {
  emits('back')
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.crop__content {
  height: 100%;
  background-color: $color-white;
}

.crop__image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  display: none;
}

.crop__buttons {
  @include flex-row-sb;
  padding: 10px 15px;
  border-top: 1px solid rgba($color-grey-dark, .2);
}

.crop__tips {
    padding: 10px 5px;
    margin-bottom: 0;
    font-size: 12px;
    color: rgba($color-grey-dark, 1);
    text-align: center;
}
</style>
