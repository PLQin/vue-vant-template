
<template>
  <div class="home">
    <van-nav-bar :title="$route.meta.title" @click-right="onClickRight">
      <template slot="left">
        <div class="content">
          <img
            src="http://r20.pccoo.cn/wap_user/20200906/2020090610343929138759_72_72_150x150(s).png"
            alt
          >
        </div>
      </template>
    </van-nav-bar>

    <van-notice-bar
      left-icon="volume-o"
      wrapable
      :scrollable="false"
      text="免责声明：本平台不提供任何形式担保。点我查看用户协议与拼车详细说明。"
      @click="$router.push({ path: '/user-agreement' })"
    />

    <div class="van-coupon">
      <van-cell-group>
        <div class="gp-cell">
          <van-tag size="medium" type="primary">
            <template v-if="datum.type == 1">车找人</template>
            <template v-else>人找车</template>
          </van-tag>
          <span class="s3">
            <em>{{ datum.origin }}</em>
            <i class="to" />
            <em>{{ datum.destination }}</em>
          </span>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>发布时间</span>
          </div>
          <div class="value">
            <span>{{ datum.release_time ? $moment(datum.release_time).format('YYYY-MM-DD HH:mm') : '—' }}</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>浏览量</span>
          </div>
          <div class="value">
            <span>{{ datum.pv }}</span>
          </div>
        </div>

        <div class="interval" />
        <div class="gp-cell">
          <div class="title">
            <span>出发时间</span>
          </div>
          <div v-if="datum.is_long == 1" class="value">
            <span>后天（周六）{{ $moment(datum.once_departure_time).format('HH:mm') }}</span>
          </div>
          <div v-else-if="datum.is_long == 2" class="value">
            <span>每天 {{ datum.days_departure_time }}</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>途径地</span>
          </div>
          <div class="value">
            <span>{{ datum.pathway }}</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>剩余空位</span>
          </div>
          <div class="value">
            <span>{{ datum.seats || '—' }}空位</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>手机号</span>
          </div>
          <div class="value">
            <span>{{ datum.phone || '—' }}</span>
          </div>
        </div>

        <div class="interval" />
        <div class="gp-cell">
          <div class="title">
            <span>更多描述</span>
          </div>
          <div class="value">
            <span />
          </div>
          <div class="label">
            {{ datum.remark || '—' }}
            <p>联系我时请说是在寻乡情*拼车上看到的。</p>
          </div>
        </div>
      </van-cell-group>
    </div>

    <div class="van-goods-action gp-dial">
      <van-button size="large" @click="onPhoneCallTask(datum.phone)"><span><i class="iconfont icon-bodadianhua1 icon" /><b class="text">拨打电话</b></span></van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { articleDetail } from '@/api/article.js'
// import { getQuery } from '@/utils/index.js'
export default {
  components: {},
  props: {
    //
  },
  data() {
    return {
      datum: {}
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  created() {
    const { id } = this.$route.query
    if (id) {
      this.getArticleList(id)
    }
  },
  methods: {
    async getArticleList(id) {
      const resp = await articleDetail({ id }).catch(() => {})
      if (resp && resp.code === 200) {
        this.datum = resp.data
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
    onPhoneCallTask(tel) {
      window.open(`tel:${tel}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
