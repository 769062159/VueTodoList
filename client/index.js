import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store.js'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = createStore()
const router = createRouter()

store.registerModule('c', {
  state: {
    text: 3
  }
})

store.subscribe((mutation, state) => {
  console.log(mutation.type, mutation.payload)
})

store.subscribeAction((action, state) => {
  console.log(action.type, action.payload)
})
// store.watch((state) => state.count + 1, (newCount) => console.log(newCount))
router.beforeEach((to, from, next) => {
  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach((to, from) => {})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
