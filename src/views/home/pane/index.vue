
<template>
	<div class="van-tab__pane">
		<div class="van-coupon-list__list van-coupon-list__list--with-bottom">
			<div
				v-for="(item, index) in datum.rows"
				:key="index"
				class="van-coupon"
				@click="openDetail(item)"
			>
				<div class="gp-coupon-content" :class="hasExpired(item) ? 'gp-coupon-expired':''">
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
								<small> （途径：{{ item.pathway }}）</small>
								<!-- MARK :  v-for 如何在v-for中使用 filter -->
								<!-- <small v-for="(elem,count) in filterPathway(item.pathway)" :key="count">
                <i v-if="count !== 0">,</i>
                {{ elem }}
              </small>
              ） -->
							</span>
						</div>
					</div>
					<div class="van-coupon__content">
						<ul class="item-detail">
							<li>
								<span v-if="item.is_long == 2">
									<b class="emphasis">每天</b>
									{{ item.days_departure_time }} 出发
								</span>
								<span v-else>
									{{ $moment(item.once_departure_time).format('YYYY-MM-DD HH:mm') }}
									出发
								</span>
							</li>
							<li class="van-multi-ellipsis--l2">备注：{{ item.remark }}</li>
						</ul>
					</div>
					<div class="van-coupon__description">
						<ul class="van-cd_left">
							<li>
								<span v-if="item.seats">{{ item.seats }}空位</span>
								<small>
									{{ $moment(item.create_time).format('YYYY-MM-DD HH:mm') }}
								</small>
								<small>发布</small>
							</li>
						</ul>
						<van-button
							class="van-cd_right"
							size="small"
							plain
							type="info"
							@click.stop="onCallTelTask(item.tel)"
						>拨打电话</van-button>
					</div>
				</div>
				<div
					v-if="hasExpired(item)"
					class="gp-cei"
					javascript="event.preventDefault()"
				>
					<img src="@/assets/img/common/expired.webp">
				</div>
			</div>
			<div v-if="!datum.rows || !datum.rows.length">
				<van-empty description="暂时没有哦~" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		datum: {
			type: Object,
			default() {
				return {
					total: 0,
					page_num: 0,
					page_size: 0,
					rows: [],
				};
			},
		},
	},
	data() {
		return {};
	},
	computed: {},
	created() {},
	methods: {
		onClickLeft() {
			this.$toast('返回');
		},
		onClickRight() {
			this.$toast('按钮');
		},
		onChange() {
			this.$toast('onChange');
		},
		openDetail(row) {
			if (!this.hasExpired(row)) {
				this.$router.push({ path: '/detail', query: { id: row.id }});
			}
		},
		filterPathway(value) {
			if (typeof value === 'string') {
				return value.split(',');
			}
			return value;
		},
		hasExpired(row) {
			return this.$moment(row.once_departure_time).isBefore(Date.now()) && String(row.is_long) !== '2';
		},
		onCallTelTask(tel) {
			window.open(`tel:${tel}`, '_blank');
		},
	},
};
</script>

<style lang="scss" scoped src="./index.scss"></style>
