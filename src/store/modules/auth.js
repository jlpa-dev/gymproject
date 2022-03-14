import axios from 'axios'
import { Cookies } from 'quasar'
import * as types from '../mutations'

// state
export const state = {
  user: null,
  token: Cookies.get('token'),
  permissions: Cookies.get('permissions'),
  roles: Cookies.get('roles')
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember, permissions, roles }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null, path: '/' })
    state.permissions = permissions
    Cookies.set('permissions', permissions, { expires: remember ? 365 : null, path: '/' })
    state.roles = roles
    Cookies.set('roles', roles, { expires: remember ? 365 : null, path: '/' })
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
    Cookies.remove('permissions')
    Cookies.remove('roles')
  },

  [types.LOGOUT] (state) {
    Cookies.remove('token')
    Cookies.remove('permissions')
    Cookies.remove('roles')
    state.user = null
    state.token = null
    state.permissions = null
    state.roles = null
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')
      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit(types.LOGOUT)
  }
}

// getters
export const getters = {
  authUser: state => state.user,
  authToken: state => state.token,
  authCheck: state => state.user !== null,
  authPermissions: state => state.permissions,
  authRoles: state => state.roles,
  authState: state => state,
  hasApiPermission (value) {
    return function (value) {
      /* state.permissions.forEach(element => {
        if ( element === value ) {
          return true
        }
      }); */
      return state.permissions[value] || false
    }
    /* return value => state.permissions.filter(permission =>{
      return false
    }); */
  },
  hasApiRole (value) {
    return function (value) {
      state.roles.forEach(element => {
        if (element === value) {
          return true
        }
      })
      return false
    }
    /* return value => state.permissions.filter(permission =>{
      return false
    }); */
  }
}
