const state = {
  list: JSON.parse(localStorage.getItem('address') || '[]')
}

const mutations = {
  SET_ADDRESS: (state, address) => {
    state.list = [address]
    localStorage.setItem('address', JSON.stringify(state.list))
  }
}

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
