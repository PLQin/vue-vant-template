const state = {
	clientId: localStorage.getItem('clientId'),
};

// https://vuex.vuejs.org/zh/guide/mutations.html
// 不支持异步, 使用方法 this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
const mutations = {
	SET_CLIENT_ID: (state, clientId) => {
		state.clientId = clientId;
		localStorage.setItem('clientId', clientId);
	},
};

// https://vuex.vuejs.org/zh/guide/actions.html
// 支持异步, 使用方法 this.$store.dispatch('user/setOpenId', resp.data.openid)
const actions = {
	setClientId({ commit, state }, clientId) {
		commit('SET_CLIENT_ID', clientId);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
