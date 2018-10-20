import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
    <input type="text">
    <span @click="handleChange">{{propOne}}</span>
    <span v-show="active">see me active</span>
  </div>
  `,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

Vue.component('Comp', component)

new Vue({
  el: '#root',
  data: {
    prop1: 0
  },
  methods: {
    handleChange () {
      this.props1 += 1
    }
  },
  template: `
  <div>
    <Comp :active="true" :prop-one="prop1" @change="handleChange"/>
    <Comp :active="false"/>
  </div>
  `
})
