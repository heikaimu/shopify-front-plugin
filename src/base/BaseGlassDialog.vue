<!--
 * @Date: 2022-05-30 10:52:50
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:00:27
 * @FilePath: /shopify-front-plugin/src/base/BaseGlassDialog.vue
-->
<template>
  <div v-if="visible" class="glass-dialog">
    <div class="glass-dialog__content">
      <div class="glass-dialog__icon">
        <BaseIcon class="glass-dialog__icon--close" icon="close" color="#333333" @click="handleClose" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import BaseIcon from './BaseIcon.vue'

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits({
  'update:visible': null,
  close: null
})

function handleClose () {
  emits('update:visible', false)
  emits('close')
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.glass-dialog {
  @include absolute;
  @include glass;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &__icon {
    padding-bottom: 10px;

    &--close {
      cursor: pointer;
    }
  }

  &__content {
    padding: 20px;
    background-color: $color-white;
  }
}
</style>
