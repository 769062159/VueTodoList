import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div v-text="'Text:'+text" v-on:click="" v-once></div>
      <div v-html="html"></div>
      <div v-show="active" v-html="html"></div>
      <div v-if="active" v-html="html"></div>
      <div v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</div>
      <div v-for="(val, key, index) in obj" :key>{{val}}:{{key}}:{{index}}</div>
      <input type="text" v-model.number.trim.lazy="text">
      <input type="text" v-model.trim="text">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
    </div>
  `,
  data: {
    text: 0,
    active: false,
    html: '<span>this is span</span>',
    arr: [1, 2, 3],
    picked: '',
    obj: {
      a: '123',
      b: '456',
      c: '7789'
    }
  }
})
