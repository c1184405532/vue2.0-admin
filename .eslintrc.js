module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-before-function-paren": ["error", "never"],
    semi: "off",
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }]

  },
  globals: {
    // "AMap": true,
    $Vue:true,
    getToken: true,
    setToken: true,
    globalThis: true,
    removeToken: true,
    getSessionStorage: true,
    setSessionStorage: true,
    removeSessionStorage: true,
    setLocalStorage: true,
    getLocalStorage: true,
    removeLocalStorage: true
  }
}
