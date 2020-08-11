
<template>
  <div id="app" class="iframe-content">
    <div class="my-order" @click="goMyOrder">
      <span>My Orders</span>
    </div>
    <div class="elem-0">
      <div
        scrolleventthrottle="100"
        offsetaccuracy="10"
        horizontal="false"
        showshorizontalscrollindicator="false"
        showsverticalscrollindicator="false"
        class="rax-scrollview elem-1"
      >
        <div class="elem-2">
          <!-- empty -->
          <div class="elem-3">
            <div class="elem-4">
              <img src="@/assets/home/nav.jpg" class="elem-5">
              <!-- empty -->
            </div>
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
                    <!--
                    <div class="elem-12">
                      <div class="elem-13">
                        <div class="elem-14">
                          <img src="@/assets/home/f0206f283a0cc4ecf5706ac011357b4e.png" class="elem-15">
                        </div>
                        <span class="elem-16">家用电器</span>
                      </div>
                    </div>
                    -->
                  </div>
                  <div class="elem-17">
                    <p class="elem-18">
                      <span class="elem-19" />
                      <span class="elem-20">{{ item.priceMin }}</span>
                      <span class="elem-currency">{{ item.currency }}</span>
                      <!-- <span class="elem-21">¥{{ item.marketPrice }}</span> -->
                    </p>
                  </div>
                  <!--
                  <div class="elem-22">
                    <div class="elem-23">
                      <span class="elem-24">特价</span>
                    </div>
                  </div>
                  -->
                </div>
              </div>
            </div>

            <!--
              # 前三个商品与后面的商品背景色不同
            <div class="item-content">
              <div class="item-box" data-id="item-box">
                <div class="item-card">
                  <div class="item-img">
                    <img src="@/assets/home/4b8ae4fc7b61b7cfe87997325316ebbe.png" class>
                  </div>
                  <div class="commodity-tips">
                    <img src="@/assets/home/2a1091c04fec8f74e4bb2b2636e885ef.png" class="elem-8">
                  </div>
                  <div class="elem-9">
                    <span class="commodity-name">【单件包邮】8H Softcool凉感抗菌床笠三件套</span>
                    <div class="elem-10">
                      <span class="elem-11">凉而不冰，透气抗菌，既是柔软凉席又是抗菌床笠</span>
                    </div>
                    <div class="elem-12">
                      <div class="elem-25">
                        <div class="elem-14">
                          <img src="@/assets/home/153c2cec463aa91f8cf008d71e303e35.png" class="elem-15">
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

<style lang="less" scoped src="./index.less"></style>
