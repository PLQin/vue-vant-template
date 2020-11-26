
<template>
  <div>
    <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- <van-notice-bar wrapable left-icon="volume-o" :scrollable="false" text="您的发布次数已用完，需付费发布信息" /> -->

    <van-notice-bar
      left-icon="volume-o"
      wrapable
      :scrollable="false"
      text="免责声明：本平台不提供任何形式担保。点我查看用户协议与拼车详细说明。"
      @click="$router.push({ path: '/user-agreement' })"
    />

    <div class="interval" />
    <van-tabs v-model="form.is_long">
      <van-tab name="1" title="短期拼车" />
      <van-tab name="2" title="长期拼车" />
    </van-tabs>
    <div v-show="form.is_long == 2" class="van-card long-hint">
      <span>有效期内信息永不过期，每天自动刷新，获得专属标识</span>
      <van-tag type="primary" size="medium">长期</van-tag>
    </div>

    <ShortPeriod v-show="form.is_long == 1" :datum="{config, form}" desc="短期拼车" />
    <LongPeriod v-show="form.is_long == 2" :datum="{config, form}" desc="长期拼车" />

    <div class="interval" />
    <van-cell-group class="please-agree-user-agreement">
      <p>
        <van-checkbox v-model="agree_user_agreement" icon-size="16px">
          <div>
            我已阅读并同意
            <span
              class="active"
              @click.stop="$router.push({ path: '/user-agreement' })"
            >《拼车平台说明》</span>
          </div>
        </van-checkbox>
      </p>
    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="info" @click="onSubmit">立即发布</van-button>
    </div>

    <div class="open-floor" />
  </div>
</template>

<script>
import Schema from 'async-validator'
import { mapGetters } from 'vuex'
import { articleAdd } from '@/api/article.js'
import ShortPeriod from './short-period/index.vue'
import LongPeriod from './long-period/index.vue'
export default {
  components: {
    ShortPeriod,
    LongPeriod
  },
  data() {
    return {
      agree_user_agreement: false, // 是否同意协议, false/true
      date: {
        show: false,
        currentDate: new Date()
      },
      config: {
        type: {
          show: false,
          columns: ['车找人', '人找车']
        },
        days: {
          show: false,
          columns: [7, 30, 90, 180]
        }
      },
      form: {
        is_top: 2, // 是否置顶， 1置顶， 2不置顶
        is_long: 1, // 是否长期(长期默认每天都会发车)， 1短期， 2长期
        type: '人找车', // 发布类型, 1为车找人， 2为人找车
        origin: '', // 起点, 出发地
        destination: '', // 终点, 目的地
        pathway: '', // 途径地
        once_departure_time: '', // 短期则匹配本次发车时间(出发时间)
        days_departure_time: '', // 长期则屁匹配每日发车时间(出发时间)
        phone: '', // 联系电话
        seats: '', // 空位数目
        remark: '', // 备注，更多描述
        day: 7 // 长期的 有效天数, default: 7
      },
      rules: {
        agree_user_agreement: {
          type: 'boolean',
          required: true,
          validator: (rule, value) => value,
          message: '请阅读并同意拼车平台说明'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  created() {
    // TODO : 整合到一起
    if (!localStorage.openid) {
      this.$toast('请先登录')
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 0)
      return
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async onSubmit() {
      const validator = new Schema(this.rules)
      let passed = false
      validator.validate(
        Object.assign({}, this.form, {
          agree_user_agreement: this.agree_user_agreement
        }),
        (errors, fields) => {
          if (errors) {
            this.$toast(errors[0].message)
            return
          }
          passed = true
        }
      )
      if (!passed) return

      const sendForm = Object.assign({}, this.form, {
        type: this.form.type === '人找车' ? 2 : 1
      })
      const resp = await articleAdd(sendForm).catch(() => {})
      if (resp && resp.code === 200) {
        this.$toast('成功')
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 1200)
      }
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
