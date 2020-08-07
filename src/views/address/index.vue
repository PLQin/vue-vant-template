
<template>
  <div>
    <div class="box">
      <van-nav-bar
        class="nav-bar"
        :title="$route.meta.title"
        left-text
        right-text
        left-arrow
        @click-left="openPrevious"
      />
    </div>

    <van-address-edit
      :area-list="areaList"
      show-postal
      :address-info="address"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { NavBar, Cell, Toast, AddressEdit } from 'vant'
import areaList from './area.js'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      list: [],
      areaList,
      searchResult: []
    }
  },
  computed: {
    address() {
      return this.$store.getters.address[0]
    }
  },
  methods: {
    async openPrevious() {
      this.$router.go(-1)
    },
    async onSave(data) {
      this.openPrevious()
      this.$store.dispatch('address/set', data)
      Toast('保存成功')
    }
  }
}
</script>

<style lang="less" scoped src="./index.less"></style>
