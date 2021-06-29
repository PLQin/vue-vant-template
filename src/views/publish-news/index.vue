
<template>
	<div class="page">
		<van-nav-bar
			:title="$route.meta.title"
			left-text="返回"
			left-arrow
			safe-area-inset-top
			@click-left="goBack"
		/>

		<!-- <van-notice-bar wrapable left-icon="volume-o" :scrollable="false" text="您的发布次数已用完，需付费发布信息" /> -->

		<van-notice-bar
			left-icon="volume-o"
			wrapable
			:scrollable="false"
			text="免责声明：本平台不提供任何形式担保。点我查看用户协议与拼车详细说明。"
			@click="$router.push({ path: '/agreement/usage' })"
		/>

		<div class="interval" />
		<van-tabs v-model="form.is_long">
			<van-tab name="1" title="短期拼车">
				<ShortPeriod :datum="{config, form}" desc="短期拼车" />
			</van-tab>
			<van-tab name="2" title="长期拼车">
				<div class="van-card long-hint">
					<span>有效期内信息永不过期，每天自动刷新，获得专属标识</span>
					<van-tag type="primary" size="medium">长期</van-tag>
				</div>
				<LongPeriod :datum="{config, form}" desc="长期拼车" />
			</van-tab>
		</van-tabs>

		<div class="interval" />
		<van-cell-group class="please-agree-agreement">
			<p>
				<van-checkbox v-model="agree_user_agreement" icon-size="16px">
					<div>
						我已阅读并同意
						<span
							class="active"
							@click.stop="$router.push({ path: '/agreement/usage' })"
						>《拼车平台说明》</span>
					</div>
				</van-checkbox>
			</p>
		</van-cell-group>

		<div style="margin: 16px;">
			<van-button round block type="info" @click="onSubmit">立即发布</van-button>
		</div>

		<div class="open-floor" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { articleAdd } from '@/api/article.js';
import { onValidate } from '@/utils/index.js';
import ShortPeriod from './short-period/index.vue';
import LongPeriod from './long-period/index.vue';
export default {
	components: {
		ShortPeriod,
		LongPeriod,
	},
	data() {
		return {
			agree_user_agreement: false, // 是否同意协议, false/true
			date: {
				show: false,
				currentDate: new Date(),
			},
			config: {
				type: {
					show: false,
					columns: ['车找人', '人找车'],
				},
				days: {
					show: false,
					columns: [7, 30, 90, 180],
				},
			},
			form: {
				is_top: '2', // 是否置顶， 1置顶， 2不置顶
				is_long: '1', // 是否长期(长期默认每天都会发车)， 1短期， 2长期
				type: '人找车', // 发布类型, 1为车找人， 2为人找车
				origin: '', // 起点, 出发地
				destination: '', // 终点, 目的地
				pathway: '', // 途径地
				once_departure_time: '', // 短期则匹配本次发车时间(出发时间)
				days_departure_time: '', // 长期则屁匹配每日发车时间(出发时间)
				contacts: '', // 联系人
				tel: '', // 联系电话
				seats: '', // 空位数目
				vehicle: '', // 车型
				license_plate: '', // 车牌号
				remark: '', // 备注
				day: 7, // 长期的 有效天数, default: 7
			},
			rules: {
				origin: { required: true, message: '请填写出发地' },
				destination: { required: true, message: '请填写目的地' },
				contacts: { required: true, message: '请填写联系人' },
				tel: { len: 11, required: true, message: '请填写正确的手机号' },
				agree_user_agreement: {
					type: Boolean,
					required: true,
					validator: (rule, value) => !!value,
					message: '请阅读并同意平台说明',
				},
			},
		};
	},
	computed: {
		...mapGetters(['login_token', 'user_info']),
	},
	created() {
		this.form = Object.assign({}, this.form, {
			tel: this.user_info.tel,
		});
	},
	methods: {
		goBack() {
			const { query } = this.$route;
			if (query.redirect) {
				this.$router.replace(query.redirect);
			} else {
				this.$router.go(-1);
			}
		},
		async onSubmit() {
			var form = Object.assign({}, this.form, { agree_user_agreement: this.agree_user_agreement });
			var rules = Object.assign({}, this.rules);

			if (form.type === '车找人') {
				rules.seats = { required: true, message: '请填写空位数目' };
			}

			if (String(form.is_long) === '1') {
				rules.once_departure_time = { required: true, message: '请选择出发时间' };
			} else {
				rules.days_departure_time = { required: true, message: '请选择出发时间' };
			}

			var validationErr = onValidate(form, rules);
			if (validationErr) return;

			const sendForm = Object.assign({}, this.form, {
				type: this.form.type === '人找车' ? 2 : 1,
			});
			const resp = await articleAdd(sendForm).catch(() => {});
			if (resp && String(resp.code) === '200') {
				this.$dialog.alert({
					title: '提示',
					message: '可在首页寻找功能 <b>我的</b> -> <b>我的拼车</b> 中设置拼车已满员，如此可避免接听到骚扰电话',
				}).then(() => {
					setTimeout(() => {
						this.$router.push({ path: '/' });
					}, 200);
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>

