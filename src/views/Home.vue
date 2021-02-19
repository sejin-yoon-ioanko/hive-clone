<template>
  <div class="home">
    <button>asddas</button>
    <modal>
      <template v-slot:activator="on">
        <button @click="on">asdsdaasdasd</button>
      </template>
      dasasddsa
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/Floatings/Modal.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Modal
  }
})
</script>
