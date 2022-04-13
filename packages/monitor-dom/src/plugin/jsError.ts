import { EventTypes,ITransport,Plugin } from "../typings";

const jsErrorPlugin:Plugin<EventTypes,ITransport> = {
	name: EventTypes.jsError,
	monitor(notify){
	// 简单的错误上报
  // 只有在捕获阶段，windows.error才会触发由于静态资源的错误
	window.addEventListener('error', (e: any) => {
  	// 传递错误信息的文件名等信息即可，和浏览器有关的信息在请求头中就可以获取
  	if(e instanceof ErrorEvent){
			const error: any = {}
			error.message = e.error.message;
    	error.stack = e.error.stack;
    	// JS错误捕获
    	notify(EventTypes.jsError,error);
  	}else{
			const error:any = {}
			error.src = e.target.currentSrc
			error.nodeType = e.target.nodeName.toLowerCase()
			error.currentUrl = e.target.baseURI
    	// 静态资源获取错误捕获
    	notify(EventTypes.staticError,error);
  	}},true);
	}
}
export default jsErrorPlugin