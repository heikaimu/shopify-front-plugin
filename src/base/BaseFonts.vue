<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-09-28 10:13:47
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:23
-->
<template>
  <ul class="font">
    <li v-for="(item, index) in list" :key="index" class="font__item">
      <p
        class="font__text" :class="{ 'font__text--active': item.value === curValue }"
        :style="{ fontFamily: item.value }" @click="handleClick(item.value)">
        Font
      </p>
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
  {
    value: 'Ceviche One',
    label: 'Ceviche One'
  },
  {
    value: 'Lobster',
    label: 'Lobster'
  },
  {
    value: 'Satisfy',
    label: 'Satisfy'
  },
  {
    value: 'Kaushan Script',
    label: 'Kaushan Script'
  },
  {
    value: 'Dancing Script',
    label: 'Dancing Script'
  }
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
.font {
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
    padding: 5px 0;
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
