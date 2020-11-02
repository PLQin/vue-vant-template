
<template>
  <div id="app" :class="`app-language-${language}`">
    <router-view class="router" />
  </div>
</template>

<script>
import { set as setLanguage } from '@/utils/language.js'
export default {
  data() {
    return {
      language: ''
    }
  },
  watch: {
    $route: {
      handler(newVal) {
        const { language } = newVal.query
        if (language) {
          setLanguage(language)
          this.language = language
          this.$i18n.locale = language
        }

        document.title = this.$t(newVal.meta.title)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    console.log('app.vue : dev')
  }
}
</script>

<style lang="scss" src='./app.scss'></style>
