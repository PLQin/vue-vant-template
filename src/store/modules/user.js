const state = {
	openid: localStorage.getItem('openid'),
	login_token: localStorage.getItem('login_token'),
	user_info: JSON.parse(localStorage.getItem('user_info') || '{}'),
};

// https://vuex.vuejs.org/zh/guide/mutations.html
// 不支持异步, 使用方法 this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
const mutations = {
	SET_OPEN_ID: (state, openid) => {
		state.openid = openid;
		localStorage.setItem('openid', openid);
	},
	SET_LOGIN_TOKEN: (state, login_token) => {
		state.login_token = login_token;
		localStorage.setItem('login_token', login_token);
	},
	SET_USER_INFO: (state, user_info = {}) => {
		state.user_info = user_info;
		localStorage.setItem('user_info', JSON.stringify(user_info));
	},
	SET_LOGOUT: (state) => {
		const params = ['openid', 'login_token', 'user_info'];
		params.forEach(parm => {
			state[parm] = undefined;
			localStorage.removeItem(parm);
		});
	},
};

// https://vuex.vuejs.org/zh/guide/actions.html
// 支持异步, 使用方法 this.$store.dispatch('user/setOpenId', resp.data.openid)
const actions = {
	// DEMO
	actionA({ dispatch, commit, state }, products) {
		commit('savedCartItems', products + state.products);

		return dispatch('actionB').then(() => {
			commit('savedCartItems');
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
