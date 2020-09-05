
<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router" />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: 'van-slide-right'
    }
  },
  created() {
    // 前进后退, 切入切出效果
    // this.$navigation.on('forward', () => {
    //   // 左滑进入
    //   this.transitionName = 'van-slide-right'
    // })
    // this.$navigation.on('back', () => {
    //   // 右滑进入
    //   this.transitionName = 'van-slide-left'
    // })
  }
}
</script>

<style lang="scss" src='./app.scss'></style>
