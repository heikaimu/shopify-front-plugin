/*
 * @Date: 2022-06-28 13:40:45
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-30 16:49:30
 * @FilePath: /shopify-front-plugin/src/use/useRenderDiv.js
 */
import { ref, watchEffect } from 'vue'
import { getRandomID } from '../utils/util'
import { useContainer } from './useContainer'
import Renderer from 'fabric-renderer'

export const useRenderDiv = (config, color, composingId) => {
  const { containerWidth } = useContainer()

  const rects = ref([])
  const texts = ref([])
  const backgroundStyle = ref({})
  const loading = ref(false)
  const curPos = ref({})
  const bgURL = ref('')

  // rect
  const generateRects = (renderParams) => {
    if (renderParams.objects) {
      rects.value = renderParams.objects.filter(item => ['image', 'rect'].includes(item.type))
    }
  }

  const generateTexts = (renderParams) => {
    if (renderParams.objects) {
      texts.value = renderParams.objects.filter(item => ['text'].includes(item.type))
    }
  }

  const generateBackground = ({ images, size, color }) => {
    const whRatio = (containerWidth.value * 0.8) / size.width
    const bg = images.find(item => item.color === color.value) || images[0]
    bgURL.value = bg ? bg.url : ''
    const data = {
      width: `${size.width}px`,
      height: `${size.height}px`,
      transform: `translate3d(-50%, -50%, 0) scale(${whRatio})`,
      background: `url(${bgURL.value}) no-repeat center center / cover`
    }

    backgroundStyle.value = data
  }

  watchEffect(() => {
    let renderParams
    curPos.value = config.composing.find(item => item.id === composingId.value)
    if (curPos.value && curPos.value.json) {
      renderParams = curPos.value.json
    } else {
      renderParams = {}
    }

    if (renderParams) {
      renderParams.objects.forEach(item => {
        item.customId = getRandomID()
      })
      generateRects(renderParams)
      generateTexts(renderParams)
      generateBackground({
        color,
        images: config.images,
        size: config.size
      })
    }
  })

  // rect style
  const rectStyle = (item) => {
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

  // text style
  const textStyle = (item) => {
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

  const toDataURL = () => {
    const { json, width, height } = curPos.value
    const renderer = new Renderer('canvas', {
      width,
      height,
      completeCustom: false
    })

    return new Promise((resolve) => {
      renderer.loadFromJSON(json, undefined, () => {
        // 由于无背景，所以需要手动添加一张
        renderer.addBackground(bgURL.value).then(() => {
          const url = renderer.toDataURL()
          resolve(url)
        })
      })
    })
  }

  return {
    loading,
    rects,
    texts,
    backgroundStyle,
    rectStyle,
    textStyle,
    toDataURL
  }
}
