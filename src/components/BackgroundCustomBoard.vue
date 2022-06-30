<!--
 * @Date: 2022-05-26 15:38:48
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 11:05:26
 * @FilePath: /shopify-front-plugin/src/components/BackgroundCustomBoard.vue
-->
<template>
  <BaseContainer class="custom-board" :loading="loading">
    <template #header>
      <BaseHeader icon="close" title="Background Custom" @back="handleBack" />
    </template>
    <template #main>
      <div class="custom-board__canvas">
        <div class="custom-board__canvas__content" :style="backgroundStyle">
          <div v-for="(item, index) in rects" :key="index" class="custom-board__rect" :style="rectStyle(item)">
            <label class="custom-file" :style="{backgroundImage:`url(${item.src})`}" :for="`file_input_${item.customId}`">
              <input
                :id="`file_input_${item.customId}`" class="custom-file__input" type="file" accept=".jpg,.jpeg,.png"
                @change="handleFileChange(item, $event)">
              <div v-show="item.type === 'rect'" class="custom-file__icon">
                <BaseIcon icon="camera" color="#111111" :size="30" />
              </div>
            </label>
          </div>

          <p v-for="(item, index) in texts" :key="index" class="custom-board__text" :style="textStyle(item)" @click="textVisible = true">
            {{ item.text }}
            <span class="custom-board__text-icon">
              <BaseIcon icon="edit" color="#ffffff" :size="30" />
            </span>
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="custom-board__buttons">
        <BaseTab>
          <BaseTabPane label="颜色" name="color">
            {{ props.config }}
          </BaseTabPane>
          <BaseTabPane label="排版" name="composing">
            f
          </BaseTabPane>
        </BaseTab>

        <div class="custom-board__button-right">
          <BaseButton color="green" @click="handleConfirm">Confirm</BaseButton>
        </div>
      </div>

      <div v-if="cropVisible" class="custom-board__crop">
        <BackgroundCrop
          :aspect-ratio="aspectRatio" :image-url="fileUrl" @back="handleSetCropVisible(false)"
          @confirm="handleCropConfirm" />
      </div>

      <BackgroundTextCustom v-model:visible="textVisible" @confirm="handleTextConfirm" />
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, computed, onMounted, toRaw, inject } from 'vue'
import BaseContainer from '../base/BaseContainer.vue'
import BaseHeader from '../base/BaseHeader.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseIcon from '../base/BaseIcon.vue'
import BackgroundCrop from './BackgroundCrop.vue'
import BackgroundTextCustom from './BackgroundTextCustom.vue'
import BaseTab from '../base/BaseTab.vue'
import BaseTabPane from '../base/BaseTabPane.vue'
import { steps } from '../config'
import Renderer from 'fabric-renderer'
import 'fabric-renderer/style.css'
import { getObjectUrl } from '../utils/image'
import { getRandomID } from '../utils/util'

function useCrop () {
  const cropVisible = ref(false)

  // 设置显示
  function handleSetCropVisible (val) {
    cropVisible.value = val
  }

  return {
    cropVisible,
    handleSetCropVisible
  }
}

// props
const props = defineProps({
  config: {
    type: Object,
    default: () => { }
  }
})

// emits
const emits = defineEmits({
  back: null,
  confirm: null
})

const {
  cropVisible,
  handleSetCropVisible
} = useCrop()

const containerWidth = inject('containerWidth')

// 当前定制用配置，改变该配置不影响原来的配置参数
const customConfig = ref({})
onMounted(() => {
  const newConfig = JSON.parse(JSON.stringify(toRaw(props.config)))
  newConfig.json.objects.forEach(item => {
    item.customId = getRandomID()
  })
  customConfig.value = newConfig
})

// ================================背景================================
const backgroundStyle = computed(() => {
  if (!customConfig.value.json) {
    return {}
  }
  const whRatio = (containerWidth.value * 0.8) / customConfig.value.width
  const data = {
    width: `${customConfig.value.width}px`,
    height: `${customConfig.value.height}px`,
    transform: `translate3d(-50%, -50%, 0) scale(${whRatio})`
  }

  const { background, backgroundImage } = customConfig.value.json
  if (background) {
    data.background = background
  } else if (backgroundImage) {
    data.background = `url(${backgroundImage.src}) no-repeat center center / cover`
  }

  return data
})

// ================================矩形================================
const rects = computed(() => {
  if (!customConfig.value.json) {
    return []
  }

  if (!customConfig.value.json.objects) {
    return []
  }
  return customConfig.value.json.objects.filter(item => ['image', 'rect'].includes(item.type))
})

function rectStyle (item) {
  const { width, height, scaleX, scaleY, left, top } = item
  const cWidth = width * scaleX
  const cHeight = height * scaleY

  return {
    width: `${cWidth}px`,
    height: `${cHeight}px`,
    left: `${left}px`,
    top: `${top}px`
  }
}

const fileUrl = ref('')
const aspectRatio = ref(1)
const activeRect = ref({})
function handleFileChange (item, e) {
  activeRect.value = item
  const file = e.target.files[0]
  if (file) {
    fileUrl.value = getObjectUrl(file)

    const { width, height, scaleX, scaleY } = item
    const currentWidth = width * scaleX
    const currentHeight = height * scaleY
    aspectRatio.value = currentWidth / currentHeight

    handleSetCropVisible(true)
    document.getElementById(`file_input_${item.customId}`).value = ''
  }
}

function handleCropConfirm (cropData) {
  if (activeRect.value) {
    if (activeRect.value.type === 'rect') {
      activeRect.value.type = 'image'
    }
    activeRect.value.src = cropData.url

    const { width, height, scaleX, scaleY } = activeRect.value
    const targetWidth = width * scaleX
    const targetHeight = height * scaleY

    const newScaleX = targetWidth / cropData.width
    const newScaleY = targetHeight / cropData.height
    activeRect.value.width = cropData.width
    activeRect.value.height = cropData.height
    activeRect.value.scaleX = newScaleX
    activeRect.value.scaleY = newScaleY
  }
  handleSetCropVisible(false)
}

// ================================文字================================
const texts = computed(() => {
  if (!customConfig.value.json) {
    return []
  }

  if (!customConfig.value.json.objects) {
    return []
  }
  return customConfig.value.json.objects.filter(item => item.type === 'text')
})

const textVisible = ref(false)
let textData = {}
function handleTextConfirm (data) {
  textVisible.value = false
  textData = data
  const { text, color, fontFamily } = data
  texts.value.forEach(item => {
    item.text = text
    item.fill = color
    item.fontFamily = fontFamily
    item.edited = true
  })
}

function textStyle (item) {
  const { left, top, fill, fontSize, fontFamily, originX } = item
  return {
    fontFamily,
    left: `${left}px`,
    top: `${top}px`,
    color: fill,
    fontSize: `${fontSize * 1.15}px`,
    transform: `translateX(${originX === 'center' ? '-50%' : '0'})`
  }
}

/*
定制完成
首先创建一个渲染器实列子
反序列化
生成图片
*/
const loading = ref(false)
function handleConfirm () {
  // 判断是否有没有设置的图片或者文字
  if (rects.value.some(item => item.type === 'rect')) {
    alert('please set all images!')
    return
  }

  // eslint-disable-next-line no-mixed-operators
  if (texts.value.some(item => !item.edited || item.edited && item.text === '')) {
    alert('please edit the text!')
    return
  }

  const renderer = new Renderer('canvas', {
    width: props.config.width,
    height: props.config.height,
    completeCustom: false
  })

  loading.value = true
  renderer.loadFromJSON(customConfig.value.json, undefined, () => {
    loading.value = false
    const url = renderer.toDataURL()
    const json = renderer.toJSON()

    emits('confirm', {
      url,
      json,
      textData
    })
  })
}

// 返回
function handleBack () {
  emits('back', steps.STEP_ONE)
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.custom-board {

  &__tips {
    @include absolute(10px, 0, auto, 0);
    margin-bottom: 0;
    font-size: 12px;
    color: rgba($color-grey-dark, 1);
    text-align: center;
  }

  &__rect {
    @include flex-row-center;
    position: absolute;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAAdklEQVQ4Ee2SwQ3AIAhFAbsJ+6/DnT2MtjS9mEaBW9PIxSj4+H5BEengRCkFmBls9YK8gmx+A7OOvet/4GHv7pgO7z5Cw0oErbXh4myDtVZXgsFUNQQNKTQ1Br2aAyLOxN3nqV/2YEZMAZfSnuQGRlxa13zfwxPziRy0UTchegAAAABJRU5ErkJggg==');
  }

  &__text {
    position: absolute;
    cursor: pointer;
  }

  &__text-icon {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(100%, -50%, 0);
    cursor: pointer;
  }

  &__canvas {
    width: 100%;
    height: 100%;
    position: relative;

    &__content {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  &__buttons {
    @include flex-row-sb;
    padding: 15px;
    border-top: 1px solid rgba($color-grey-dark, .2);
    position: relative;
  }

  &__button-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__crop {
    @include absolute;
  }

  &__input {
    display: none;
  }
}

.custom-file {
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &__input {
    opacity: 0;
  }

  &__icon {
    @include pos-center;
    top: 54%;
  }
}
</style>
