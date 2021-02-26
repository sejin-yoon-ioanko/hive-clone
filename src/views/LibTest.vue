<template>
  <div class="a_content">
    <ag-grid
      class="ag-theme-alpine"
      style="width: 100%; height: 400px;"
      v-bind="currencyGrid"
      :rowData="rowData"
      @selectionChanged="selectionChanged"
    />

    <canvas ref="chartDomRef"></canvas>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { CRYPTOCURRENY } from '@/api/cryptoCurrency'
import type { SocketCurrencyGetTicker } from '@/api/cryptoCurrency'
import type { ColDef, GridOptions, SelectionChangedEvent } from 'ag-grid-community'
import type { Ref } from 'vue'

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
      { field: 'volumne', flex: 1 }
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

const useChart = (dom: Ref<HTMLCanvasElement>, currentKind: Ref<string>) => {
  let websocket: WebSocket
  let chart: Chart

  function socketOnMessage(e: MessageEvent<SocketCurrencyGetTicker>) {
  }

  onMounted(() => {
    chart = new Chart(dom.value, {
    })

    watch(currentKind, newKind => {
      websocket.close()
      if (!newKind) return false

      try {
        const socketUrl = CRYPTOCURRENY.getSocketUrl(newKind)
        websocket = new WebSocket(socketUrl)
        websocket.onmessage = socketOnMessage
      } catch(er) {
        alert('socket connect error')
        throw new Error(er)
      }
    })
  })
}

export default defineComponent({
  name: 'View_LibTest',
  setup() {
    const chartDomRef = ref<HTMLCanvasElement>()
    const currentKind = ref('')

    const { currencyGrid, rowData } = useCurrencyGrid()
    useChart(chartDomRef as Ref<HTMLCanvasElement>, currentKind)

    // 빗썸 api 너무 구리다..
    CRYPTOCURRENY.getMarkets().then(({ data }) => {
      const rs: GridField[] = []
      for (const [kind, { opening_price, max_price, min_price, closing_price, units_traded }] of Object.entries(data.data)) {
        if (kind !== 'date') rs.push({
          name: kind,
          open: opening_price,
          high: max_price,
          low: min_price,
          close: closing_price,
          volumne: units_traded
        })
      }
      rowData.value = rs
    }).catch(er => {
      alert('something is wrong')
      throw new Error(er)
    })

    return {
      currencyGrid,
      rowData,
      chartDomRef,
      currentKind
    }
  },
  methods: {
    async selectionChanged(event: SelectionChangedEvent) {
      const selected = event.api.getSelectedRows() as GridField[]
      if (!selected.length || selected.length > 1) {
        this.currentKind = ''
        if (selected.length) {
          alert('1개만 선택해 주세요')
          event.api.deselectAll()
        }
        return false
      }

      const [ctDATA] = selected
      this.currentKind = ctDATA.name
    }
  }
})
</script>