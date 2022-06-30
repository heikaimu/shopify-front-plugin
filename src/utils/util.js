/*
 * @Date: 2022-05-31 14:06:38
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:05:48
 * @FilePath: /shopify-front-plugin/src/utils/util.js
 */
/**
 * 获取一个随机ID
 * @param {number} length - 长度
 * @returns
 */
export function getRandomID (length = 8) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

/**
 * 获取对象的值
 * @param {Object} form
 * @param  {...any} selectors
 * @returns
 */
export function getValue (form, ...selectors) {
  const res = selectors.map(s => {
    return s
      .replace(/\[(\w+)\]/g, '.$1')
      .split('.')
      .reduce((prev, cur) => {
        return prev && prev[cur]
      }, form)
  })
  return res
}

/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-08-16 11:03:11
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-02-16 15:23:37
 */
export function number (val, inscriber = 2) {
  val = val.toFixed(inscriber) // 数字转换为字符
  const x = val.split('.') // 按照小数点分隔
  let x1 = x[0] // 整数部分
  const x2 = x.length > 1 ? '.' + x[1] : '' // 小数部分

  const rgx = /(\d+)(\d{3})/ // 正则式定义
  while (rgx.test(x1)) { // 正则式匹配
    x1 = x1.replace(rgx, '$1' + ',' + '$2') // 正则式替换
  }

  return x1 + x2.substr(0, inscriber + 1)
}
