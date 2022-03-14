import { ref } from 'vue'

export function validationHelper () {
  const errors = ref([])

  function getValidationErrorMessages (field) {
    if (!errors.value) {
      return []
    }
    const keys = Object.keys(errors.value)
    const key = keys.find(element => element.toLowerCase() === field.toLowerCase())
    if (errors.value[key]) {
      return errors.value[key]
    }
    return []
  }

  function getValidationErrors (field) {
    const errors = getValidationErrorMessages(field)
    if (errors.length !== 0) {
      return errors.join('\r\n')
    }
    return ''
  }

  function hasValidationErrors (field) {
    if (getValidationErrorMessages(field).length !== 0) {
      return true
    }
    return false
  }

  function setValidationErrors (payload) {
    errors.value = payload
  }

  function showValidationError () {
    this.$q.notify({
      type: 'negative',
      message: 'Validation failure',
      caption: 'please check the inputs'
    })
  }

  return {
    showValidationError,
    setValidationErrors,
    getValidationErrors,
    hasValidationErrors
  }
}
