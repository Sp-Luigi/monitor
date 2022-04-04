import { BasicConfig, EventTypes, Options, Plugin, routeMode } from "monitor-dom";

export default class MonitorWeb implements BasicConfig{
	app_id: string;
	appVersion: string;
	options: Options;
	serverDomain: string;
	plugin: Plugin<EventTypes, BasicConfig>[];
	routeMode: routeMode;

	constructor({
		app_id,
		appVersion,
		serverDomain,
		routeMode
	}: BasicConfig ,options: Options){
		this.appVersion = appVersion;
		this.app_id = app_id;
		this.options = options;
		this.serverDomain = serverDomain;
		this.routeMode = routeMode;
	}

	// 执行插件的monitor方法来绑定plugin
	use(plugins: Plugin<EventTypes,BasicConfig>[]){
		// 绑定plugin的this并且执行其中的monitor方法来进行监控
		plugins.every((plugin) => {
			plugin.monitor()
		},this);
	}

	// 发送请求到后端的方法以及一些其余的操作
	notify(data){

	}
}