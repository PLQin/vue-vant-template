
<template>
  <div class="goods-details">
    <van-nav-bar
      class="nav-bar"
      left-arrow
      fixed
      @click-left="openPrevious"
    />
    <van-swipe :autoplay="3000" class="goods-swipe" @change="swipeChangeHandler">
      <van-swipe-item v-for="item of detail.gallery" :key="item">
        <img
          :src="item"
          class="elem-16"
        >
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ detail.gallery ? detail.gallery.length : 1 }}
        </div>
      </template>
    </van-swipe>
    <div class="price-box">
      <div class="price">
        {{ detail.priceMin }}
        <span class="currency">{{ detail.currency }}</span>
      </div>
    </div>
    <div class="title-box">
      <div class="title">{{ detail.name }}</div>
      <div class="summary">{{ detail.summary }}</div>
    </div>
    <div class="footer-button">
      <van-button round type="danger" @click="onConfirmBuy"> Buy </van-button>
    </div>
  </div>
</template>

<script>
import { detail } from '@/api/goods.js'
export default {
  data() {
    return {
      detail: {},
      current: 0
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 加载数据
    async init() {
      const loading = this.$loading()
      const { gid } = this.$route.query
      if (!gid) {
        this.$router.replace({ name: 'NotFound' })
        return
      }
      const resp = await detail(gid).catch(() => {})
      loading.close()
      this.detail = resp.data
    },

    async openPrevious() {
      this.$router.go(-1)
    },

    async onConfirmBuy() {
      const { gid } = this.$route.query
      if (!gid) return
      this.$router.push({ name: 'OrderConfirm', query: { gid }})
    },

    swipeChangeHandler(index) {
      this.current = index
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>

