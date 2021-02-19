import type { RootStore } from '@/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: RootStore;
  }
}
