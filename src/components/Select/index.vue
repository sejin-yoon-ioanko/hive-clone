<template>
  <div class="com_select">
    <slot name="activator" :toggle="toggle"></slot>
    <div
      class="com_select__items"
      v-if="display"
      @mousedown.stop
    >
      <input
        type="text"
        @keyup="e => query = e.target.value"
        v-mounted-focus
        v-if="search"
        @keydown.up="focusUp"
        @keydown.down="focusDown"
        @keydown.enter="selectItem"
      />
      <template v-if="resultItems.length">
        <button
          v-for="(item, index) in resultItems"
          :key="`c-select-${index}`"
          role="option"
          :class="{ 'sc_focus': currentIndex === index }"
          v-click-sync="() => updateValue(item)"
        >{{ item.text }}</button>
      </template>
      <slot name="empty" v-else><p>결과물이 없습니다.</p></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useInitialSearch } from './initialSearch'
import type { PropType, Ref } from 'vue'

const useModal = (query: Ref<string>) => {
  const display = ref(false)

  function toggle(e: Event) {
    e.stopPropagation()
    display.value = !display.value
    if (!display.value) return false
    // const parentDom = e.target as HTMLElement
    // const { x: parentX, y: parentY } = parentDom.getBoundingClientRect()
    // const { offsetTop: menuY, offsetLeft: menuX, offsetHeight: menuHeight } = menuDomRef.value
  }

  const close = () => display.value = false
  const closeByKey = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'escape') close()
  }

  watch(display, nowDisplay => {
    if (nowDisplay) {
      document.addEventListener('keydown', closeByKey)
      document.body.addEventListener('mousedown', close, {
        once: true
      })
    } else {
      query.value = ''
      document.removeEventListener('keydown', closeByKey)
    }
  })

  return {
    display,
    toggle
  }
}

const useFocus = (resultItems: Ref<ComsSelectValue[]>, display: Ref<boolean>, selectFunction: (p: ComsSelectValue) => void) => {
  const currentIndex = ref(0)

  watch(display, () => {
    if (!display.value) currentIndex.value = 0
  })
  watch(resultItems, () => {
    currentIndex.value = 0
  })

  return {
    currentIndex,
    focusUp() {
      const willIndex = currentIndex.value - 1
      if (willIndex > -1) currentIndex.value = willIndex
    },
    focusDown() {
      const willIndex = currentIndex.value + 1
      if (willIndex < resultItems.value.length) currentIndex.value = willIndex
    },
    selectItem() {
      const nowItem = resultItems.value[currentIndex.value]
      if (resultItems.value.length && nowItem) selectFunction(nowItem)
    }
  }
}

export default defineComponent({
  name: 'com_floating-modal',
  props: {
    items: {
      type: Array as PropType<Array<ComsSelectValue>>,
      required: true
    },
    value: {
      type: Object as PropType<ComsSelectValue>,
      required: true
    },
    search: {
      type: Boolean,
      default: false
    },
    initialSearch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const query = ref('')
    const { display, toggle } = useModal(query)
    const { resultItems } = useInitialSearch({ props, query, display, isInitialSearch: props.initialSearch })

    function updateValue(selectedItem: ComsSelectValue) {
      emit('update:value', selectedItem)
      display.value = false
    }

    const { currentIndex, focusUp, focusDown, selectItem } = useFocus(resultItems, display, updateValue)

    return {
      display,
      toggle,
      query,
      resultItems,
      updateValue,
      currentIndex, focusUp, focusDown, selectItem
    }
  }
})
</script>

<style lang="scss">
// 여긴 휘발성으로 만든 컴포넌트이므로 css 대충적용했습니다.
.com_select {
  position: relative;
  &__items {
    background: $bg-base;
    contain: layout;
    position: absolute;
    z-index: 10;
    & > button {
      display: block;
      &.sc_focus {
        background: red;
      }
    }
    & > input {
      border: 1px solid black;
    }
  }
}
</style>