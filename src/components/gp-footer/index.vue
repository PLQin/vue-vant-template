<template>
  <div class="footer">
    <span>{{ defaultSettings.title }} ©2020</span>
  </div>
</template>

<script>
import defaultSettings from '@/settings.js'
export default {
  name: 'GpFooter',
  props: {},
  data() {
    return {
      defaultSettings
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
