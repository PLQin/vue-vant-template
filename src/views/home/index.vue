
<template>
  <div class="home">
    <van-nav-bar :title="$route.meta.title" @click-right="onClickRight">
      <template slot="left">
        <div class="content">
          <img
            src="http://r20.pccoo.cn/wap_user/20200906/2020090610343929138759_72_72_150x150(s).png"
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

    <van-cell-group>
      <van-cell class="search">
        <div class="van-search van-search--show-action">
          <div class="van-search__content van-search__content--square">
            <van-field v-model.trim="search.origin" clearable placeholder="出发地搜索" />
            <div class="exchange">
              <div role="button" tabindex="0" class="van-search__action" @click="onExchangePlace">
                <van-icon name="exchange" />
              </div>
            </div>
            <van-field v-model.trim="search.destination" clearable placeholder="目的地搜索" />
          </div>
          <div role="button" tabindex="0" class="van-search__action" @click="getArticleList">
            <div>搜索</div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-tabs v-model="tab_active">
      <van-tab title="最新" />
      <van-tab title="车找人" />
      <van-tab title="人找车" />
    </van-tabs>

    <div role="tabpanel" class="van-tab__pane" style>
      <div class="van-coupon-list__list van-coupon-list__list--with-bottom">
        <Pane v-show="tab_active == 0" desc="最新" :datum="latestNews" />
        <Pane v-show="tab_active == 1" desc="人找车" :datum="findPeople" />
        <Pane v-show="tab_active == 2" desc="车找人" :datum="findCar" />
      </div>
    </div>

    <gp-bottom-tabbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { articleList } from '@/api/article.js'
import { wxLogin, wxReplace } from '@/api/user.js'
import { getQuery } from '@/utils/index.js'
import Pane from './pane/index.vue'
export default {
  components: {
    Pane
  },
  data() {
    return {
      active: 'home',
      tab_active: 0,
      search: {
        origin: '', // 起点, 出发地
        destination: '' // 终点, 目的地
      },
      latestNews: {
        total: 100,
        page: 1,
        size: 10,
        list: [
          // {
          //   id: 1, // 信息id
          //   createTime: 1599573602346, // 此信息创建时间
          //   release_time: 1599573602346, // 此信息通过审核，发布时间
          //   issuer: 2, // 发布人id
          //   is_top: 2, // 是否置顶， 1置顶， 2不置顶
          //   is_long: 1, // 是否长期(长期默认每天都会发车)， 1短期， 2长期
          //   type: '人找车', // 发布类型发送到后台时需要转换为： 1为车找人， 2为人找车
          //   origin: '', // 起点, 出发地
          //   destination: '', // 终点, 目的地
          //   pathway: '', // 途径地
          //   once_departure_time: '', // 短期则匹配本次发车时间(出发时间)
          //   days_departure_time: '', // 长期则屁匹配每日发车时间(出发时间)
          //   phone: '', // 联系电话
          //   seats: '', // 剩余空位数目
          //   remark: '', // 备注，更多描述
          //   day: '' // 长期的 有效天数
          // }
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
  watch: {
    tab_active(newVal) {
      this.getArticleList()
    }
  },
  created() {
    // MARK 为什么这里取不到 this.openid
    if (!localStorage.openid) {
      if (location.href.indexOf('?code=') > -1) {
        this.onLogin()
      } else {
        this.toWxCode()
      }
      return
    }

    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      let sendForm = this.tab_active ? { type: this.tab_active } : {}
      sendForm = Object.assign(sendForm, this.search)
      const resp = await articleList(sendForm).catch(() => {})
      if (resp && resp.code === 200) {
        switch (this.tab_active) {
          case 1:
            this.findPeople.list = resp.data
            break
          case 2:
            this.findCar.list = resp.data
            break
          default:
            this.latestNews.list = resp.data
            break
        }
      }
    },
    async onLogin() {
      const resp = await wxLogin({ code: getQuery('code') }).catch(() => {})
      if (resp && resp.code === 200) {
        this.$store.commit('user/SET_OPEN_ID', resp.data.openid)
        this.$store.commit('user/SET_USER_INFO', resp.data)
        this.getArticleList()
      }
    },
    async toWxCode() {
      const resp = await wxReplace({ origin: location.origin }).catch(() => {})
      if (resp && resp.code === 200) {
        location.href = resp.data.url
      }
    },
    onExchangePlace() {
      this.search.origin = [
        this.search.destination,
        (this.search.destination = this.search.origin)
      ][0]
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
