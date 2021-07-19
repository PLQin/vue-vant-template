
<template>
	<div class="page ">
		<div class="header">
			<!--  -->
		</div>
		<div class="section">
			<!--  -->
		</div>
		<div class="footer">
			<!--  -->
		</div>
	</div>
</template>

<script>
// import { commonFun } from '@/utils/webview-sdk.js'
export default {
	components: {},
	data() {
		return {
			//
		};
	},
	computed: {
		//
	},
	created() {
		//
	},
	// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
	beforeRouteUpdate(to, from, next) {
		// if (from.name === 'security-center') {
		//   setTimeout(async() => {
		//     commonFun('HP00010000')
		//   }, 0)
		// } else {
		//   next()
		// }
	},
	async mounted() {
		this.$toast.loading({
			message: this.$t('加载中...'),
			duration: 1200,
			forbidClick: true,
		});
	},
	methods: {
		//
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
