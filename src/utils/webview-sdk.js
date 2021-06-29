/**
 ***********************************
 * H5与原生交互接口
 *
 * @date 二〇二〇年十月十一日 17:48:40
 * @author PLQin <599964870@qq.com>
 ***********************************
 */

function setupWebViewJavascriptBridge(callback) {
	try {
		// eslint-disable-next-line no-undef
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }

		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];

		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe); }, 0);
	} catch (error) {
		//
	}
}
setupWebViewJavascriptBridge(() => {});

/**
 * 代码模版
 *
 * @param null
 * @returns Boolean
 */
export function template(fields, options) {
	var result = {
		'handler': fields,
		'params': {
			'code': 200,
			'message': 'ok',
			'data': {},
		},
	};

	console.log(
		fields + ` request --->  `,
		result
	);

	return new Promise((resolve, reject) => {
		try {
			// android
			if (window.HPBridge) {
				window.HPBridge.send(result, function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			} else {
				// ios
				// eslint-disable-next-line no-undef
				WebViewJavascriptBridge.callHandler(fields, Object.assign({}, result.params), function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			}
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
}

/**
 * 通用函数 (与原生交互)
 *
 * @param {String} fields
 * @param {Object} options
 * @returns Object
 */
export function commonFun(fields, options) {
	var result = {
		'handler': fields,
		'params': Object.assign({}, options),
	};

	console.log(
		fields + ` request --->  `,
		result
	);

	return new Promise((resolve, reject) => {
		try {
			// android
			if (window.HPBridge) {
				window.HPBridge.send(result, function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			} else {
				// ios
				// eslint-disable-next-line no-undef
				WebViewJavascriptBridge.callHandler(fields, Object.assign({}, result.params), function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			}
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
}

/**
 * Photo相片
 * HP04000000	直接拍照
 * HP04000001	从相册选择
 * HP04000002	展开从相册选择或直接拍照菜单
 * HP04000003	读取图片上传进度
 *
 * @param {String} fields
 * @param {Object} options
 * @returns Object
 */
export function choosePhoto(fields, options) {
	var result = {
		'handler': fields,
		'params': Object.assign({
			'upImg': false, // 是否需要上传图片
			'imgEdit': true, // 是否需要编辑（裁剪）图片
			'imgSize': 200, // 回传图片大小，单位：KB, 若该参数为空默认最大：5120（5MB）（回传的图片大小小于等于该值）
			'upImgApiUrl': '', // 上传图片的接口地址, upImg为true时必传, 不传不上传
			'upImgParams': {

			}, // 需上传图片时携带的其他参数
		}, options),
	};

	console.log(
		fields + ` request --->  `,
		result
	);

	return new Promise((resolve, reject) => {
		try {
			// android
			if (window.HPBridge) {
				window.HPBridge.send(result, function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			} else {
				// ios
				// eslint-disable-next-line no-undef
				WebViewJavascriptBridge.callHandler(fields, Object.assign({}, result.params), function(response) {
					console.log(
						fields + ` response --->  `,
						response
					);
					resolve(response);
				});
			}
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
}
