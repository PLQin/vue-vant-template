
<template>
  <div v-show="visible" class="share">
    <img class="tips" src="@/assets/common/share.png">
  </div>
</template>

<script>
export default {
  name: 'WxShare',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped src="./index.less"></style>
