
<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-notice-bar wrapable left-icon="volume-o" :scrollable="false" text="您的发布次数已用完，需付费发布信息" />

    <div class="interval" />
    <van-tabs v-model="form.isLong">
      <van-tab name="1" title="短期拼车" />
      <van-tab name="2" title="长期拼车" />
    </van-tabs>
    <div v-show="form.isLong === '2'" class="van-card long-hint">
      <span>有效期内信息永不过期，每天自动刷新，获得专属标识</span>
      <van-tag type="primary" size="medium">长期</van-tag>
    </div>

    <ShortPeriod v-show="form.isLong === '1'" :datum="form" desc="短期拼车" />
    <LongPeriod v-show="form.isLong === '2'" :datum="form" desc="长期拼车" />

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @submit="onSubmit">立即发布</van-button>
    </div>

    <div class="open-floor" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShortPeriod from './short-period/index.vue'
import LongPeriod from './long-period/index.vue'
export default {
  components: {
    ShortPeriod,
    LongPeriod
  },
  data() {
    return {
      agreeUserAgreement: false,

      date: {
        show: false,
        currentDate: new Date()
      },

      form: {
        isTop: 2, // 是否置顶， 1置顶， 2不置顶
        isLong: '1', // 是否长期， '1'短期， '2'长期
        everyDay: 2, // 是否每天都会发车, 1 是， 2不是
        type: '人找车', // 发布类型
        destination: '', // 终点, 目的地
        origin: '', // 起点, 出发地
        once_departureTime: '', // 本次 发车时间, 出发时间
        days_departureTime: '', // 每日 发车时间, 出发时间
        pathway: '', // 途径地
        phone: '',
        seats: '', // 空位数目
        remark: '', // 备注，更多描述
        day: '', // 长期的 有效天数
        agreeUserAgreement: '' // 是否同意协议
      }
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  created() {
    // TODO
    // if (!this.openid) {
    //   this.$toast('请先登录')
    //   setTimeout(() => {
    //     this.$router.push({ path: '/' })
    //   }, 0)
    //   return
    // }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onAgree() {
      this.agreeUserAgreement = !this.agreeUserAgreement
    },
    onSubmit() {
      // this.agreeUserAgreement = !this.agreeUserAgreement
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
