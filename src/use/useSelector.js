/*
 * @Date: 2022-06-28 16:06:36
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 16:06:57
 * @FilePath: /shopify-front-plugin/src/use/useSelector.js
 */
import { ref } from 'vue'
export const useSelector = () => {
  const color = ref('color-1')
  const composingId = ref('23y387xsufds00')

  const handleChangeColor = (item) => {
    color.value = item.color
  }

  const handleChangeComposing = (item) => {
    composingId.value = item.id
  }

  return {
    color,
    composingId,
    handleChangeColor,
    handleChangeComposing
  }
}
