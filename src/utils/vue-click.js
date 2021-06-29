import Vue from 'vue';

/**
 * `@click` 事件防抖/节流
 * https://forum.vuejs.org/t/vue-click-debounce/64492/5
 */
(function() {
	var on = Vue.prototype.$on;
	Vue.prototype.$on = function(event, func) {
		var previous = -1;
		var newFunc = func;

		// 含括callback是因为一些子组件的 click 会执行 $emit('callback')
		if (['click', 'click-right', 'callback'].includes(event)) {
			newFunc = function() {
				const now = new Date().getTime();
				if (previous + 1500 <= now) {
					func.apply(this, arguments);
					previous = now;
				}
			};
		}

		on.call(this, event, newFunc);
	};
})();
