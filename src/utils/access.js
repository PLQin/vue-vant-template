
const Key = 'gp_access_Token'

export function get() {
  return sessionStorage.getItem(Key) || ''
}

export function set(data) {
  return sessionStorage.setItem(Key, data)
}

export function remove() {
  return sessionStorage.removeItem(Key)
}
