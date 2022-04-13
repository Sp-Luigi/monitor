import { EventTypes,ITransport,Plugin } from "../typings";

//  监听unhandlepromise
const promisePlugin:Plugin<EventTypes,ITransport> = {
	name: EventTypes.unhandlePromise,
	monitor(notify){
		// 监听hash模式下的路由的跳转
		window.addEventListener('unhandledrejection',(e) => {
			notify(EventTypes.unhandlePromise,e)
		},true);
	}
}

export default promisePlugin