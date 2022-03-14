function toFormData (data) {
  const formData = new FormData()
  console.log(Object.entries(data))
  Object.entries(data).forEach((field) => {
    if (typeof field[1] === 'object') {
      field[1].forEach(element => {
        formData.append(field[0], element)
      })
    } else {
      formData.append(field[0], field[1])
    }
  })
  return formData
}

module.exports = toFormData
