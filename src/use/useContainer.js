/*
 * @Date: 2022-06-28 13:27:01
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 13:27:33
 * @FilePath: /shopify-front-plugin/src/use/useContainer.js
 */
import { ref } from 'vue'

export const useContainer = () => {
  // 容器宽度计算
  const containerWidth = ref(0)
  const windowWidth = document.documentElement.clientWidth || document.body.clientWidth
  if (windowWidth > 750) {
    containerWidth.value = 400
  } else {
    containerWidth.value = windowWidth
  }
  return {
    containerWidth
  }
}
