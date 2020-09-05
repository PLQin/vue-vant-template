
<template>
  <div id="app">
    <div class="my-order" @click="goMyOrder">
      <span>My Orders</span>
    </div>
    <div>
      <div class="rax-scrollview elem-1">
        <div class="elem-2">
          <!-- empty -->
          <div class="elem-3">
            <img src="@/assets/home/nav.jpg" class="elem-5">
            <!-- empty -->
          </div>
          <div id="item-list" class="item-list">
            <div v-for="(item, index) in list" :key="index" class="item-content">
              <div class="item-box" data-id="item-box" @click="openDeatil(item)">
                <div class="elem-7">
                  <div class="item-img">
                    <img :src="item.picUrl" class>
                  </div>
                  <div class="commodity-tips">
                    <img :src="require(`@/assets/goods-ranking/${index+1}.png`)" class="elem-8">
                  </div>
                  <div class="elem-9">
                    <span class="commodity-name">{{ item.name }}</span>
                    <div class="elem-10">
                      <span class="elem-11">{{ item.summary }}</span>
                    </div>
                  </div>
                  <div class="elem-17">
                    <p class="elem-18">
                      <span class="elem-19" />
                      <span class="elem-20">{{ item.priceMin }}</span>
                      <span class="elem-currency">{{ item.currency }}</span>
                      <span class="elem-21">¥{{ item.marketPrice }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!--
              # 前三个商品与后面的商品背景色不同
            <div class="item-content">
              <div class="item-box" data-id="item-box">
                <div class="item-card">
                  <div class="item-img">
                    <img :src="require(`@/assets/goods-ranking/1.png`)">
                  </div>
                  <div class="commodity-tips">
                    <img :src="require(`@/assets/goods-ranking/1.png`)" class="elem-8">
                  </div>
                  <div class="elem-9">
                    <span class="commodity-name">【单件包邮】8H Softcool凉感抗菌床笠三件套</span>
                    <div class="elem-10">
                      <span class="elem-11">凉而不冰，透气抗菌，既是柔软凉席又是抗菌床笠</span>
                    </div>
                    <div class="elem-12">
                      <div class="elem-25">
                        <div class="elem-14">
                          <img :src="require(`@/assets/goods-ranking/1.png`)" class="elem-15">
                        </div>
                        <span class="elem-16">家纺</span>
                      </div>
                    </div>
                  </div>
                  <div class="elem-17">
                    <p class="elem-18">
                      <span class="elem-19">¥</span>,
                      <span class="elem-20">65</span>,
                      <span class="elem-26">起</span>
                      <span class="elem-21">79</span>
                    </p>
                  </div>
                  <div class="elem-22">
                    <div class="elem-23">
                      <span class="elem-24">特价</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>

    <wx-share :visible.sync="showWxShare" />
  </div>
</template>

<script>
import { list } from '@/api/goods.js'
import { isWeixin } from '@/utils/index.js'
export default {
  data() {
    return {
      showWxShare: false,
      list: []
    }
  },
  computed: {},
  created() {
    if (isWeixin()) this.showWxShare = true
    this.init()
  },
  methods: {
    // 加载数据
    async init() {
      const loading = this.$loading()
      const resp = await list().catch(() => {})
      loading.close()
      this.list = resp.data
    },

    async openDeatil(row) {
      this.$router.push({ name: 'GoodsDetail', query: { gid: row.gid }})
    },

    goMyOrder() {
      this.$router.push({ name: 'OrderList' })
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
