
export async function getMetadata (image) {
  if (image) {
    const { type, name } = image
    return {
      contentType: type,
      originalName: name
    }
  } else {
    return {}
  }
}
