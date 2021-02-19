import type { MutationTree } from 'vuex'

import { State } from './state'
import { SeoMutationTypes } from './mutation-types'

type Mutations<S = State> = {
  [SeoMutationTypes.SET_TITLE](state: S, payload: string): void;
}

const mutations: MutationTree<State> & Mutations = {
  [SeoMutationTypes.SET_TITLE](s, p) { s.title = p }
}

export type {
  Mutations
}
export {
  mutations
}