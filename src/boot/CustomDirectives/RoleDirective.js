import Vue from 'vue'

// Initialize the annoying-background directive.
export const is = {
  binding (el, binding, vnode) {
    if (binding.value) {
      const hasRol = vnode.context.$store.getters.hasApiRol(binding.value)
      if (!hasRol) {
        el.parentNode.removeChild(el)
      }
    } else {
      // TODO
      // console.error('You must specify a permission ID')
    }
  }
}
// You can also make it available globally.
Vue.directive('is', is)
