<template>
  <div class="order-list">
    <van-nav-bar
      class="nav-bar"
      :title="$route.meta.title"
      left-arrow
      fixed
      placeholder
      @click-left="openPrevious"
    />

    <van-list
      id="van-list"
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="$router.push({name: 'OrderDetail', query: { orderSn: item.orderSn } })"
      >
        <van-row type="flex" justify="space-between">
          <van-col>
            订单号：{{ item.orderSn }}
          </van-col>
          <van-col>
            <van-tag mark type="warning">
              {{ statusMap[item.orderStatus] }}
            </van-tag>
          </van-col>
        </van-row>
        <van-card
          v-for="(good, index2) in item.goods"
          :key="index2"
          :num="good.number"
          :price="good.price + ' ' + item.currency"
          :title="good.goodsName"
          :desc="good.specifications"
          :thumb="good.picUrl"
        />
        <div>
          <van-row type="flex" justify="space-between">
            <van-col>
              {{ $moment(item.createTime).format('YYYY-MM-DD hh:mm:ss') }}
            </van-col>
            <van-col>
              总价：{{ item.orderPrice }} {{ item.currency }}, 实付：{{ item.actualPrice }} {{ item.currency }}
            </van-col>
          </van-row>
        </div>
      </div>
    </van-list>

    <van-empty v-if="!list || list.length === 0" description="No Data" />
  </div>
</template>

<script>
  import { list as orderList } from '@/api/order'
  import { easeout } from '@/utils/index.js'
  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        backTop: 0,
        pageForm: {
          pageNum: 1,
          pageSize: 5,
          total: 0
        },
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
    watch: {
      backTop(value) {
        if (value === 2) {
          const doc = document.body.scrollTop ? document.body : document.documentElement
          easeout(doc.scrollTop, 0, 4, (value) => {
            doc.scrollTop = value
          })
        }
      }
    },
    mounted() {
      document.querySelector('.van-nav-bar__title').addEventListener('click', event => {
        this.backTop++
        setTimeout(() => {
          this.backTop = 0
        }, 500)
      })
    },
    methods: {
      async openPrevious() {
        this.$router.go(-1)
      },

      async onLoad() {
        if (!window.debounce) {
          window.debounce = 1
          this.loading = true
          await orderList(Object.assign({ userId: this.$clientId }, this.pageForm)).then(resp => {
            this.pageForm.pageNum++
            this.loading = false
            this.list.push(...(resp.data.list))
            this.pageForm.total = resp.data.total
            if (!resp.data || !resp.data.length) this.finished = true
          })

          window.debounce = undefined
          this.loading = false
        }
      },

      onRefresh() {
        console.log('onRefresh')
        // 清空列表数据
        this.finished = false
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
      }
    }
  }
</script>

<style lang="scss" scoped src="./index.scss"></style>

