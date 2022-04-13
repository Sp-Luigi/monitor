interface INetWork {
	basicUrl: string
}
// 使用xhr封装的发送网络请求的方法
export default class NetWork implements INetWork {
	basicUrl: string
	constructor(basicUrl: string){
		// 保存basic url的路径
		this.basicUrl = basicUrl;
	}

	post(url: string,data: any){
		const completeUrl = this.basicUrl + url; //完整的url路径
		window.fetch ? this.sendByFetch(completeUrl,data) : this.sendByXHR(completeUrl,data)
	}

	sendByXHR(url: string, data: any){
		const xhr = new XMLHttpRequest();
		xhr.open('POST',url);
		xhr.setRequestHeader("content-type","application/json");
		xhr.send(JSON.stringify(data));
	}

	sendByFetch(url: string, data: any){
		console.log('data,',data)
		window.fetch(url,{
			method:'post',
			body: JSON.stringify(data),
			keepalive: true
		},);
	}
}