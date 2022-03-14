import { firebaseAuth } from 'boot/firebase'

const state = {
  loggedIn: false,
  reqStatus: {}
}
const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  },
  setReqStatus (state, value) {
    state.reqCode = value
  }
}
const actions = {
  registerUser ({ commit }, payload) {
    firebaseAuth.createUserWithEmailAndPassword(
      payload.email, payload.password, payload.name
    )
      .then(response => {
        console.log(response.code)
        response.user.sendEmailVerification()
        response.user
          .updateProfile({
            displayName: payload.name
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
  logoutUser () {
    firebaseAuth.signOut()
    this.$router.push({ name: 'login' })
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        localStorage.setItem('loggedIn', true)
      } else {
        commit('setLoggedIn', false)
        localStorage.getItem('loggedIn', false)
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
