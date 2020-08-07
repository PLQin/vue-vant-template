
<template>
  <div id="mijia" class="mijia">
    <div class="box">
      <van-nav-bar
        class="nav-bar"
        :title="$route.meta.title"
        left-text
        right-text
        left-arrow
        @click-left="openPrevious"
      />
    </div>

    <div class="elem-111 elem-115">
      <div class="elem-112">
        <div v-if="!address">
          <van-cell class="elem-116" title="请添加收货地址" is-link @click="editAddress" />
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

    <div
      class="rn-1awozwy rn-6st0mw rn-6koalj rn-1qe8dj5 rn-1mlwlqe rn-18u37iz rn-11ti67c rn-1wtj0ep rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-ga31ov rn-c97pre elem-23"
    >
      <div
        class="rn-1awozwy rn-6koalj rn-1qe8dj5 rn-1mlwlqe rn-18u37iz rn-1jcaaag rn-1wtj0ep rn-1mnahxq rn-p1pxzi rn-2q97c rn-ouo632 rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1lgpqti"
      >
        <div
          class="elem-369 rn-1awozwy rn-1loqt21 rn-6koalj rn-1qe8dj5 rn-1mlwlqe rn-eqz5dr rn-1h3ijdo rn-1777fci rn-1mnahxq rn-61z16t rn-p1pxzi rn-13hce6t rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1otgn73 rn-sr1h2r rn-1lgpqti"
        >
          <div class="elem-369-1">
            <span class="elem-369-tips">Total：</span>
            <span class="elem-369-price">{{ totalPrices }}</span>
            <span class="elem-currency">{{ detail.currency }}</span>
          </div>
        </div>
      </div>

      <div
        class="rn-1awozwy rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-18u37iz rn-1jcaaag rn-1777fci rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-1mdbw0j rn-1xevv56 rn-14s2xll rn-bnwqim rn-1lgpqti"
      >
        <div
          class="rn-1oszu61 rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-18u37iz rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1lgpqti"
        >
          <div
            class="rn-1awozwy rn-15go85j rn-v2x0ok rn-1se7c1 rn-1t4sb3n rn-opq7vk rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-18u37iz rn-1777fci rn-1mnahxq rn-61z16t rn-11wrixw  rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1lgpqti"
          >
            <div
              class="rn-1oszu61 rn-1loqt21 rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-eqz5dr rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1otgn73 rn-1lgpqti"
            >
              <div
                class="rn-1awozwy rn-1t4sb3n rn-1se7c1 rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-eqz5dr rn-1a8msfu rn-1777fci rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-bnwqim rn-1lgpqti"
              >
                <div
                  class="rn-1awozwy rn-1t4sb3n rn-1p0dtai rn-6koalj rn-16y2uox rn-1wbh5a2 rn-1ro0kt6 rn-eqz5dr rn-1a8msfu rn-1777fci rn-1d2f490 rn-1mnahxq rn-61z16t rn-p1pxzi rn-11wrixw rn-ifefl9 rn-bcqeeo rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-u8s1d rn-zchlnj rn-ipm5af rn-1lgpqti elem-27"
                >
                  <div
                    dir="auto"
                    class="submit-order rn-jwli3a rn-1471scf rn-14xgk7a rn-o11vmf rn-ebii48  rn-t9a87b rn-61z16t rn-p1pxzi rn-11wrixw rn-1mnahxq rn-dnmrzs rn-11yh6sk rn-buy8e9 rn-wk8lta rn-9aemit rn-1mdbw0j rn-gy4na3 rn-q4m81j rn-bauka4 rn-1udbk01 rn-3s2u2q rn-qvutc0"
                    @click="onSubmitOrder"
                  >Confirm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataDesensitization } from '@/utils/index.js'
import { detail } from '@/api/goods.js'
import { createOrder } from '@/api/order.js'
import { NavBar, Cell, CellGroup, Card, Toast, AddressList, Stepper } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [AddressList.name]: AddressList,
    [Stepper.name]: Stepper
  },
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
        this.totalPrices = (value * 10000) * this.detail.priceMin / 10000
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
        Toast('no address')
        loading.close()
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
        number: this.stepperValue
      }
      const resp = await createOrder(sendForm).catch(() => {})
      if (resp && !resp.data) Toast(resp.msg)
      loading.close()
      this.$router.replace({ path: '/order/detail', query: { orderSn: resp.data }})
    },

    async openPrevious() {
      this.$router.go(-1)
    },

    onAdd() {
      Toast('新增地址')
    },

    onEdit(item, index) {
      Toast('编辑地址:' + index)
    },

    editAddress() {
      this.$router.push({ path: '/address' })
    }
  }
}
</script>

<style lang="less" scoped src="./index.less"></style>

