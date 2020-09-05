<template>
  <div id="mijia" class="mijia">
    <div class="box">
      <van-nav-bar
        class="nav-bar"
        :title="$route.meta.title"
        fixed
        placeholder
        left-arrow
        @click-left="openPrevious"
      />
    </div>

    <div class="elem-111 elem-115 elem-count-down">
      <div class="elem-112">
        <div class="van-cell van-cell--center">
          <div class="van-cell__title">
            <span class="order-status">{{ statusMap[detail.orderStatus] }}</span>
            <div v-if="detail.orderStatus === 101" class="van-cell__label">
              <van-count-down :time="(detail.createTime + 1000*30*60) - Date.now()">
                <template v-slot="timeData">
                  <span class="temaining">Count down</span>
                  <span class="block">{{ 0 }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
          </div>
          <!--
          <div class="van-cell__value">
            <van-button round size="mini" @click="onSubmit">
              <b>Pay</b>
            </van-button>
          </div>
          -->
        </div>
      </div>
    </div>

    <div class="elem-111 elem-115">
      <div class="elem-112">
        <div>
          <div class="van-address-item">
            <div class="van-cell van-cell--borderless">
              <div class="van-cell__value van-cell__value--alone van-address-item__value">
                <div role="radio" tabindex="0" aria-checked="true" class="van-radio">
                  <span class="van-radio__label">
                    <div class="van-address-item__name">
                      {{ detail.consignee }}
                      <span
                        class="van-address-item__tel"
                      >{{ dataDesensitization(detail.mobile) }}</span>
                    </div>
                    <div class="van-address-item__address">{{ detail.address }}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="elem-111 elem-113">
      <div class="elem-112">
        <div v-for="item in detail.goods" :key="item.id" class="elem-114 van-card">
          <div class="van-card__header">
            <a class="van-card__thumb">
              <div class="van-image" style="width: 100%; height: 100%;">
                <img :src="item.picUrl" class="van-image__img" style="object-fit: cover;">
              </div>
            </a>
            <div class="van-card__content">
              <div>
                <div class="van-card__title van-multi-ellipsis--l2">{{ item.goodsName }}</div>
                <div class="van-card__desc van-ellipsis">{{ item.specifications }}</div>
              </div>
              <div class="van-card__bottom">
                <div class="van-card__price">
                  <div>
                    <span class="van-card__price-integer">{{ item.price }}</span>
                    <span class="van-card__price-currency">{{ detail.currency }}</span>
                    <span class="van-card__price-decimal" />
                  </div>
                </div>
                <div class="van-card__num">x {{ item.number }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="elem-111 elem-113 elem-117">
      <div class="elem-112">
        <div class="van-cell">
          <div class="van-cell__title">
            <span>Order No.</span>
          </div>
          <div class="van-cell__value">
            <span>{{ detail.orderSn }}</span>
            <van-button
              v-clipboard:copy="detail.orderSn"
              v-clipboard:success="onCopy"
              class="copy-order-id"
              size="mini"
            >Copy</van-button>
          </div>
        </div>
        <div class="van-cell">
          <div class="van-cell__title">
            <span>Date</span>
          </div>
          <div class="van-cell__value">
            <span>{{ $moment(detail.createTime).format('YYYY-MM-DD hh:mm:ss') }}</span>
          </div>
        </div>
        <div class="van-cell">
          <div class="van-cell__title">
            <span>Delivery</span>
          </div>
          <div class="van-cell__value">
            <span>EMS</span>
          </div>
        </div>
        <div class="van-cell">
          <div class="van-cell__title">
            <span>Freight</span>
          </div>
          <div class="van-cell__value">
            <span>FREE</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-button">
      <van-button
        v-if="detail.orderStatus === 101"
        round
        type="danger"
        @click="onSubmit"
      >Pay {{ detail.orderPrice }} {{ detail.currency }}</van-button>
      <van-button v-else round type="danger" @click="openPrevious">Repurchase</van-button>
    </div>

    <van-dialog v-model="payDialogVisible" style="padding: 10px;" :show-confirm-button="false">
      <a
        :href="qrcode"
        class="van-button van-button--primary van-button--normal van-button--block van-button--round"
      >
        <div class="van-button__content"><span data-v-5f6b1fcf="" class="van-button__text">Pay with Huopay</span>
        </div>
      </a>
      <van-button type="default" block round @click="toDownloadApp">Install Huopay?</van-button>
      <van-button type="default" block round @click="payDialogVisible = false">Cancel</van-button>
    </van-dialog>
  </div>
</template>

<script>
import { dataDesensitization } from '@/utils/index.js'
import { detail } from '@/api/order.js'
import { submit } from '@/api/pay.js'
export default {
  data() {
    return {
      detail: {},
      payDialogVisible: false,
      qrcode: '',
      statusMap: {
        101: 'Waiting for payment',
        102: '用户取消',
        103: 'Timeout',
        201: 'Payment successful',
        202: '已申请退款',
        203: '退款成功',
        301: '已发货',
        401: '已确认收货'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    toDownloadApp() {
      window.open('https://d.gcpspay.com')
    },
    dataDesensitization,

    // 加载数据
    async init(selfCall) {
      const { orderSn } = this.$route.query
      let loading
      if (!orderSn) return
      if (!selfCall) loading = this.$loading()
      const resp = await detail(orderSn).catch(() => {})
      if (!selfCall) loading.close()
      this.detail = resp.data
      setTimeout(this.init, 5000, true)
    },

    async openPrevious() {
      this.$router.go(-1)
    },

    async onSubmit() {
      const loading = this.$loading()
      const { orderSn } = this.$route.query
      const resp = await submit({ orderSn }).catch(() => {})
      loading.close()
      if (resp && resp.data) {
        this.qrcode = `huopay://pay?order_no=${resp.data.payId}&merchant_order_no=${this.detail.orderSn}&status=0&qr_code=${resp.data.qrcode}&scheme=${encodeURIComponent(window.location.href)}`
        console.log('跳转链接：', this.qrcode)
        this.payDialogVisible = true
      } else {
        this.$toast(resp.msg)
      }
    },

    onCopy() {
      this.$toast('Success')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>

