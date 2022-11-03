// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// export const state = function () {
//   return {
//     token: ''
//   }
// }
export const state = {
  token: ''
}
export const mutations = {
  M_UPDATE_TOKEN (state, val) {
    state.token = val
  }
}
export const actions = {
  nuxtServerInit (store, { app: { $cookies } }) {
    let token = $cookies.get('token') ? $cookies.get('token') : '';
    store.commit('M_UPDATE_TOKEN', token);
  }
}
// const store = new Vuex.Store({
//   state: {
//     token: ''
//   },
//   mutations: {
//     M_UPDATE_TOKEN (state, val) {
//       state.token = val
//     }
//   },
//   actions: {
//     nuxtServerInit (store, { app: { $cookies } }) {
//       let token = $cookies.get('token') ? $cookies.get('token') : '';
//       store.commit('M_UPDATE_TOKEN', token);
//     }
//   }
// })
// export default store
