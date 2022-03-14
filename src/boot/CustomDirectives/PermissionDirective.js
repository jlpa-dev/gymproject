import Vue from 'vue'

// Initialize the directive.
export const can = {
  inserted (el, binding, vnode) {
    // if( store.getters.authCheck ){
    if (binding.value) {
      const hasPermission = vnode.context.$store.getters.hasApiPermission(binding.value)
      if (!hasPermission) {
        el.parentNode.removeChild(el)
      }
    } else {
      // TODO
      // console.error('You must specify a permission ID')
    }
    // }
  }
}
// You can also make it available globally.
Vue.directive('can', can)
