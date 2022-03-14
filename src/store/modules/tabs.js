import * as types from '../mutations'

// state
export const state = {
  tabs: []
}

// mutations
export const mutations = {
  [types.UPDATE_TABS] (state, { tabs }) {
    state.tabs = tabs
  }
}

// actions
export const actions = {
  updateTabs ({ commit }, payload) {
    commit(types.UPDATE_TABS, payload)
  }
}

// getters
export const getters = {
  listTabs: state => state.tabs
}

export default {
  getters,
  actions,
  mutations,
  state
}
