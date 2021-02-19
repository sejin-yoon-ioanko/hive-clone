<template>
  <slot name="activator" :on="on"></slot>
  <transition>
    <div class="com_modal-wrap">
      <slot v-if="childDisplay"></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'com_floating-modal',
  props: {
    display: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const childDisplay = ref(props.display)
    watch(() => props.display, display => {
      childDisplay.value = display
    })

    console.log(slots)

    return {
      childDisplay,
      on() {
        console.log('asdas')
      }
    }
  }
})
</script>