
const LangKey = 'hb_lang' // 语言

export function get() {
  return localStorage.getItem(LangKey)
}

export function set(data) {
  return localStorage.setItem(LangKey, data)
}

export function remove() {
  return localStorage.removeItem(LangKey)
}
