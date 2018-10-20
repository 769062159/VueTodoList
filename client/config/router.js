import Router from 'vue-router'
import routes from './routes.js'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/'
    // linkActiveClass: 'avtive-link'
    // linkExactActiveClass: 'exact-avtive-link'
    scrollBehavior (to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true,
    parseQuery (query) {},
    stringifyQuery (obj) {}
  })
}
