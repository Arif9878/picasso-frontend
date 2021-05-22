export function isURL (str) {
    let url
    if (str.length === 0) return true
    try {
      url = new URL(str)
    } catch (_) {
      return false
    }
    return url.protocol === 'http:' || url.protocol === 'https:'
  }
