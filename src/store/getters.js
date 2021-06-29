const getters = {
	login_token: state => state.user.login_token,
	user_info: state => state.user.user_info,
	openid: state => state.user.openid,
	address: state => state.address.list,
	clientId: state => state.client.clientId,
};

export default getters;
