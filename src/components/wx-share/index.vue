
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

<style lang="scss" scoped src="./index.scss"></style>
