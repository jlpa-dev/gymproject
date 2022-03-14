import axios from 'axios'
// import store from '../store'
// import router from '../router'
import { Notify } from 'quasar'

import { boot } from 'quasar/wrappers'

const apiAdmin = axios.create()

export default boot(async ({ app }) => {
  // Trigger loading state #END
  await apiAdmin.interceptors.request.use(request => {
    request.baseURL = 'http://localhost:5001/gymapp-40596/us-central1/app'
    // request.baseURL = 'https://us-central1-gymapp-40596.cloudfunctions.net/app'
    request.headers['Access-Control-Allow-Origin'] = '*'
    request.headers['Access-Control-Expose-Headers'] = 'Access-Control-Allow-Origin'
    // if (store.getters.authToken) {
    //   request.headers.common.Authorization = `Bearer ${store.getters.authToken}`
    // }
    return request
  })

  await apiAdmin.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (!error.response) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Error de conexión',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }
      const { status } = error.response

      if (status === 403) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'No posee permisos para realizar esta acción',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }

      if (status >= 500) {
        Notify.create({
          color: 'negative',
          textColor: 'white',
          icon: 'error',
          message: 'Error del servidor, contactese con el adminsitrador del sistema',
          position: 'top-right',
          avatar: '',
          timeout: 3000
        })
      }
      //   console.log(store.getters.authToken)
      if (status === 401) { // POR REVISAR
        console.log('expiro sesion')
        this.$router.push({ name: 'login' })
      }

      // Console.log('Estado: ' + status)
      // Console.log('Sesión Activa?: ' + store.getters.authCheck)

      return Promise.reject(error)
    }
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  //   app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { apiAdmin }
