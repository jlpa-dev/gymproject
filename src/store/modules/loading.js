import * as types from '../mutations'

// state
export const state = {
  loading: false
}

// mutations
export const mutations = {
  [types.IS_LOADING] (state, value) {
    state.loading = value
  }
}

// actions
export const actions = {
  is_loading ({ commit }, payload) {
    commit(types.IS_LOADING, payload)
  }
}

// getters
export const getters = {
  getLoadingState: state => state.loading
}

export default {
  getters,
  actions,
  mutations,
  state
}
