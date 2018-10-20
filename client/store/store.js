import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'
export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {
        console.log('plugin')
      }
    ]
    // modules: {
    //   a: {
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })
  if (module.hot) {
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './actions/actions.js',
      './getters/getters.js'
    ], () => {
      const newState = require('./state/state.js').default
      const newMutations = require('./mutations/mutations.js').default
      const newActions = require('./actions/actions.js').default
      const newGetters = require('./getters/getters.js').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
