import { EventTypes, ITransport, Plugin } from "../typings";
import { replaceOld } from "src/utils";

let lastLocation = ''; //上次页面的route
lastLocation = getLocationFromWindow(); // 默认为获取本模块时的路由

// 修改history对象的pushstate事件
function repalcePushState(history: History,notify: any){
	replaceOld(
		history,'pushState',function (origin){
			return function (...args){
				const from = lastLocation;
				const to = getLastLocation(args);
				lastLocation = to;
				notify(from,to);
				origin.apply(this,args);
			};
		}
	)
}

// 修改replace对象的
function replaceReplaceState(history: History,notify: any){
	replaceOld(
		history,'replaceState',function (origin){
			return function (...args){
				const from = lastLocation;
				const to = getLastLocation(args);
				lastLocation = to;
				notify(from,to);
				origin.apply(this,args);
			};
		}
	)
}

// 监听popstate来获取go,back的行为
function replaceonPopState(notify){
	const originPopState = window.onpopstate;
	window.onpopstate = function (this, event:PopStateEvent){
		const from = lastLocation;
		const to = getLocationFromWindow();
		lastLocation = to;
		notify(from,to);
		originPopState && originPopState.apply(this,[event]);
	}
}

function getLastLocation(...args){
	const historyState = args[0];
	const to = historyState[historyState.length - 1];
	return window.location.origin + to;
}

// 获得调用时的路由
function getLocationFromWindow(){
	return window.location.href;
}

// 代替history事件
function replaceHistory(notify){
	const history = window.history;
	repalcePushState(history,notify);
	replaceReplaceState(history,notify);
	replaceonPopState(notify);
}

// history插件
const historyPlugin:Plugin<EventTypes,ITransport> = {
	name: EventTypes.hisotryChange,
	monitor(notify){
		replaceHistory.call(this,(from,to) => {
			notify(EventTypes.hisotryChange,{
				from,
				to
			})
		})
	}
}

export default historyPlugin