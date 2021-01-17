// 自定义指令 — Vue.js
// https://cn.vuejs.org/v2/guide/custom-directive.html

import Vue from 'vue'

/**
 * ios滚动穿透问题解决指令, eg: <button v-touch-fix />
 */
import touchFix from './touch-fix.js'
Vue.directive('touchFix', touchFix)

