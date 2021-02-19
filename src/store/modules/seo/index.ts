import type {
  Store as VuexStore,
  CommitOptions,
  Module
} from 'vuex'
import type { RootState } from '@/store'

import { State, state } from './state'
import { Mutations, mutations } from './mutation'

type SeoStore<S = State> = Omit<VuexStore<S>, 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    commitOptions?: CommitOptions
  ): ReturnType<Mutations[K]>;
}

const store: Module<State, RootState> = {
  state,
  mutations,
  namespaced: true
}

export type {
  SeoStore,
  State as SeoState
}
export {
  store
}