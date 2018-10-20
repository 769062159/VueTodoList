import Vue from 'vue'

const app = new Vue({
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  }
})
app.$mount('#root')
let i = 0
setInterval(() => {
  app.text += 1
  app.$set(app.obj, 'a', i)
}, 1000)
console.log('-----$data-------', app.$data.text)
console.log('-----$props-------', app.$props)
console.log('-----$el-------', app.$el)
console.log('-----$options-------', app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })
// unWatch()
//
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// app.$once('test', () => {})
// app.$emit('test', 1, 2)
// app.$forceUpdate()

console.log('-----$root-------', app.$root === app)
console.log('-----$children-------', app.$children)
console.log('-----$slots-------', app.$slots)
console.log('-----$scopedSlots-------', app.$scopedSlots)
console.log('-----$refs-------', app.$refs)
console.log('-----$isServer-------', app.$isServer)
