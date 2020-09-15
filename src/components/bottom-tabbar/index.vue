
<template>
  <div v-if="visible" class="BottomTabbar">
    <van-tabbar ref="wrap" v-model="tabbar_active" safe-area-inset-bottom>
      <van-tabbar-item icon="home-o" @click="routerPush({ path: '/' })">首页</van-tabbar-item>
      <van-tabbar-item icon="add-o" @click="routerPush({ path: '/publish-news' })">发布</van-tabbar-item>
      <van-tabbar-item icon="friends-o" @click="routerPush({ path: '/publish-news' })">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'BottomTabbar',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tabbar_active: 0
    }
  },
  created() {},
  methods: {
    routerPush(params) {
      this.$router.push({ path: params.path })
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
