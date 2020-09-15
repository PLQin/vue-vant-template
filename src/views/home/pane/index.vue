
<template>
  <div>
    <div v-for="(item,index) in datum.list" :key="index" class="van-coupon">
      <div class="van-card">
        <div class="info van-ellipsis">
          <van-tag v-if="item.isTop === 1" size="medium" type="warning">置顶</van-tag>
          <van-tag v-if="item.isLong === 1" size="medium" type="primary">长期</van-tag>
          <van-tag size="medium" type="primary">
            <template v-if="item.type === 1">车找人</template>
            <template v-else>人找车</template>
          </van-tag>
          <span class="s3">
            <em>{{ item.origin }}</em>
            <i class="to" />
            <em>{{ item.destination }}</em>
          </span>
          <span class="s4">
            （途径：
            <small v-for="(elem,count) in item.pathway" :key="count">
              <i v-if="count !== 0">,</i>
              {{ elem }}
            </small>
            ）
          </span>
        </div>
      </div>
      <div class="van-coupon__content">
        <ul>
          <li>
            <span v-if="item.everyDay === 1">
              <b class="emphasis">每天</b>
              {{ $moment(item.createTime).format('HH:mm:ss') }} 出发
            </span>
            <span v-else>{{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }} 出发</span>
          </li>
          <li class="van-multi-ellipsis--l2">备注：{{ item.remark }}</li>
        </ul>
      </div>
      <div class="van-coupon__description">
        <ul class="van-cd_left">
          <li>
            <span>{{ item.seats }}空位</span>
            <small>{{ $moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</small>
          </li>
        </ul>
        <van-button class="van-cd_right" size="small" plain type="info">拨打电话</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    datum: {
      type: Object,
      default() {
        return {
          total: 0,
          page: 0,
          size: 0,
          list: []
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$toast('返回')
    },
    onClickRight() {
      this.$toast('按钮')
    },
    onChange() {
      this.$toast('onChange')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
