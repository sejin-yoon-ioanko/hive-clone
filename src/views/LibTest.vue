<template>
  <div class="a_content">
    <ag-grid
      id="v_lib-test_table"
      class="ag-theme-alpine"
      style="width: 100%; height: 400px;"
      v-bind="currencyGrid"
      :getRowNodeId="getRowNodeId"
      @selectionChanged="selectionChanged"
    />

    <canvas ref="chartDomRef"></canvas>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js'
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { CRYPTOCURRENY } from '@/api/cryptoCurrency'
import type { ColDef, SelectionChangedEvent, GridOptions } from 'ag-grid-community'
import type { Ref } from 'vue'

type GridField = {
  name: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volumne: string;
  change: string;
}

const useCurrencyGrid = () => {
  const currencyGrid = reactive({
    columnDefs: [
      { field: 'name', checkboxSelection: true },
      { field: 'open' },
      { field: 'high' },
      { field: 'low' },
      { field: 'close' },
      {
        field: 'change',
        valueFormatter: v => v.value + '%',
        cellClassRules: {
          's_change-down': (params: { data: GridField }) => parseFloat(params.data.change) < 0,
          's_change-up': (params: { data: GridField }) => parseFloat(params.data.change) > 0
        },
        cellRenderer: 'agAnimateShowChangeCellRenderer'
      },
      { field: 'volumne', flex: 1 }
    ] as Array<ColDef & { field: keyof GridField }>,
    defaultColDef: {
      sortable: true
    } as ColDef,
    multiSortKey: 'ctrl',
    gridOptions: {} as GridOptions
  })

  const getRowNodeId = (data: GridField) => data.name

  let watcher: number

  // 빗썸 api 너무 구리다..
  CRYPTOCURRENY.subscriptGetMarket(data => {
    if (!currencyGrid.gridOptions.api) return false
    const rs: GridField[] = []
    for (const [kind, { opening_price, max_price, min_price, closing_price, units_traded, prev_closing_price }] of Object.entries(data.data)) {
      if (kind !== 'date') {
        rs.push({
          name: kind,
          open: opening_price,
          high: max_price,
          low: min_price,
          close: closing_price,
          volumne: units_traded,
          change: ((1 - parseFloat(closing_price) / parseFloat(prev_closing_price)) * 100).toFixed(2)
        })
      }
    }

    if (watcher) {
      currencyGrid.gridOptions.api.applyTransactionAsync({ update: rs })
    } else {
      currencyGrid.gridOptions.api.applyTransactionAsync({ add: rs })
    }
  }).then(subscripter => watcher = subscripter)

  onBeforeUnmount(() => {
    clearInterval(watcher)
  })

  return {
    currencyGrid,
    getRowNodeId
  }
}

const useChart = (dom: Ref<HTMLCanvasElement>, currentKind: Ref<string>) => {
  let chart: Chart

  async function currencyChange(newCurrency: string) {
    const { data } = await CRYPTOCURRENY.getCandlesticks(newCurrency)

    chart.data.datasets?.push({
      label: newCurrency,
      data: []
    })

    for (let i = 0; i < data.length; i++) {
      if (i === 20) break
      // eslint-disable-next-line
      const [dateInteger, _, close] = data[i]
      const date = new Date(dateInteger)

      chart.data.labels?.push(`${date.getFullYear() - 2000}-${date.getMinutes() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`)
      // eslint-disable-next-line
      chart.data.datasets![0].data?.push(parseFloat(close))
    }
    chart.update()
  }

  onMounted(() => {
    chart = new Chart(dom.value, {
      type: 'line'
    })

    watch(currentKind, newKind => {
      chart.data.labels = []
      chart.data.datasets = []
      if (!newKind) return false
      currencyChange(newKind)
    })
  })
}

export default defineComponent({
  name: 'View_LibTest',
  setup() {
    const chartDomRef = ref<HTMLCanvasElement>()
    const currentKind = ref('')

    const { currencyGrid, getRowNodeId } = useCurrencyGrid()
    useChart(chartDomRef as Ref<HTMLCanvasElement>, currentKind)

    return {
      currencyGrid, getRowNodeId,
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

<style lang="scss">
// 휘발성 style
#v_lib-test_table {
  // change highlight color
  --ag-value-change-value-highlight-background-color: yellow !important;
  .s_change-up {
    color: red;
  }
  .s_change-down {
    color: blue;
  }
}
</style>