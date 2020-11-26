<template>
  <van-overlay :show="loading" class="zj-loading">
    <van-loading />
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="scss">
.zj-loading {
  z-index: 1000;
  text-align: center;
  .van-loading{
    top: 40%;
  }
}
</style>
