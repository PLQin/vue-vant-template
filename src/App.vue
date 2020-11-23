
<template>
  <div id="app" :class="`app-language-${language}`">
    <router-view class="router" />
  </div>
</template>

<script>
import { set as setLanguage, get as getLanguage } from '@/utils/language.js'
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
          this.$i18n.locale = language
        }

        this.language = getLanguage()
        if (newVal.meta.title) document.title = this.$t(newVal.meta.title)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    console.log(location)
    console.log(`app : ${process.env.VUE_APP_ENV_SIGN || process.env.NODE_ENV}`)
  }
}
</script>

<style lang="scss" src='./app.scss'></style>
