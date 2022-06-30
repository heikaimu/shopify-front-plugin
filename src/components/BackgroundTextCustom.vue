<!--
 * @Date: 2022-05-30 13:49:33
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-27 16:01:45
 * @FilePath: /shopify-front-plugin/src/components/BackgroundTextCustom.vue
-->
<template>
  <BaseGlassDialog v-model:visible="textVisible">
    <div class="text-custom">
      <div class="text-custom__item">
        <input v-model="textForm.text" class="text-custom__input" type="text" placeholder="type your text">
      </div>
      <div class="text-custom__item">
        <BaseFonts v-model:value="textForm.fontFamily" />
      </div>
      <div class="text-custom__item">
        <BaseColors v-model:value="textForm.color" />
      </div>
      <div class="text-custom__item">
        <BaseButton fill color="orange" @click="handleConfirm">Confirm</BaseButton>
      </div>
    </div>
  </BaseGlassDialog>
</template>

<script setup>
import { ref } from 'vue'
import BaseGlassDialog from '../base/BaseGlassDialog.vue'
import BaseButton from '../base/BaseButton.vue'
import BaseFonts from '../base/BaseFonts.vue'
import BaseColors from '../base/BaseColors.vue'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },

  form: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits({
  confirm: null,
  'update:visible': null
})

const textVisible = useVModel(props, 'visible', emits)

const textForm = ref({
  color: '#ffffff',
  fontFamily: 'Satisfy',
  text: ''
})

function handleConfirm () {
  emits('confirm', textForm.value)
}
</script>

<style lang="scss" scoped>
@import "../sass/variables";
@import "../sass/mixins";

.text-custom {
  &__item {
    margin-top: 20px;
  }

  &__input {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid $color-grey-light-2;
  }
}
</style>
