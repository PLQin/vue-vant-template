const state = {
  // orderId: localStorage.getItem('orderId')
}

// https://vuex.vuejs.org/zh/guide/mutations.html
// 不支持异步, 使用方法 this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
const mutations = {
  // CREATE_ORDER: (state, orderId) => {
  //  state.orderId = orderId
  //  localStorage.setItem('orderId', orderId)
  // }
}

// https://vuex.vuejs.org/zh/guide/actions.html
// 支持异步, 使用方法 this.$store.dispatch('user/setOpenId', resp.data.openid)
const actions = {
  // create({ commit, state }, orderId) {
  //   commit('CREATE_ORDER', orderId)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
