import { firebaseAuth } from 'src/boot/firebase'

const state = {
  loggedIn: false,
  reqStatus: {},
  user: null
}
const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setReqStatus (state, value) {
    state.reqCode = value
  },
  setUser (state, value) {
    state.user = value
  }
}
const actions = {
  registerUser ({ commit }, payload) {
    firebaseAuth.createUserWithEmailAndPassword(
      payload.email, payload.password, payload.name
    )
      .then(response => {
        const { user } = response
        response.user.sendEmailVerification()

        user
          .updateProfile({
            displayName: user.name
          })
          .then(() => {})
      })
      .catch(e => {
        commit('setReqStatus', {
          code: e.code,
          success: false
        })
      })
  },
  recoverPassword ({ commit }, payload) {
    firebaseAuth.sendPasswordResetEmail(payload.email)
      .then((response) => {
        console.log(response.code)
      })
      .catch(e => {
        commit('setReqStatus', {
          code: e.code,
          success: false
        })
      })
  },
  async loginUser ({ commit }, payload) {
    await firebaseAuth.signInWithEmailAndPassword(
      payload.email, payload.password
    )
      .then(response => {
        this.$router.push({ name: 'dashboard' })
      })
      .catch(e => {
        commit('setReqStatus', {
          code: e.code,
          success: false
        })
      })
  },
  logoutUser ({ commit }) {
    firebaseAuth.signOut()
    commit('setLoggedIn', false)
    this.$router.push({ name: 'login' })
  },
  fetchUser ({ commit }, user) {
    commit('setLoggedIn', user !== null)
    if (user) {
      commit('setUser', {
        displayName: user.displayName,
        email: user.email
      })
    } else {
      commit('setUser', null)
    }
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        dispatch('fetchUser', user)
      }
    })
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
