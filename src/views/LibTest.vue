<template>
  <div class="a_content">
    <ag-grid
      class="ag-theme-alpine"
      style="width: 100%; height: 400px;"
      v-bind="currencyGrid"
      :rowData="rowData"
      @selectionChanged="selectionChanged"
    >
    </ag-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { CRYPTOCURRENY } from '@/api/cryptoCurrency'
import type { ColDef, GridOptions, SelectionChangedEvent } from 'ag-grid-community'

type GridField = {
  name: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volumne: string;
}

const useCurrencyGrid = () => {
  const currencyGrid = reactive({
    columnDefs: [
      { field: 'name', checkboxSelection: true },
      { field: 'open' },
      { field: 'high' },
      { field: 'low' },
      { field: 'close' },
      { field: 'volumne' }
    ] as Array<ColDef & { field: keyof GridField }>,
    defaultColDef: {
      sortable: true
    } as ColDef,
    multiSortKey: 'ctrl',
    gridOptions: {} as GridOptions
  })
  const rowData = ref<GridField[]>()

  return {
    currencyGrid,
    rowData
  }
}

export default defineComponent({
  name: 'View_LibTest',
  setup() {
    const { currencyGrid, rowData } = useCurrencyGrid()

    // 빗썸 api 너무 구리다..
    CRYPTOCURRENY.getMarkets().then(({ data }) => {
      const rs: GridField[] = []
      for (const [kind, currencyData] of Object.entries(data.data)) {
        if (kind !== 'date') rs.push({
          name: kind,
          open: currencyData.opening_price,
          high: currencyData.max_price,
          low: currencyData.min_price,
          close: currencyData.closing_price,
          volumne: currencyData.units_traded
        })
      }
      rowData.value = rs
    }).catch(er => {
      alert('something is wrong')
      throw new Error(er)
    })

    return {
      currencyGrid,
      rowData
    }
  },
  methods: {
    async selectionChanged(event: SelectionChangedEvent) {
      const selected = event.api.getSelectedRows() as GridField[]
      if (!selected.length) return false
      if (selected.length > 1) {
        alert('1개만 선택해 주세요')
        event.api.deselectAll()
        return false
      }

      const [ctDATA] = selected
      console.log(ctDATA)
    }
  }
})
</script>