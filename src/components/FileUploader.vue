<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-07-23 15:22:48
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:01:49
-->
<template>
  <BaseContainer>
    <template #main>
      <div class="uploader">
        <img class="uploader__gif" :src="uploadGif" alt="" srcset="">
        <div class="uploader__progress-box">
          <div class="progress">
            <span class="progress__line progress__line--green" :style="{ width: `${percent}%` }">
              <span class="progress__percent">{{ percent }}%</span>
            </span>
          </div>
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseContainer from '../base/BaseContainer.vue'
import { uploadFile } from '../api/upload'
import { dataURLtoBlob } from '../utils/image'
import { getRandomID } from '../utils/util'
import Progress from '../utils/progress'
import { UPLOAD_GIF } from '../config'

const props = defineProps({
  files: {
    type: Array,
    deafult: () => []
  },
  website: {
    type: String,
    deafult: ''
  }
})

const emits = defineEmits({
  complete: null
})

let progress = null
const percent = ref(2)
const uploadRes = ref({})
const timeNow = ref('')
const uploadGif = ref(UPLOAD_GIF)

onMounted(() => {
  if (props.files) {
    getNowTime()
    startUpload()
    stepProgress()
  }
})

// 获取当前时间
function getNowTime () {
  const time = new Date()
  const year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  timeNow.value = `${year}${month}${day}`
}

// 文件上传
function startUpload () {
  for (const item of (props.files || [])) {
    upload(item)
  }
}

function upload (item) {
  const { name, url } = item
  const suffix = name.indexOf('Ai') > -1 ? 'png' : 'jpg'
  uploadFile({
    name: `${timeNow.value}_${props.website}_${name}_${getRandomID()}.${suffix}`,
    file: url ? dataURLtoBlob(url) : null,
    onSuccess: (res) => {
      uploadRes.value[item.name] = res
      progress.next()
    },
    onError: () => {
      progress.next()
    }
  })
}

function stepProgress () {
  progress = new Progress({
    parts: props.files.length,
    speed: 500,
    onProgress: (val) => {
      percent.value = val
    },
    onComplete: () => {
      emits('complete', uploadRes.value)
    }
  })
  progress.start()
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.uploader {
  @include flex-col-center;
  @include absolute(0, 0, 0, 0, 999999);
  background-color: #ffffff;

  &__gif {
    width: 100px;
    height: 100px;
  }

  &__progress-box {
    width: 200px;
    margin-top: 10px;
  }
}

.progress {
  height: 20px;
  background: #ebebeb;
  border-radius: 10px;
  overflow: hidden;
  display: flex;

  &__line {
    position: relative;
    margin: 0 -1px;
    min-width: 0;
    height: 100%;
    transition: 0.3s;
    background-image: linear-gradient(180deg, #f0f0f0 0, #dbdbdb 70%, #ccc);
    box-shadow: inset 0 1px hsla(0, 0%, 100%, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.2);
    text-align: right;

    &::before {
      @include absolute;
      content: "";
      height: 100%;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAASUlEQVQ4je3RMQ7AIBADwTnK+/9bqVMmoUBAqCJcWZa1zQYS1Z189OE9vLMEaUHLENSYOff22AGBsgOCLDPn3n6sHWtfIf5t7QLBYTNAaHlxVQAAAABJRU5ErkJggg==") 0 0 repeat-x;
      border-radius: 10px;
      animation: animate 0.5s linear infinite;
    }

    @keyframes animate {
      0% {
        background-position: 0px;
      }

      100% {
        background-position: 12px;
      }
    }

    &--green {
      background: #F97182;
      border-color: #F97182 #F97182 #F97182;
      background-image: linear-gradient(180deg,
          #F97182 0,
          #F97182 70%,
          #F97182);
    }
  }

  &__percent {
    display: block;
    height: 20px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 700;
    color: $color-grey;
    color: rgba(0, 0, 0, 0.7);
    text-shadow: 0 1px hsla(0, 0%, 100%, 0.4);
    line-height: 20px;
  }
}
</style>
