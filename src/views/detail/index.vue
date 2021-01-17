
<template>
  <div class="home">
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      safe-area-inset-top
      @click-left="goBack"
    />

    <van-notice-bar
      left-icon="volume-o"
      wrapable
      :scrollable="false"
      text="免责声明：本平台不提供任何形式担保。点我查看用户协议与拼车详细说明。"
      @click="$router.push({ path: '/agreement/usage' })"
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
            <span>出发时间</span>
          </div>
          <div v-if="datum.is_long == 1" class="value">
            <span>后天（周六）{{ $moment(datum.once_departure_time).format('HH:mm') }}</span>
          </div>
          <div v-else-if="datum.is_long == 2" class="value">
            <span>每天 {{ datum.days_departure_time }}</span>
          </div>
        </div>
        <div v-show="datum.type == '1'" class="gp-cell">
          <div class="title">
            <span>途径地</span>
          </div>
          <div class="value">
            <span>{{ datum.pathway }}</span>
          </div>
        </div>
        <div v-show="datum.type == '1'" class="gp-cell">
          <div class="title">
            <span>剩余空位</span>
          </div>
          <div class="value">
            <span>{{ datum.seats }}空位</span>
          </div>
        </div>
        <div v-show="datum.type == '1'" class="gp-cell">
          <div class="title">
            <span>车型</span>
          </div>
          <div class="value">
            <span>{{ datum.vehicle }}空位</span>
          </div>
        </div>
        <div v-show="datum.type == '1'" class="gp-cell">
          <div class="title">
            <span>车牌号</span>
          </div>
          <div class="value">
            <span>{{ datum.license_plate }}空位</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>联系人</span>
          </div>
          <div class="value">
            <span>{{ datum.contacts || '—' }}</span>
          </div>
        </div>
        <div class="gp-cell">
          <div class="title">
            <span>手机号</span>
          </div>
          <div class="value">
            <span>{{ datum.tel || '—' }}</span>
          </div>
        </div>

        <div class="interval" />
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
            <span>备注</span>
          </div>
          <div class="value">
            <span />
          </div>
          <div class="label">
            {{ datum.remark }}
            <p>联系我时请说是在 {{ defaultSettings.title }} 上看到的。{{ defaultSettings.title }} 只提供消息，不承担风险。请自觉做好防护和安全工作，为安全保障请购买一份意外保险。</p>
          </div>
        </div>
      </van-cell-group>
    </div>

    <div class="van-goods-action gp-dial">
      <van-button size="large" @click="onCallTelTask(datum.tel)"><span><i class="iconfont icon-bodadianhua1 icon" /><b class="text">拨打电话</b></span></van-button>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/settings.js'
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
      defaultSettings,
      datum: {}
    }
  },
  computed: {
    ...mapGetters(['login_token'])
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
      if (resp && String(resp.code) === '200') {
        this.datum = resp.data
      }
    },
    onChange() {
      this.$toast('onChange')
    },
    onCallTelTask(tel) {
      window.open(`tel:${tel}`, '_blank')
    },
    goBack() {
      const { query } = this.$route
      if (query.redirect) {
        this.$router.replace(query.redirect)
      } else {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
