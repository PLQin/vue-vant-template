
/**
 * Usage :
 *	import { EventBus } from '@/utils/bus.js';
 *	EventBus.$emit('control-editing', true, 'add');
 *	EventBus.$on('control-editing', (editing, type) => {
 *		// codeing
 *	});
 */

import Vue from 'vue';
export const EventBus = new Vue();
