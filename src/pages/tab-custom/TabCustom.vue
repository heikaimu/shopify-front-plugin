<!--
 * @Date: 2022-06-28 11:15:58
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-30 16:25:10
 * @FilePath: /shopify-front-plugin/src/pages/tab-custom/TabCustom.vue
-->
<template>
  <BaseContainer :loading="loading">
    <template #header>
      <BaseHeader icon="close" title="Background Custom" @back="handleClose" />
    </template>
    <template #main>
      <DivBoard
        :background-style="backgroundStyle" :rects="rects" :rect-style="rectStyle" :texts="texts"
        :text-style="textStyle" @changeFile="handleFileChange" @customText="handleCustomText" />
    </template>
    <template #footer>
      <div class="custom-footer">
        <BaseTab>
          <BaseTabPane label="颜色" name="color">
            <SelectorColor :options="config.images" :value="color" @change="handleChangeColor" />
          </BaseTabPane>
          <BaseTabPane label="排版" name="composing">
            <SelectorComposing :options="config.composing" :value="composingId" @change="handleChangeComposing" />
          </BaseTabPane>
        </BaseTab>

        <div class="custom-footer__confirm">
          <BaseButton color="green" size="sm" @click="handleConfirm">Confirm</BaseButton>
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref } from 'vue'
import BaseContainer from '../../base/BaseContainer.vue'
import BaseHeader from '../../base/BaseHeader.vue'
import BaseTab from '../../base/BaseTab.vue'
import BaseTabPane from '../../base/BaseTabPane.vue'
import BaseButton from '../../base/BaseButton.vue'
import DivBoard from './DivBoard.vue'
import SelectorColor from './SelectorColor.vue'
import SelectorComposing from './SelectorComposing.vue'
import { useRenderDiv } from '../../use/useRenderDiv'
import { useSelector } from '../../use/useSelector'
import { getObjectUrl } from '../../utils/image'

const props = defineProps({
  config: {
    type: Object,
    default: () => { }
  },
  options: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits({
  close: null,
  openCrop: null
})

const {
  color,
  composingId,
  handleChangeColor,
  handleChangeComposing
} = useSelector()

const {
  loading,
  rects,
  texts,
  backgroundStyle,
  rectStyle,
  textStyle,
  toDataURL
} = useRenderDiv(props.config, color, composingId)

// 记录一个当前操作的图层
const activeRect = ref({})
// 文件选择完成后，保留原文件的路径地址，计算出宽高比例，清空表单，最后触发裁剪框
const handleFileChange = (item, e) => {
  activeRect.value = item
  const file = e.target.files[0]
  document.getElementById(`file_input_${item.customId}`).value = ''
  if (file) {
    const { width, height, scaleX, scaleY } = item
    const currentWidth = width * scaleX
    const currentHeight = height * scaleY
    const aspectRatio = currentWidth / currentHeight
    item.aspectRatio = aspectRatio

    const rawURL = getObjectUrl(file)
    item.rawURL = rawURL

    emits('openCrop', {
      url: rawURL,
      aspectRatio
    })
  }
}

const cropHandler = (data) => {
  if (activeRect.value) {
    if (activeRect.value.type === 'rect') {
      activeRect.value.type = 'image'
    }
    activeRect.value.src = data.url

    const { width, height, scaleX, scaleY } = activeRect.value
    const targetWidth = width * scaleX
    const targetHeight = height * scaleY

    const newScaleX = targetWidth / data.width
    const newScaleY = targetHeight / data.height
    activeRect.value.width = data.width
    activeRect.value.height = data.height
    activeRect.value.scaleX = newScaleX
    activeRect.value.scaleY = newScaleY
  }
}

defineExpose({
  cropHandler
})

// 点击文字定制
const handleCustomText = (item) => {

}

// 渲染
const handleConfirm = () => {
  toDataURL().then(url => {
    console.log(url)
  })
}

// 返回
const handleClose = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/mixins";

.custom-footer {
  padding: 10px;
  position: relative;

  &__confirm {
    @include pos-center-right(10px)
  }
}
</style>
