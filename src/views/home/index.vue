
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

    <van-tabs v-model="tab_active">
      <van-tab title="最新" />
      <van-tab title="车找人" />
      <van-tab title="人找车" />
    </van-tabs>

    <div role="tabpanel" class="van-tab__pane" style>
      <div class="van-coupon-list__list van-coupon-list__list--with-bottom">
        <Pane v-show="tab_active === 0" desc="最新" :datum="latestNews" />
        <Pane v-show="tab_active === 1" desc="人找车" :datum="findPeople" />
        <Pane v-show="tab_active === 2" desc="车找人" :datum="findCar" />
      </div>
    </div>

    <BottomTabbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '@/api/user.js'
import { articleList } from '@/api/article.js'
import Pane from './pane/index.vue'
export default {
  components: {
    Pane
  },
  data() {
    return {
      active: 'home',
      tab_active: 0,
      latestNews: {
        total: 100,
        page: 1,
        size: 10,
        list: [
          {
            id: 1, // 信息id
            isTop: 1, // 是否置顶， 1 置顶， 2不置顶
            isLong: 1, // 是否长期， 1 长期， 2不长期
            origin: '南京', // 起点
            destination: '无锡', // 终点
            pathway: ['南京', '常州', '无锡'], // 途径
            createTime: 1599573602346, // 此信息发布时间
            departureTime: 1599573602346, // 发车时间
            remark: '唐河至南京常州无锡昆山每人200圆，宝马五系，车牌豫A32N6A，出发时间人够就出发，联系电话15050222448陈', // 备注
            seats: 4, // 几个空位
            issuer: 2, // 发布人id
            everyDay: 1, // 是否每天都会发车, 1 是， 2不是
            type: 1 // 信息类型，1 车找人， 2人找车
          },
          {
            id: 2, // 信息id
            isTop: 2, // 是否置顶， 1 置顶， 2不置顶
            isLong: 1, // 是否长期， 1 长期， 2不长期
            origin: '昆山', // 起点
            destination: '无锡', // 终点
            pathway: ['南京', '常州', '无锡'], // 途径
            createTime: 1599573602346, // 此信息发布时间
            departureTime: 1599573602346, // 发车时间
            remark: '联系电话15050222448陈', // 备注
            seats: 2, // 几个空位
            issuer: 666, // 发布人id
            everyDay: 2, // 是否每天都会发车, 1 是， 2不是
            type: 2 // 信息类型，1 车找人， 2人找车
          }
        ]
      },
      findPeople: {
        total: 100,
        page: 1,
        size: 10,
        list: []
      },
      findCar: {
        total: 100,
        page: 1,
        size: 10,
        list: []
      }
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  created() {
    if (!this.openid) this.onLogin()
    // this.getArticleList()
  },
  methods: {
    async onLogin() {
      const resp = await login().catch(() => {})
      this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
    },
    async getArticleList() {
      const resp = await articleList().catch(() => {})
      console.log(resp)
    },
    onClickLeft() {
      this.$toast('返回')
    },
    onClickRight() {
      this.$toast('按钮')
    },
    onChange() {
      this.$toast('onChange')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
