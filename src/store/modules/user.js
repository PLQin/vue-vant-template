const state = {
  openid: localStorage.getItem('openid'),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
}

const mutations = {
  SET_OPEN_ID: (state, openid) => {
    state.openid = openid
    localStorage.setItem('openid', openid)
  },
  SET_USER_INFO: (state, userInfo = {}) => {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
