<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{fullName}} {{count}}</p>
        <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
    import {
      mapState,
      mapGetters,
      mapMutations,
      mapActions
    } from 'vuex'
    import Header from './layout/header.vue'
    import Todo from './views/todo/todo.vue'
    import Footer from './layout/footer.jsx'
    export default {
      components: {
        Header,
        Todo,
        Footer
      },
      mounted () {
        console.log(this.$store)
        this.updateCountAsync({
          num: 5,
          time: 2000
        })
        // let i = 1
        // setInterval(() => {
        //   this.updateCount('updateCount', {num: i++, num2: 2})
        // }, 1000)
      },
      methods: {
        ...mapActions(['updateCountAsync']),
        ...mapMutations(['updateCount'])
      },
      computed: {
        ...mapState({
          count: state => state.count
        }),
        ...mapGetters(['fullName'])
      }
    }
</script>
<style scoped lang="stylus">
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
}
</style>
