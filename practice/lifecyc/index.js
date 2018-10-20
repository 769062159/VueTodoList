import Vue from 'vue'

const app = new Vue({
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activeated () {
    console.log(this, 'activeated')
  },
  deactiveated () {
    console.log(this, 'deactiveated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  }
})

app.$mount('#root')
setInterval(() => {
  app.text += 1
}, 1000)

setTimeout(() => {
  app.$destroy()
}, 1000)
