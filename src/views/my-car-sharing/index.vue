
<template>
  <div class="my-car-sharing">
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div
      v-for="(item,index) in datum.list"
      :key="index"
      class="van-coupon"
      @click="openDetail(item)"
    >
      <div class="van-card">
        <div class="info van-ellipsis">
          <van-tag v-if="item.is_top == 1" size="medium" type="warning">置顶</van-tag>
          <van-tag v-if="item.is_long == 1" size="medium" type="primary">长期</van-tag>
          <van-tag size="medium" type="primary">
            <template v-if="item.type == 1">车找人</template>
            <template v-else>人找车</template>
          </van-tag>
          <span class="s3">
            <em>{{ item.origin }}</em>
            <i class="to" />
            <em>{{ item.destination }}</em>
          </span>
          <span class="s4">
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
              {{ $moment(item.createTime).format('HH:mm') }} 出发
            </span>
            <span v-else>{{ $moment(item.createTime).format('YYYY-MM-DD HH:mm') }} 出发</span>
          </li>
          <li class="van-multi-ellipsis--l2">备注：{{ item.remark }}</li>
        </ul>
      </div>
      <div class="van-coupon__description">
        <ul class="van-cd_left">
          <li>
            <span>{{ item.seats }}空位</span>
            <small>{{ $moment(item.createTime).format('YYYY-MM-DD HH:mm') }}</small>
          </li>
        </ul>
        <van-button
          class="van-cd_right"
          size="small"
          plain
          type="info"
          @click.stop="onPhoneCallTask(item.phone)"
        >拨打电话</van-button>
      </div>
    </div>
    <div v-if="!datum.list || !datum.list.length">
      <van-empty description="暂时没有哦~" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { articleList } from '@/api/article.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      datum: {
        total: 0,
        page: 0,
        size: 0,
        list: []
      }
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const sendForm = { issuer: localStorage.openid }
      const resp = await articleList(sendForm).catch(() => {})
      if (resp && resp.code === 200) {
        this.datum.list = resp.data
      }
    },
    onClickLeft() {
      this.$toast('返回')
    },
    onClickRight() {
      this.$toast('按钮')
    },
    onChange() {
      this.$toast('onChange')
    },
    openDetail(row) {
      this.$router.push({ path: '/detail', query: { id: row.id }})
    },
    filterPathway(value) {
      if (typeof value === 'string') {
        return value.split(',')
      }
      return value
    },
    onPhoneCallTask(tel) {
      window.open(`tel:${tel}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
