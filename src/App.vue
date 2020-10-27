
<template>
  <div id="app">
    <router-view class="router" />
  </div>
</template>

<script>
import { set as setLanguage } from '@/utils/language.js'
export default {
  data() {
    return {}
  },
  watch: {
    $route: {
      handler(newVal) {
        const { language } = newVal.query
        if (language) {
          setLanguage(language)
          this.$i18n.locale = language
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {}
}
</script>

<style lang="scss" src='./app.scss'></style>
