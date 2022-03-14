import * as types from '../mutations'

// state
export const state = {
  screendimensions: {
    width: '',
    height: ''
  }
}

// mutations
export const mutations = {
  [types.SCREEN_DIM] (state, { width, height }) {
    state.screendimensions.width = width
    state.screendimensions.height = height
  }
}

// actions
export const actions = {
  ScreenDim ({ commit }, payload) {
    commit(types.SCREEN_DIM, payload)
  }
}

// getters
export const getters = {
  getScreenDim: state => state.screendimensions,
  getScreenDimState: state => state
}

export default {
  getters,
  actions,
  mutations,
  state
}
