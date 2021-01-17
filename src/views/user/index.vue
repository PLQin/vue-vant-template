<template>
  <div id="mineEntry">
    <div class="user-template">
      <van-sticky>
        <header class="aui-header-default aui-header aui-header-bg gp-nav-bar">
          <a href="javascript: scroll(0, 0)" class="aui-header-item">
            <!--<i class="aui-icon aui-icon-back-white" id="scrollSearchI" style="display:block"></i>-->
            <div id="scrollSearchDiv">
              <img :src="imgs.head" alt>
            </div>
          </a>
          <div class="aui-header-center aui-header-center-clear">
            <div class="aui-header-title">{{ $route.meta.title }}</div>
          </div>
          <a href="#/mine/setting" class="aui-header-item-icon">
            <i class="aui-icon aui-icon-Set" />
          </a>
        </header>
      </van-sticky>

      <section class="aui-me-content">
        <div class="aui-me-content-box">
          <div class="aui-me-content-info" />
          <div class="aui-me-content-list">
            <div class="aui-me-content-item">
              <div class="aui-me-content-item-head">
                <div class="aui-me-content-item-img">
                  <img :src="user_info.headimgurl || imgs.head3" alt>
                </div>
                <div class="aui-me-content-item-title">
                  {{ user_info.nickname || '未登录' }}
                </div>
              </div>
              <div class="aui-me-content-item-text">
                <router-link :to="{ path: '/home', query: {} }" tag="a">
                  <span>0.00</span>
                  <span>钱包</span>
                </router-link>
                <router-link :to="{ path: '/home', query: {} }" tag="a">
                  <span>0</span>
                  <span>积分</span>
                </router-link>
                <router-link :to="{ path: '/home', query: {} }" tag="a">
                  <span>0</span>
                  <span>收藏</span>
                </router-link>
                <router-link :to="{ path: '/home', query: {} }" tag="a">
                  <span>0</span>
                  <span>分享</span>
                </router-link>
              </div>
            </div>
            <div class="aui-me-content-card">
              <h3><i class="aui-icon aui-card-me" />会员</h3>
              <!-- <a href="#/mine/membership">点击查看特权</a> -->
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="gp-h10" />
    <div class="list">
      <van-cell title="我的服务" />
      <ul class="account-item">
        <li>
          <router-link :to="{ path: '/my-car-sharing', query: {} }" tag="div">
            <i class="iconfont icon-yewujieshao-chengjipinche" />
            <div>
              <span>我的拼车</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="gp-h10" />
    <div class="list">
      <van-cell title="平台服务" />
      <ul class="account-item">
        <!--
        <li>
          <router-link :to="{ path: '/sales', query: {} }" tag="div">
            <i class="iconfont icon-wode-lianxikefu" />
            <div>
              <span>联系客服</span>
            </div>
          </router-link>
        </li>
        -->
        <li>
          <router-link :to="{ path: '/agreement/usage', query: {} }" tag="div">
            <i class="iconfont icon-guanyuwomen" />
            <div>
              <span>关于我们</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="gp-h10" />
    <div v-if="false" class="user-template">
      <section class="aui-me-content">
        <section class="aui-grid-content">
          <div class="aui-dri" />
          <div class="aui-recommend">
            <img :src="imgs.icontj3" alt>
            <!--<h2>为你推荐</h2>-->
          </div>
          <section class="aui-list-product">
            <div class="aui-list-product-box">
              <a href="/ui-product.html" class="aui-list-product-item">
                <div class="aui-list-product-item-img">
                  <img :src="imgs.sf15" alt>
                </div>
                <div class="aui-list-product-item-text">
                  <h3>
                    KOBE LETTUCE 秋冬新款
                    女士日系甜美纯色半高领宽松套头毛衣针织衫
                  </h3>
                  <div class="aui-list-product-mes-box">
                    <div>
                      <span class="aui-list-product-item-price">
                        <em>¥</em>
                        399.99
                      </span>
                      <span
                        class="aui-list-product-item-del-price"
                      >¥495.65</span>
                    </div>
                    <div class="aui-comment">986评论</div>
                  </div>
                </div>
              </a>
              <a href="/ui-product.html" class="aui-list-product-item">
                <div class="aui-list-product-item-img">
                  <img :src="imgs.sf14" alt>
                </div>
                <div class="aui-list-product-item-text">
                  <h3>
                    KOBE LETTUCE 秋冬新款
                    女士日系甜美纯色半高领宽松套头毛衣针织衫
                  </h3>
                  <div class="aui-list-product-mes-box">
                    <div>
                      <span class="aui-list-product-item-price">
                        <em>¥</em>
                        399.99
                      </span>
                      <span
                        class="aui-list-product-item-del-price"
                      >¥495.65</span>
                    </div>
                    <div class="aui-comment">986评论</div>
                  </div>
                </div>
              </a>
              <a href="/ui-product.html" class="aui-list-product-item">
                <div class="aui-list-product-item-img">
                  <img :src="imgs.sf13" alt>
                </div>
                <div class="aui-list-product-item-text">
                  <h3>
                    KOBE LETTUCE 秋冬新款
                    女士日系甜美纯色半高领宽松套头毛衣针织衫
                  </h3>
                  <div class="aui-list-product-mes-box">
                    <div>
                      <span class="aui-list-product-item-price">
                        <em>¥</em>
                        399.99
                      </span>
                      <span
                        class="aui-list-product-item-del-price"
                      >¥495.65</span>
                    </div>
                    <div class="aui-comment">986评论</div>
                  </div>
                </div>
              </a>
              <a href="/ui-product.html" class="aui-list-product-item">
                <div class="aui-list-product-item-img">
                  <img :src="imgs.sf12" alt>
                </div>
                <div class="aui-list-product-item-text">
                  <h3>
                    KOBE LETTUCE 秋冬新款
                    女士日系甜美纯色半高领宽松套头毛衣针织衫
                  </h3>
                  <div class="aui-list-product-mes-box">
                    <div>
                      <span class="aui-list-product-item-price">
                        <em>¥</em>
                        399.99
                      </span>
                      <span
                        class="aui-list-product-item-del-price"
                      >¥495.65</span>
                    </div>
                    <div class="aui-comment">986评论</div>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </section>
      </section>
    </div>

    <gp-footer />

    <div class="gp-h50" />
    <div class="gp-h50" />

    <gp-bottom-tabbar />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      imgs: {
        head: require('@/assets/img/mineEntry/head-3.jpg'),
        sf12: require('@/assets/img/mineEntry/sf-12.jpg'),
        sf13: require('@/assets/img/mineEntry/sf-13.jpg'),
        icontj3: require('@/assets/img/mineEntry/icon-tj3.jpg'),
        sf14: require('@/assets/img/mineEntry/sf-14.jpg'),
        sf15: require('@/assets/img/mineEntry/sf-15.jpg'),
        head3: require('@/assets/img/mineEntry/head-3.jpg')
      },
      imgtemplate: require('@/assets/img/template/200307221709.png')
    }
  },
  computed: {
    user_info() {
      return this.$store.state.user.user_info
    }
  },
  created() {},
  methods: {
    goToMyOrder() {
      this.$router.push({ name: 'OrderList' })
    },

    goIntegralDetails() {
      this.$router.push({ name: 'mineBill' })
    },

    goCollect() {
      this.$router.push({ name: 'CollectList' })
    }
  }
}
</script>

<style lang="scss" src='./index.scss'></style>
