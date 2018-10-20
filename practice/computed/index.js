import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <span>Name:{{firstName + ' ' + lastName}}</span>
      <br/>
      <span>Name:{{name}}</span>
      <br/>
      <span>Name:{{getName()}}</span>
      <br/>
      <span>Number:{{number}}</span>
      <br/>
      <span><input type="text" v-model="number"></input></span>
    </div>
  `,
  data: {
    firstName: 'Jim',
    lastName: 'Yuan',
    number: 0
  },
  computed: {
    name () {
      console.log('new name')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    // 监听数据变化
  },
  methods: {
    getName () {
      console.log('new getName')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
