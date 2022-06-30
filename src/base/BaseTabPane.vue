<!--
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-09-29 17:15:39
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-28 10:45:00
-->
<template>
  <div class="base-tab-pane">
    <div class="base-tab-pane__title" @click="handleClick">
      {{ label }}
      <div class="state-icon" :class="{ active: active }">
        <base-icon icon="arrowLeft" :size="12" />
      </div>
    </div>
    <div v-if="active" class="base-tab-pane__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

import BaseIcon from './BaseIcon.vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

const rootTabs = inject('rootTabs')

const index = ref(null)

const active = computed(() => {
  const active = rootTabs.currentName.value === (props.name || index.value)
  return active
})

const changeTabName = inject('changeTabName')

function handleClick () {
  if (active.value) {
    changeTabName('')
  } else {
    changeTabName(props.name || index.value)
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.base-tab-pane {
  margin-left: 20px;
}
.state-icon {
  @include flex-row-center;
  transform: rotate(-90deg);
  margin-left: 5px;
  position: relative;
  &.active {
    transform: rotate(90deg);
  }
  &::after {
    @include absolute;
    content: "";
    display: block;
  }
}
.base-tab-pane__title {
  @include flex-row-center;
  height: 34px;
  font-size: $font-size-sm;
  font-weight: 600;
  color: rgba($color: $color-black, $alpha: .8);
  cursor: pointer;
}
.base-tab-pane__content {
  @include absolute(auto, 0, 40px, 0);
  border-radius: 8px;
  background-color: $color-white;
  box-shadow: 0 0 12px hsl(0, 0%, 0%, 0.1);
  padding: 6px 12px;
}
</style>
