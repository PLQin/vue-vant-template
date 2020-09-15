const getters = {
  openid: state => state.user.openid,
  address: state => state.address.list,
  clientId: state => state.client.clientId
}
export default getters
