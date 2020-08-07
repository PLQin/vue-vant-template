import Cookies from 'js-cookie'

const state = {
  // list :
  // [
  //   {
  //     addressDetail: '',
  //     areaCode: '',
  //     city: '',
  //     country: '',
  //     county: '',
  //     isDefault: '',
  //     name: '',
  //     postalCode: '',
  //     province: '',
  //     tel: ''
  //   }
  // ]
  list: JSON.parse(Cookies.get('address') || '[]')
}

const mutations = {
  SET_ADDRESS: (state, address) => {
    state.list = [address]
    Cookies.set('address', JSON.stringify(state.list))
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
