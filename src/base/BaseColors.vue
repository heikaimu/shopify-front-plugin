<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-09-28 10:13:47
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:12
-->
<template>
  <ul class="color">
    <li v-for="(item, index) in list" :key="index" class="color__item">
      <p
        class="color__text" :class="{ 'color__text--active': item.value === curValue }"
        :style="{ backgroundColor: item.value }" @click="handleClick(item.value)" />
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emits = defineEmits({
  'update:value': null
})

const list = ref([
  { label: 'White', value: '#ffffff' },
  { label: 'Black', value: '#111111' },
  { label: 'Pink', value: '#D92FBB' },
  { label: 'Green', value: '#0DE9B3' },
  { label: 'Blue', value: '#209AE1' },
  { label: 'Red', value: '#E42F33' },
  { label: 'Yellow', value: '#F2E406' }
])

const curValue = ref('')

watch(
  () => props.value,
  (val) => {
    curValue.value = val
  },
  { immediate: true }
)

function handleClick (val) {
  curValue.value = val
  emits('update:value', val)
}
</script>

<style lang="scss" scoped>
.color {
  display: flex;
  flex-wrap: wrap;
  margin-left: -4px;
  margin-right: -4px;

  &__item {
    flex: 1;
    box-sizing: border-box;
    padding: 4px;
  }

  &__text {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    font-size: 14px;
    text-align: center;
    cursor: pointer;

    &--active {
      color: #ff533a;
      outline: 2px solid #ff533a;
    }
  }
}
</style>
