<template>
  <div class="home">
    <button>asddas</button>
    <c-select :items="items" v-model:value="selectValue" search initial-search>
      <template #activator="{ toggle }">
        <button v-click-sync="toggle" id="tx">button</button>
      </template>
    </c-select>

    <ag-grid
      class="ag-theme-alpine"
      style="height: 300px;"
      :columnDefs="columnDefs"
      :rowData="rowData">
    </ag-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CSelect from '@/components/Select/index.vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const selectValue = ref({value: 0, text: ''})
    const items = ref([
  {
    value: 0,
    text: '세진'
  },
  {
    value: 1,
    text: '진세'
  },
  {
    value: 2,
    text: '윤세진'
  },
  {
    value: 3,
    text: '윤 세 진'
  },
  {
    value: 4,
    text: '윤 세진'
  },
  {
    value: 5,
    text: '윤세 진'
  }
])

    return {
      items,
      selectValue,
      columnDefs: [
        { field: 'make', filter: true, headerCheckboxSelection: true, checkboxSelection: true },
        { field: 'model', sortable: true },
        { field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    }
  },
  components: {
    CSelect
  }
})
</script>
