import { ConstructorType, EventTypes, Plugin, SdkConfig, ITransport }  from "../typings";
import Transport from "./transport";

export default class MonitorWeb implements SdkConfig<EventTypes,ITransport>{
	transport: ITransport;
	constructor(transportConfig: ConstructorType){
		this.transport = new Transport(transportConfig);
	}

	// 执行插件的monitor方法来绑定plugin
	use(plugins: Plugin<EventTypes,ITransport>[]){
		// 绑定plugin的this并且执行其中的monitor方法来进行监控
		plugins.forEach(plugin => {
			plugin.monitor.call(this.transport,this.transport.notify);
		},this);
	}
}