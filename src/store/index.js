import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// vue的全局变量。（每个页面都有可能用到的数据放在里面）
// 调用的方式 this.$store.state.cartInfo
const state = {
  books: [],
  detail: {},
  cart: [],
  order:[],
}

const mutations = {

  toDetail(state, info) {
    state.detail = info
  },
  addCart(state, item) {
    state.cart.push(item)
    console.log(state.cart)
  },
  addOrder(state, list) {
    state.order.push(list)
  },
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store
