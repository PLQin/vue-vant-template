
<template>
	<div class="my-car-sharing">
		<van-nav-bar
			:title="$route.meta.title"
			left-text="返回"
			left-arrow
			safe-area-inset-top
			@click-left="goBack"
		/>

		<div
			v-for="(item,index) in datum.rows"
			:key="index"
			class="van-coupon"
			@click="openDetail(item)"
		>
			<div class="van-card">
				<div class="info van-ellipsis">
					<van-tag
						v-if="item.is_top == 1"
						size="medium"
						type="warning"
					>置顶</van-tag>
					<van-tag
						v-if="item.is_long == 2"
						size="medium"
						type="primary"
					>长期</van-tag>
					<van-tag size="medium" type="primary">
						<template v-if="item.type == 1">车找人</template>
						<template v-else>人找车</template>
					</van-tag>
					<span class="s3">
						<em>{{ item.origin }}</em>
						<i class="to" />
						<em>{{ item.destination }}</em>
					</span>
					<span v-if="item.pathway" class="s4">
						<small>（途径：{{ item.pathway }}）</small>
						<!-- MARK :  v-for 如何在v-for中使用 filter -->
						<!-- <small v-for="(elem,count) in filterPathway(item.pathway)" :key="count">
              <i v-if="count !== 0">,</i>
              {{ elem }}
            </small>
            ）-->
					</span>
				</div>
			</div>
			<div class="van-coupon__content">
				<ul>
					<li>
						<span v-if="item.is_long == 2">
							<b class="emphasis">每天</b>
							{{ $moment(item.create_time).format('HH:mm') }} 出发
						</span>
						<span v-else>{{ $moment(item.create_time).format('YYYY-MM-DD HH:mm') }} 出发</span>
					</li>
					<li class="van-multi-ellipsis--l2">备注：{{ item.remark }}</li>
				</ul>
			</div>
			<div class="van-coupon__description">
				<ul class="van-cd_left">
					<li>
						<span v-if="item.seats">{{ item.seats }}空位</span>
						<small>{{ $moment(item.create_time).format('YYYY-MM-DD HH:mm') }}</small>
					</li>
				</ul>

				<div class="van-cd_right">
					<van-button
						v-if="String(item.status) === '1'"
						size="small"
						plain
						type="info"
						@click.stop="updateStatus(item)"
					>设置为已满员</van-button>
					<van-button
						v-else
						size="small"
						plain
					>{{ statusMap[item.status] }}</van-button>
					<van-button
						size="small"
						class="gp-ml-4"
						plain
						type="info"
						@click.stop="delate(item)"
					>删除</van-button>
				</div>
			</div>
		</div>
		<div v-if="!datum.rows || !datum.rows.length">
			<van-empty description="暂时没有哦~" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { articleList, articleEdit, articleDelete } from '@/api/article.js';
export default {
	components: {},
	props: {},
	data() {
		return {
			statusMap: {
				'1': '正常',
				'2': '封禁',
				'3': '待审核',
				'4': '已满员',
			},
			datum: {
				total: 0,
				page_num: 0,
				page_size: 0,
				rows: [],
			},
		};
	},
	computed: {
		...mapGetters(['user_info']),
	},
	async created() {
		const loading = this.$loading();
		await this.getArticleList();
		setTimeout(() => {
			loading.close();
		}, 700);
	},
	methods: {
		async getArticleList() {
			const sendForm = { issuer: this.user_info.id };
			const resp = await articleList(sendForm).catch(() => {});
			if (resp && String(resp.code) === '200') {
				this.datum = resp.data;
			}
		},
		async updateStatus(item) {
			this.$dialog.confirm({
				title: '提示',
				message: '更新后将隐藏您在本条消息中的联系方式',
			}).then(async() => {
				const sendForm = { id: item.id, status: 4 };
				await articleEdit(sendForm).catch(() => {});
				this.getArticleList();
			}).catch(() => {
				// on cancel
			});
		},
		async delate(item) {
			this.$dialog.confirm({
				title: '提示',
				message: '删除后将无法撤回操作',
			}).then(async() => {
				const sendForm = { id: item.id };
				await articleDelete(sendForm).catch(() => {});
				this.getArticleList();
			}).catch(() => {
				// on cancel
			});
		},
		goBack() {
			const { query } = this.$route;
			if (query.redirect) {
				this.$router.replace(query.redirect);
			} else {
				this.$router.go(-1);
			}
		},
		onClickRight() {
			this.$toast('按钮');
		},
		onChange() {
			this.$toast('onChange');
		},
		openDetail(row) {
			this.$router.replace({ path: '/detail', query: { id: row.id, redirect: '/my-car-sharing' }});
		},
		filterPathway(value) {
			if (typeof value === 'string') {
				return value.split(',');
			}
			return value;
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
