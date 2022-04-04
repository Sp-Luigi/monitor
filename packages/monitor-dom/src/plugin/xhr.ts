import { EventTypes, ITransport, Plugin } from "monitor-dom";
import { replaceOld } from "src/utils";
// 内置type，设置MitoXhr对象
type MitoXhr = {
  url: string,
  method: string,
  isSdkXhr?: boolean
}

const xhrPlugin: Plugin<EventTypes,ITransport> = {
	name: EventTypes.xhr,
	monitor(notify){
		replaceXhr.call(this,notify);
	},
	transform
}
// 封装浏览器中原有的xml对象
interface MITOXMLHttpRequest extends XMLHttpRequest {
  mito_xhr: MitoXhr
}

// 监控xhr的事件来获得接口的调用以及出入参数
function replaceXhr(this: ITransport,notify){
  // 获得xhr的原型对象
  const originXhrProtoType = XMLHttpRequest.prototype;
	const transportThis = this; // 保存transport对象
  // 修改xhr的open方法
  replaceOld(originXhrProtoType,'open',(originOpen: VoidFunction) => {
    return function (this: MITOXMLHttpRequest, ...args: any[]): void{
      const url = args[1]; // 获得请求的url
      if(url === '/api/fetchSomething'){
        console.log('fetchUrl',url)
      }
      this.mito_xhr = {
        url,
        method: args[0]
      }
      // 由监控平台发出的请求,设置属性isSdkXhr为true
      if(this.mito_xhr.method === 'POST' && transportThis.isSdkTransportUrl(url)){
        this.mito_xhr.isSdkXhr = true
      }
      // 用户可以进行选择是否监测所有的接口
      originOpen.apply(this,args)
    }
  });
  // 修改xhr的send方法
  replaceOld(originXhrProtoType,'send', (originSend: VoidFunction) => {
    return function (this,...args){
      this.addEventListener('loadend', function (this: MITOXMLHttpRequest){
        // 由监控sdk发起的请求需要过滤
        if(this.mito_xhr.isSdkXhr){
          return;
        }
        triggerHandlers(EventTypes.XHR,{
          url: this.mito_xhr.url,
          method: this.mito_xhr.method,
          params: args
        })
      })
      originSend.apply(this,args);
    }
  })
}

export default xhrPlugin