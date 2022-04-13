import { EventTypes,ITransport,Plugin } from "../typings";

const fetchPlugin:Plugin<EventTypes,ITransport> = {
	name: EventTypes.fetch,
	monitor(notify){
		monitorFetch.call(this,notify)
	}
}

// 重新设置fetch函数
function monitorFetch(this: ITransport,notify){
	const originFetch:(input: RequestInfo, init?: RequestInit) => Promise<Response> = window.fetch;
	const transportThis = this;
	window.fetch = function (...args){
		const request = Object.assign({},args[1],{
			url:args[0]
		});
		// 判断是否是sdk发起的请求
		const isSdkUrlFlag = transportThis.isSdkTransportUrl(request.url as string)
		console.log('issdk',isSdkUrlFlag,request.url)
		return originFetch.apply(this,args).then(result => {
			if(!isSdkUrlFlag){
				notify(EventTypes.fetch,request,result)
			}
			return result
		}).catch(reason => {
			if(!isSdkUrlFlag){
				notify(EventTypes.fetch,request,reason)
			}
			return reason
		})
	}
}

export default fetchPlugin