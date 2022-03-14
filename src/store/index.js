import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import tabs from './modules/tabs'
import loading from './modules/loading'
import screen from './modules/screen'
import auth from './modules/auth-firebase'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      tabs,
      loading,
      screen,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
