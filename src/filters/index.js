// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils';

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
	if (time === 1) {
		return time + label;
	}
	return time + label + 's';
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time);
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute');
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour');
	} else {
		return pluralize(~~(between / 86400), ' day');
	}
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
	const si = [
		{ value: 1E18, symbol: 'E' },
		{ value: 1E15, symbol: 'P' },
		{ value: 1E12, symbol: 'T' },
		{ value: 1E9, symbol: 'G' },
		{ value: 1E6, symbol: 'M' },
		{ value: 1E3, symbol: 'k' }
	];
	for (let i = 0; i < si.length; i++) {
		if (num >= si[i].value) {
			return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
		}
	}
	return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
	return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * data mask and privacy
 * @param {String} param
 */
export function dataPrivacy(param) {
	var data = param;
	// 正则判断返回相应数据
	if (/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(data) || /^(13[0-9]|16[0-9]|19[0-9]|147|15[0-9]|17[6-8]|18[0-9])\d{8}|17[0-9]\d{8}$/.test(data) || /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(data)) {
		// 身份证号 || 手机号  ||  营业执照    前三后四
		// data = data.substr(0, 3) + '****' + data.substr(-4)
		data = '*******' + data.substr(-4);
	} else if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(data)) {
		// 邮箱号码  前二 后以 @ 分割
		data = data.substr(0, 2) + '****' + data.substr(data.indexOf('@'));
	} else if (/^\d{16}|\d{19}$/.test(data)) {
		// 银行卡号  后四位
		data = '****' + data.substr(-4);
	} else if (data.indexOf('公司') > -1) {
		// 企业名称  前二后四
		data = data.substr(0, 2) + '****' + data.substr(-4);
	} else {
		return;
	}

	return data;
}
