import type { SeoState, SeoStore } from './modules/seo'
import type { Plugin } from 'vuex'

import { createStore } from 'vuex'
import { store as seoStore } from './modules/seo'

type RootState = {
  seo: SeoState;
}
type RootStore = SeoStore<Pick<RootState, 'seo'>>

const plugins: Plugin<unknown>[] = (process.env.NODE_ENV !== 'production') ? [] : []

const rootStore = createStore({
  plugins,
  modules: {
    seoStore
  }
})

function useStore(): RootStore {
  return rootStore as RootStore
}

export {
  rootStore,
  useStore
}
export type {
  RootState,
  RootStore
}

// reference: https://codesandbox.io/s/using-vuex-4-modules-in-vue-3-with-typescript-7ygvy?file=/src/store/index.ts