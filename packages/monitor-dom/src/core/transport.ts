import { ConstructorType, EventTypes, ITransport, Options, routeMode } from "monitor-dom";

// 发送数据或者转换数据给监控后端的类
export default class Transport implements ITransport{
	app_id: string;
	appVersion: string;
	serverDomain: string;
	options: Options;
	constructor({appVersion,app_id,serverDomain,options}: ConstructorType){
		this.appVersion = appVersion;
		this.app_id = app_id;
		this.serverDomain = serverDomain;
		this.options = options;
	}

	isSdkTransportUrl(url: string){
		return false;
	}

	notify(eventType: EventTypes, data: any){
		console.log('eventType', eventType);
		console.log('data',data);
	}

	getConfig(){
		return {
			appVersion: this.appVersion,
			serverDomain: this.serverDomain,
			app_id: this.app_id
		};
	}
}