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

	// 判断一个请求是否为监控的sdk后端请求
	isSdkTransportUrl(url: string){
		const ipAddress = url.split('?')[0]; // get请求去掉后面跟随的参数
		const regExp = this.serverDomain.split('').map(str => {
			// 可以转化为数字
			if(+str >= 0){
				return '' + str
			}else{
				return '\\' + str
			}
		}).join('');
		// 正则匹配ip和端口号，存在对应的ip和端口号则需要去除
		return ipAddress.search(new RegExp(regExp,'i')) !== -1
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