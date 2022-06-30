<!--
 * @Date: 2022-06-28 14:14:41
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-30 17:11:20
 * @FilePath: /shopify-front-plugin/src/pages/tab-custom/DivBoard.vue
-->
<template>
  <div class="div-board" :style="backgroundStyle">
    <div v-for="(item, index) in rects" :key="index" class="div-board__rect" :style="rectStyle(item)">
      <label class="custom-file" :style="{ backgroundImage: `url(${item.src})` }" :for="`file_input_${item.customId}`">
        <input
          :id="`file_input_${item.customId}`" class="custom-file__input" type="file" accept=".jpg,.jpeg,.png"
          @change="handleFileChange(item, $event)">
        <div v-show="item.type === 'rect'" class="custom-file__icon">
          <BaseIcon icon="camera" color="#111111" :size="30" />
        </div>
      </label>
    </div>

    <p
      v-for="(item, index) in texts" :key="index" class="div-board__text" :style="textStyle(item)"
      @click="handleTextCustom(item)">
      {{ item.text }}
      <span class="div-board__text-icon">
        <BaseIcon icon="edit" color="#ffffff" :size="30" />
      </span>
    </p>
  </div>
</template>

<script setup>
import BaseIcon from '../../base/BaseIcon.vue'

defineProps({
  backgroundStyle: {
    type: Object,
    default: () => {}
  },
  rects: {
    type: Array,
    default: () => []
  },
  texts: {
    type: Array,
    default: () => []
  },
  rectStyle: {
    type: Function,
    default: function () {}
  },
  textStyle: {
    type: Function,
    default: function () {}
  }
})

const emits = defineEmits({
  changeFile: null,
  textCustom: null
})

const handleFileChange = (item, e) => {
  emits('changeFile', item, e)
}

const handleTextCustom = (item) => {
  emits('textCustom', item)
}
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/mixins";

.div-board {
  position: absolute;
  left: 50%;
  top: 50%;

  &__rect {
    @include flex-row-center;
    position: absolute;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAAdklEQVQ4Ee2SwQ3AIAhFAbsJ+6/DnT2MtjS9mEaBW9PIxSj4+H5BEengRCkFmBls9YK8gmx+A7OOvet/4GHv7pgO7z5Cw0oErbXh4myDtVZXgsFUNQQNKTQ1Br2aAyLOxN3nqV/2YEZMAZfSnuQGRlxa13zfwxPziRy0UTchegAAAABJRU5ErkJggg==');
  }

  &__text {
    position: absolute;
    cursor: pointer;
  }

  &__text-icon {
    width: 34px;
    height: 34px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate3d(100%, -50%, 0);
    cursor: pointer;
  }
}

.custom-file {
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &__input {
    opacity: 0;
  }

  &__icon {
    @include pos-center;
    top: 54%;
  }
}
</style>
