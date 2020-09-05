
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

    <div class="elem-111 elem-115">
      <div class="elem-112">
        <div v-if="!address">
          <van-cell class="elem-116" title="Please add shipping address" is-link @click="editAddress" />
        </div>
        <div v-else>
          <div class="van-address-item">
            <div class="van-cell van-cell--borderless">
              <div class="van-cell__value van-cell__value--alone van-address-item__value">
                <div role="radio" tabindex="0" aria-checked="true" class="van-radio">
                  <div
                    class="van-radio__icon van-radio__icon--round van-radio__icon--checked"
                    style="font-size: 18px;"
                  >
                    <i class="van-icon van-icon-success" />
                  </div>
                  <span class="van-radio__label">
                    <div class="van-address-item__name">
                      {{ address.name }}
                      <span class="van-address-item__tel">{{ dataDesensitization(address.tel) }}</span>
                      <span
                        class="van-tag van-tag--round van-tag--danger van-address-item__tag"
                      >默认</span>
                    </div>
                    <div class="van-address-item__address">{{ `${address.province} ${address.city} ${address.county} ${address.addressDetail}` }}</div>
                  </span>
                </div>
              </div>
              <i class="van-icon van-icon-edit van-address-item__edit" @click="editAddress">
                <!---->
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="elem-111 elem-113">
      <div class="elem-112">
        <div class="elem-114 van-card">
          <div class="van-card__header">
            <a class="van-card__thumb">
              <div class="van-image" style="width: 100%; height: 100%;">
                <img :src="detail.picUrl" class="van-image__img" style="object-fit: cover;">
              </div>
            </a>
            <div class="van-card__content">
              <div>
                <div class="van-card__title van-multi-ellipsis--l2">{{ detail.name }}</div>
                <div class="van-card__desc van-ellipsis">{{ detail.summary }}</div>
              </div>
              <div class="van-card__bottom">
                <div class="van-card__price">
                  <div>
                    <span class="van-card__price-integer">{{ detail.priceMin }}</span>
                    <span class="van-card__price-currency">{{ detail.currency }}</span>
                    <span class="van-card__price-decimal" />
                  </div>
                </div>
                <div class="van-card__num">
                  <van-stepper v-model="stepperValue" theme="round" button-size="18" disable-input />
                </div>
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

    <div class="footer">
      <div class="elem-369-1">
        <span class="elem-369-tips">Total：</span>
        <span class="elem-369-price">{{ totalPrices }}</span>
        <span class="elem-currency">{{ detail.currency }}</span>
      </div>
      <div class="elem-369-2" @click="onSubmitOrder">Confirm</div>
    </div>
  </div>
</template>

<script>
import { dataDesensitization } from '@/utils/index.js'
import NP from 'number-precision'
import { detail } from '@/api/goods.js'
import { createOrder } from '@/api/order.js'
export default {
  data() {
    return {
      detail: {},
      stepperValue: 0,
      totalPrices: 0
    }
  },
  computed: {
    address() {
      return this.$store.getters.address[0]
    }
  },
  watch: {
    stepperValue(value) {
      if (this.detail && this.detail.priceMin) {
        this.totalPrices = NP.times(value, this.detail.priceMin)
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    dataDesensitization,

    // 加载数据
    async init() {
      const loading = this.$loading()
      const { gid } = this.$route.query
      const resp = await detail(gid).catch(() => {})
      loading.close()
      this.detail = resp.data
      this.totalPrices = this.detail.priceMin
    },

    async onSubmitOrder() {
      const address = this.address
      if (!address) {
        this.$toast('no address')
        return
      }
      const { gid } = this.$route.query
      const loading = this.$loading()
      const sendForm = {
        goodsSn: gid,
        consignee: address.name,
        mobile: address.tel,
        address: `${address.province} ${address.city} ${address.county} ${address.addressDetail}`,
        goodsPrice: this.totalPrices,
        currency: this.detail.currency,
        message: '',
        number: this.stepperValue,
        userId: this.$clientId
      }
      const resp = await createOrder(sendForm).catch(() => {})
      if (resp && !resp.data) this.$toast(resp.msg)
      loading.close()
      this.$router.replace({ path: '/order/detail', query: { orderSn: resp.data }})
    },

    async openPrevious() {
      this.$router.go(-1)
    },

    onAdd() {
      this.$toast('新增地址')
    },

    onEdit(item, index) {
      this.$toast('编辑地址:' + index)
    },

    editAddress() {
      this.$router.push({ path: '/address' })
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>

