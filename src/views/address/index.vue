
<template>
  <div>
    <div class="box">
      <van-nav-bar
        :title="$route.meta.title"
        class="nav-bar"
        left-arrow
        safe-area-inset-top
        @click-left="goBack"
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
import areaList from './area.js'
export default {
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
    async goBack() {
      const { query } = this.$route
      if (query.redirect) {
        this.$router.replace(query.redirect)
      } else {
        this.$router.go(-1)
      }
    },
    async onSave(data) {
      this.goBack()
      this.$store.dispatch('address/set', data)
      this.$toast('Success')
    }
  }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>
