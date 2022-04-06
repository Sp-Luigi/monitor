import { EventTypes, filterHttpUrl, ITransport, Plugin } from "monitor-dom";
import { replaceOld } from "src/utils";
// 内置type，设置MitoXhr对象
type MitoXhr = {
  url: string,        // 请求地址
  method: string,     // 请求的方法
  needFilter?:boolean // 是否过滤
}
// XHR Plugin的对象
const xhrPlugin: Plugin<EventTypes,ITransport> = {
	name: EventTypes.xhr,
	monitor(notify){
		replaceXhr.call(this,notify);
	},
	transform: function (){

  }
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
  const filterFunc = getFilterFunc(this);
  // 修改xhr的open方法
  replaceOld(originXhrProtoType,'open',(originOpen: VoidFunction) => {
    return function (this: MITOXMLHttpRequest, ...args: any[]): void{
      const url = args[1]; // 获得请求的url
      this.mito_xhr = {
        url,
        method: args[0]
      }
      // 由监控平台发出的请求或者设置了需要过滤的请求,设置属性needFilter为true
      const needFliter = filterFunc(this.mito_xhr)
      if(needFliter){
        this.mito_xhr.needFilter = true
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
        if(this.mito_xhr.needFilter){
          return;
        }
        notify(EventTypes.xhr,{
          url: this.mito_xhr.url,
          method: this.mito_xhr.method,
          params: args
        })
      })
      originSend.apply(this,args);
    }
  })
}

function getFilterFunc(transport: ITransport){
  // 获取用户设置的options中的filterutl，如果是数组则赋值,如果不是则为null
  let filterUrlArr = Array.isArray(transport.options.filterHttpUrl) ? transport.options.filterHttpUrl : null
  return function judgeNeedFilter(xhr: MitoXhr){
    // 先判断是否是post请求以及是否为sdk发起的请求
    if(!(xhr.method === 'POST' && transport.isSdkTransportUrl(xhr.url))){
      return false
    }
    if(filterUrlArr){
      return filterUrlArr.some(url => url === xhr.url)
    }else{
      return (transport.options.filterHttpUrl as Function)(xhr.url)
    }
  }
}
export default xhrPlugin