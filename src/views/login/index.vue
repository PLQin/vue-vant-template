
<template>
	<div class="login">
		<div class="haeder">
			<van-nav-bar
				:title="$route.meta.title"
				left-text="首页"
				left-arrow
				style="display: block"
				safe-area-inset-top
				@click-left="goBack"
			/>
		</div>

		<div class="section">
			<van-field
				v-model="form.tel"
				required
				type="tel"
				label="手机号"
				placeholder="请输入手机号"
				:error-message="fields.tel ? rule.tel.message : ''"
			/>

			<van-field
				v-model="form.code"
				center
				clearable
				type="digit"
				label="短信验证码"
				placeholder="请输入短信验证码"
				:error-message="fields.code ? rule.code.message : ''"
			>
				<template #button>
					<van-button
						:disabled="config.sms_text !== '发送验证码'"
						size="mini"
						type="danger"
						@click="onSendSmsCode"
					>{{ config.sms_text }}</van-button>
				</template>
			</van-field>
		</div>

		<van-checkbox
			v-model="config.agreement"
			icon-size="16px"
			class="agree"
			checked-color="#ee0a24"
		>
			<span>已阅读并同意</span>
			<span class="content" @click.stop="$router.push({ path: '/agreement/usage' })">《用户协议》</span>
			<span>、</span>
			<span class="content" @click.stop="$router.push({ path: '/agreement/privacy' })">《隐私保护政策》</span>
		</van-checkbox>

		<div class="footer">
			<div class="main">
				<van-button
					class="login_btn"
					type="danger"
					round
					block
					size="normal"
					@click="onSubmit"
				>登录/注册</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { smscode_login, get_sms_code } from '@/api/user.js';
import Schema from 'async-validator';
export default {
	components: {},
	data() {
		return {
			config: {
				agreement: false,
				sms_text: '发送验证码',
			},
			form: {
				tel: '18570669043',
				code: '957165',
			},
			fields: {
				tel: '',
				code: '',
			},
			rule: {
				tel: {
					type: 'string',
					len: 11,
					required: true,
					message: '手机号格式错误',
				},
				code: {
					type: 'string',
					len: 6,
					required: true,
					message: '验证码格式错误',
				},
			},
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
		//
	},
	methods: {
		async onSubmit() {
			if (!this.getAgreementStatus()) return;

			const validator = new Schema(this.rule);
			let pass = false;
			this.fields = {};
			validator.validate(this.form, (errors, fields) => {
				if (errors) {
					this.fields = fields;
					pass = false;
					return;
				}
				pass = true;
			});
			if (!pass) return;

			const resp = await smscode_login(this.form).catch(() => {});
			if (resp && String(resp.code) === '200') {
				this.$toast('登录成功');
				this.showLoginDialog = false;
				this.$store.commit('user/SET_LOGIN_TOKEN', resp.data.login_token);
				this.$store.commit('user/SET_USER_INFO', resp.data.detail);
				this.goBack('ok');
			} else {
				//
			}
		},

		async onSendSmsCode() {
			if (!this.getAgreementStatus()) return;

			const validator = new Schema(this.rule);
			let pass = false;
			this.fields = {};
			validator.validate(this.form, (errors, fields) => {
				if (fields.tel) {
					this.fields = { tel: fields.tel };
					pass = false;
					return;
				}
				pass = true;
			});
			if (!pass) return;

			this.$toast.loading({
				message: '发送中...',
				forbidClick: true,
				duration: 0,
			});
			const resp = await get_sms_code(this.form).catch(() => {});
			if (resp && String(resp.code) === '200') {
				// 12/09 ： clear 放在code 200 中是因为request已经有了更新处理
				// 12/10 ： 不需要再执行 clear 了， 因为接下来 this.$toast('已发送短信验证码') 会覆盖掉
				// this.$toast.clear()

				this.$toast('已发送短信验证码');
				this.onCountdownSms();
			}
		},

		getAgreementStatus() {
			const { agreement } = this.config;
			if (!agreement) {
				this.$toast.fail({
					message: '请阅读并同意\n《用户协议》',
					duration: 1200,
				});
			}
			return agreement;
		},

		onCountdownSms() {
			var sms_text = 60;
			const countdown = setInterval(() => {
				if (sms_text <= 0) {
					clearInterval(countdown);
					this.config.sms_text = '发送验证码';
					return;
				}
				sms_text--;
				this.config.sms_text = ' ' + sms_text + ' s ';
			}, 1000);
		},

		goBack(status) {
			const { query } = this.$route;
			if (query.redirect && String(status) === 'ok') {
				this.$router.replace(query.redirect);
			} else {
				this.$router.push({ path: '/' });
			}
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
