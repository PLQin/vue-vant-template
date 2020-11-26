
<template>
  <div id="app" :class="`device-${device} app-language-${language}`">
    <router-view class="router" />
  </div>
</template>

<script>
import { set as setLanguage, get as getLanguage } from '@/utils/language.js'
import { isWeixin, getDevice } from '@/utils/index.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      language: '',
      device: isWeixin() ? 'weixin' : getDevice()
    }
  },
  computed: {
    ...mapGetters(['openid'])
  },
  watch: {
    $route: {
      handler(newVal) {
        if (!localStorage.openid && newVal.path !== '/') {
          this.$toast('请先登录')
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 0)
        }

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

<style lang="scss" src='./app.scss' ></style>
<style lang="scss" src='@/style/weixin.scss' ></style>
<style lang="scss" src='@/style/ios.scss' ></style>
<style lang="scss" src='@/style/android.scss' ></style>
