const state = {
  openid: localStorage.getItem('openid')
}

const mutations = {
  SET_OPEN_ID: (state, openid) => {
    state.openid = openid
    localStorage.setItem('openid', openid)
  }
}

const actions = {
  setOpenId({ commit, state }, openid) {
    commit('SET_OPEN_ID', openid)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
