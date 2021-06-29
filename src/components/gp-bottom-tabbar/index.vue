
<template>
	<div v-if="visible" class="gp-bottom-tabbar">
		<van-tabbar ref="wrap" v-model="tabbar_active" safe-area-inset-bottom>
			<van-tabbar-item icon="home-o" @click="routerPush({ path: '/' })">首页</van-tabbar-item>
			<van-tabbar-item icon="add-o" @click="routerPush({ path: '/publish-news' })">发布</van-tabbar-item>
			<van-tabbar-item icon="friends-o" @click="routerPush({ path: '/user' })">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: 'GpBottomTabbar',
	props: {
		visible: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			tabbar_active: '',
		};
	},
	watch: {
		$route: {
			handler(nv, ov) {
				var tabbar_active = '';
				switch (this.$route.path) {
				case '/':
				case '/home':
					tabbar_active = 0;
					break;
				case '/user':
					tabbar_active = 2;
					break;

				default:
					break;
				}
				this.tabbar_active = tabbar_active;
			},
			immediate: true,
		},
	},
	created() {},
	methods: {
		routerPush(params) {
			this.$router.push({ path: params.path });
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
