import { EventTypes, ITransport, Plugin } from "../typings"


const hashPlugin:Plugin<EventTypes,ITransport> = {
	name: EventTypes.hashChange,
	monitor(notify){
		// 监听hash模式下的路由的跳转
		window.addEventListener('hashchange',(e) => {
			const information: any = {};
			information.to = e.newURL
			information.from = e.oldURL
			notify(EventTypes.hashChange,information)
		},true);
	}
}
export default hashPlugin