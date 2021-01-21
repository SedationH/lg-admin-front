import { createStore } from 'vuex'
import user from './user'

export default createStore({
  // @ts-ignore：state中的数据由modules提供
  state: {},
  mutations: {},
  actions: {},
  modules: { user }
})
