
<template>
  <div class="home">
    <van-nav-bar
      :title="$route.meta.title"
      safe-area-inset-top
      @click-right="onClickRight"
    >
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
      @click="$router.push({ path: '/agreement/usage' })"
    />

    <van-cell-group>
      <div class="ga-a">
        <van-swipe :show-indicators="false">
          <van-swipe-item>
            <van-image src="http://r20.pccoo.cn/app_adv/20201207/2020120715115212645945_750_240_500x300(w).png" />
          </van-swipe-item>
        </van-swipe>
        <span class="ga-a-info">广告</span>
      </div>

      <van-cell class="search">
        <div class="van-search van-search--show-action">
          <div class="van-search__content van-search__content--square">
            <van-field
              v-model.trim="search.origin"
              clearable
              placeholder="出发地搜索"
            />
            <div class="exchange">
              <div
                role="button"
                class="van-search__action"
                @click="onExchangePlace"
              >
                <van-icon name="sort" />
              </div>
            </div>
            <van-field
              v-model.trim="search.destination"
              clearable
              placeholder="目的地搜索"
            />
          </div>
          <div
            role="button"
            class="van-search__action"
            @click="getArticleList"
          >
            <div>搜索</div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-tabs v-model="tab_active">
      <van-tab title="最新"><Pane :datum="latestNews" /></van-tab>
      <van-tab title="车找人"><Pane :datum="findPeople" /></van-tab>
      <van-tab title="人找车"><Pane :datum="findCar" /></van-tab>
      <!-- <van-tab title="车找货"><Pane :datum="findCargo" /></van-tab> -->
      <!-- <van-tab title="货找车"><Pane :datum="findTruck" /></van-tab> -->
    </van-tabs>

    <gp-bottom-tabbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pane from './pane/index.vue'
import { articleList } from '@/api/article.js'
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
      rules: {
        origin: { type: 'string', required: true },
        destination: { type: 'string', required: true }
      },
      latestNews: {
        total: 0,
        page_num: 0,
        page_size: 0,
        rows: [
          // {
          //   id: 1, // 信息id
          //   create_time: 1599573602346, // 此信息创建时间
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
          //   tel: '', // 手机号
          //   seats: '', // 剩余空位数目
          //   remark: '', // 备注
          //   day: '' // 长期的 有效天数
          // }
        ]
      },
      findPeople: {
        total: 0,
        page_num: 0,
        page_size: 0,
        rows: []
      },
      findCar: {
        total: 0,
        page_num: 0,
        page_size: 0,
        rows: []
      },
      findCargo: {
        total: 0,
        page_num: 0,
        page_size: 0,
        rows: []
      },
      findTruck: {
        total: 0,
        page_num: 0,
        page_size: 0,
        rows: []
      }
    }
  },
  computed: {
    ...mapGetters(['login_token'])
  },
  watch: {
    tab_active: {
      handler(nv, ov) {
        this.getArticleList()
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  methods: {
    async getArticleList() {
      var sendForm = this.tab_active ? { type: this.tab_active } : {}
      sendForm = Object.assign(sendForm, this.search)
      const resp = await articleList(sendForm).catch(() => {})

      if (resp && String(resp.code) === '200') {
        var types = [
          'latestNews',
          'findPeople',
          'findCar',
          'findCargo',
          'findTruck'
        ]
        var name = types[this.tab_active]
        this[name] = resp.data
      }
    },

    // 互换出发地与目的地
    onExchangePlace() {
      const { destination, origin } = this.search
      this.search.origin = [destination, (this.search.destination = origin)][0]
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
