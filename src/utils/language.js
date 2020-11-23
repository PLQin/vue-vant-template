
const LangKey = 'gp_lang' // 语言

export function get() {
  return (localStorage.getItem(LangKey) || '').toLowerCase()
}

export function set(data = '') {
  return localStorage.setItem(LangKey, data.toLowerCase())
}

export function remove() {
  return localStorage.removeItem(LangKey)
}
