import { EventTypes, ITransport,Options,ConstructorType, } from "../typings";
import NetWork from "../utils/network";
// 发送数据或者转换数据给监控后端的类
export default class Transport implements ITransport{
	app_id: string;
	appVersion: string;
	serverDomain: string;
	options: Options;
	network: any;
	constructor({appVersion,app_id,serverDomain,options}: ConstructorType){
		this.appVersion = appVersion;
		this.app_id = app_id;
		this.serverDomain = serverDomain;
		this.options = options;
		this.network = new NetWork(serverDomain)
	}

	// 判断一个请求是否为监控的sdk后端请求
	isSdkTransportUrl(url: string){
		// 后期需要进行优化
		return url.includes(this.serverDomain);
	}

	notify = (eventType: EventTypes, data: any) => {
		const url = this.options.eventHttpRoute(eventType);
		this.network.post(url,{data,...this.getConfig(),eventType});
	}

	getConfig(){
		return {
			appVersion: this.appVersion,
			serverDomain: this.serverDomain,
			app_id: this.app_id
		};
	}
}