declare module 'monitor-dom'{
	// 路由模式，hash模式则监听hashchange， history则监听h5的内容
	export const enum routeMode = {
		All = 'ALL', // 兼容hash和history模式
		hash = 'HASH', // hash模式
		history = 'HISTORY' // history模式
	}

	// 是否过滤url的数据类型
	export type filterHttpUrl = string[] | ((url: string) => boolean)

	// sdk 的options选项
	export interface Options {
		// 是否使用图片进行监控请求的发送，默认为false
		// 默认使用fetch进行监控sdk的请求发送
		useImage?: boolean,
		// fetch请求时的请求头配置, 当useImage中配置header时会出现warning
		headers?: any,
		// 是否进行xhr请求的监控，默认为true
		moniteXhr?: boolean,
		// 是否进行fetch请求的监控，默认为true
		moniteFetch?: boolean,
		// 是否进行js错误的监控，默认为true
		moniteJsError?: boolean,
		// 是否进行静态资源的监控，默认为true
		moniteStatic?: boolean,
		// 是否监控未处理的promise,默认为true
		moniteUnhandlePromise?: boolean,
		// 是否需要过滤该url的请求
		filterHttpUrl: filterHttpUrl,
	}

	// sdk的事件类型
	export const enum EventTypes {
		jsError = 'JSERROR', // Js报错
		staticError = 'STATICERROR', // 静态资源报错
		dom = 'DOM', // 监听用户的操作
		xhr = 'XHR', //xhr
		fetch = 'FETCH', // fetch
		hashChange = 'HASHCHANGE', //hash模式下的路由跳转监听
		hisotry = 'HISTORY', // history模式下的路由跳转
		custom = 'CUSTOM' // 用户自己的配置的事件
	}
	
	// sdk的plugin
	export interface Plugin<T extends EventTypes = EventTypes, C extends BasicConfig = BasicConfig> {
		// 事件枚举
		name: T
		// 监控事件，并在该事件中用notify通知订阅中心
		monitor: (this: C, notify: (eventName: T, data: any) => void) => void
		// 在monitor中触发数据并将数据传入当前函数，拿到数据做数据格式转换(会将tranform放入Subscrib的handers)
		transform?: (this: C, collectedData: any) => any
	}

	export type useFunc = (plugin: Plugin[]) => void

	// sdk的基础配置
	export interface BasicConfig {
		app_id: string, // 监控的产品id，应该保证唯一性
		appVersion: string, // app版本
		serverDomain: string, // 监控后端的dns
		routeMode: routeMode, // 所属web-application的路由模式，默认为All
		options: Options, // sdk可配置选项
		use: useFunc //初始化插件
	}
}