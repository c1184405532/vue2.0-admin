globalThis.getToken = function() {
  return localStorage.getItem("userToken")
}

globalThis.setToken = function(token) {
  localStorage.setItem("userToken", token)
}

globalThis.removeToken = function() {
  localStorage.removeItem("userToken")
}

globalThis.getLocalStorage = function(key) {
  return JSON.parse(localStorage.getItem(key))
}

globalThis.setLocalStorage = function(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

globalThis.removeLocalStorage = function(key) {
  localStorage.removeItem(key)
}

globalThis.getSessionStorage = function(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

globalThis.setSessionStorage = function(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
}

globalThis.removeSessionStorage = function(key) {
  sessionStorage.removeItem(key)
}
