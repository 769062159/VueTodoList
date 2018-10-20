import Vue from 'vue'

new Vue({
  el: '#root',
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     {{isActive ? 'active' : 'not active'}}
  //     {{arr.join(' ')}}
  //     {{html}}
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div :class="{ active: isActive }">
      {{isActive ? 'active' : 'not active'}}
      {{arr.join(' ')}}
      {{html}}
      <p v-html="html"></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main'
  },
  methods: {
    handleClick () {
      alert('clicked') //eslint-disable-line
    }
  }
})
