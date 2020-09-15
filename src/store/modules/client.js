const state = {
  clientId: localStorage.getItem('clientId')
}

const mutations = {
  SET_CLIENT_ID: (state, clientId) => {
    state.clientId = clientId
    localStorage.setItem('clientId', clientId)
  }
}

const actions = {
  setClientId({ commit, state }, clientId) {
    commit('SET_CLIENT_ID', clientId)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
