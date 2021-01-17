const state = {
  list: JSON.parse(localStorage.getItem('address') || '[]')
}

// https://vuex.vuejs.org/zh/guide/mutations.html
// 不支持异步, 使用方法 this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
const mutations = {
  SET_ADDRESS: (state, address) => {
    state.list = [address]
    localStorage.setItem('address', JSON.stringify(state.list))
  }
}

// https://vuex.vuejs.org/zh/guide/actions.html
// 支持异步, 使用方法 this.$store.dispatch('user/setOpenId', resp.data.openid)
const actions = {
  set({ commit, state }, address) {
    commit('SET_ADDRESS', address)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
