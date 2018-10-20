import Vue from 'vue'

const component = {
  template: `
  <div :style="style">
    <div class="header">
      <slot name="header" :value="value" aaa="111"></slot>
    </div>
    <div class="body"><slot name="body"></slot></div>
  </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: '123'
    }
  }

}

new Vue({
  el: '#root',
  components: {
    compOne: component
  },
  data: {
    value: '123456789'
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  /* template: `
  <div>
    <compOne ref="comp">
      <span slot="header" slot-scope="props" ref="span">{{props.value}}{{props.aaa}} {{value}}this is header</span>
    </compOne>
  </div>
  `, */
  render (createElement) {
    return createElement('comp-one', {
      ref: 'comp'
    }, [
      createElement('span', {
        ref: 'span'
      }, this.value)
    ])
  }
})
