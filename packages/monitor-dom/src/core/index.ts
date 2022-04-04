import { BasicConfig, ConstructorType, EventTypes, Options, Plugin, routeMode, SdkConfig, ITransport } from "monitor-dom";
import Transport from "./transport";

export default class MonitorWeb implements SdkConfig{
	options: Options;
	plugins: Plugin<EventTypes,ITransport>[];
	transport: ITransport;
	routeMode: routeMode;

	constructor({
		app_id,
		appVersion,
		serverDomain,
		routeMode,
	}: ConstructorType ,options: Options,plugins?: Plugin<EventTypes,ITransport>[]){
		this.options = options;
		this.routeMode = routeMode;
		plugins && (this.plugins = plugins);
		this.transport = new Transport({
			appVersion,
			app_id,
			serverDomain
		});
	}

	// 执行插件的monitor方法来绑定plugin
	use(plugins: Plugin<EventTypes,ITransport>[]){
		// 绑定plugin的this并且执行其中的monitor方法来进行监控
		const combinePlugins = [];
		plugins.every(plugin => {
			plugin.monitor.call(this.transport,this.transport.notify);
		},this)
	}

	// 发送请求到后端的方法以及一些其余的操作
	notify(data){

	}
}