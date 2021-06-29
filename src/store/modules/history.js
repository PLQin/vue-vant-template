const state = {
	list: [],
};

// https://vuex.vuejs.org/zh/guide/mutations.html
// 不支持异步, 使用方法 this.$store.commit('history/SET_LIST', route)
const mutations = {
	SET_LIST: (state, route) => {
		state.list.push(route);
	},
};

// https://vuex.vuejs.org/zh/guide/actions.html
// 支持异步, 使用方法 this.$store.dispatch('user/setOpenId', route)
const actions = {
	set({ commit, state }, route) {
		commit('SET_LIST', route);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
