import Vue from 'vue'

const component = {
  /* props: {
    active: Boolean,
    propOne: String
  }, */
  template: `
  <div>
    <input type="text">
    <span @click="handleChange"></span>
    <span >see me active</span>
  </div>
  `,
  data () {
    return {
      text: '123'
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const CompVue = Vue.extend(component)

Vue.component('Comp', component)

new CompVue({
  el: '#root',
  data: {
    prop1: '0'
  },
  methods: {
    handleChange () {}
  },
  template: `
  <div>
    <Comp  @change="handleChange"/>
    <Comp />
  </div>
  `
})
