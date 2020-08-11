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

<style lang="less">
.zj-loading {
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
