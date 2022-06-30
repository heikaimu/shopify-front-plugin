<!--
 * @Date: 2022-05-26 15:21:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 11:10:49
 * @FilePath: /shopify-front-plugin/src/components/PluginMain.vue
-->
<template>
  <div class="background-custom-container">
    <!-- 定制页 -->
    <BackgroundCustomBoard
      v-if="boardVisible" :config="customCardData" @back="handleSetStep"
      @confirm="handleConfirmCustom" />
    <!-- 文件上传页 -->
    <FileUploader v-if="uploadVisible" website="M" :files="files" @complete="handleUploadComplete" />
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw, provide } from 'vue'
import BackgroundCustomBoard from './BackgroundCustomBoard.vue'
import FileUploader from './FileUploader.vue'

function useContainer () {
  // 容器宽度计算
  const containerWidth = ref(0)
  const windowWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (windowWidth > 750) {
    containerWidth.value = 400
  } else {
    containerWidth.value = windowWidth
  }
  provide('containerWidth', containerWidth)
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
  complete: null,
  close: null
})

// 容器
useContainer()

// 定制
const customInfo = ref({})
const customCardData = ref({})
const boardVisible = ref(false)

const optionColors = ref([])
const optionComposings = ref([])

onMounted(() => {
  customCardData.value = props.config.composing[0]
  boardVisible.value = true
  optionColors.value = props.config.images
  optionComposings.value = props.config.composing
  console.log(optionComposings.value)
})

function handleConfirmCustom (data) {
  customInfo.value = data
}

// 扩展
// function handleIncrementConfirm () {
//   const { url, json } = customInfo.value
//   json.objects.forEach((item, index) => {
//     if (item.type === 'image') {
//       files.value.push({
//         name: 'Photo' + index,
//         url: item.src
//       })
//     }
//   })
//   const preview = {
//     url,
//     name: 'Preview'
//   }
//   files.value.push(preview)
// }

// 文件
const uploadVisible = ref(false)
const files = ref([])
function handleUploadComplete (files) {
  const data = {
    backgroundData: toRaw(customCardData.value),
    files: toRaw(files),
    textData: toRaw(customInfo.value).textData
  }
  emits('complete', data)
  handleClose()
}

// 关闭插件
function handleClose () {
  emits('close')
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.background-custom-container {
  @include fixed(0, 0, 0, 0, 99999);
  background-color: rgba($color: #000000, $alpha: 0.6);
}
</style>
