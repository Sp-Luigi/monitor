// 工具函数

import promisePlugin from "src/plugin/promise";
import { Options,Plugin,EventTypes,ITransport, routeMode } from "src/typings";
import {fetchPlugin,xhrPlugin,jsErrorPlugin,historyPlugin,hashPlugin,} from '../plugin'

/**
 * 
 * @param source 源对象
 * @param name 修改的属性名
 * @param replacement 修改的函数
 * @returns 
 */
 export function replaceOld(
  source: {
    [key: string] : any
  },
  name: string,
  replacement: (...args: any[]) => any
): void {
  // 如果源对象中不存在该属性则返回
  if(! (name in source)) return;
  const original = source[name]; // 将原来的值传入
  const wrapped = replacement(original); // 作为
  if(typeof wrapped === 'function'){
    source[name] = wrapped;
  }
};


function isUndefined (val){
  return typeof val === 'undefined'
}

function isNull (val) {
  return  Object.toString.call(val) === '[object Null]'
}

export function defaultToOptions(options: Options): any{
  const defaultOptions: Omit<Options,'eventHttpRoute'> = {
    moniteFetch: true,
    moniteJsError: true,
    moniteUnhandlePromise:true,
    moniteXhr: true,
    moniteRoute: true
  }
  const config = Object.keys(options).reduce((config,prop) => {
    if(isNull(options[prop]) || isUndefined(options[prop])){
      config[prop] = defaultOptions[prop];
    }
    return config
  },{});
  return config
}

// 路由插件添加
function addRoutePlugin(condition: boolean,routeMode:routeMode,plugins:Plugin<EventTypes,ITransport>[]): void{
  if(!condition) return
  // 根据routeMode进行使用
  switch(routeMode){
    case 'Hash': {
      plugins.push(hashPlugin);
      break;
    }
    case 'History': {
      plugins.push(historyPlugin);
      break;
    }
    default: {
      plugins.push(hashPlugin,historyPlugin);
    }
  }
}

// 根据options返回的对应的监控的基础插件
export function pluginAddByOptions(options: Options,routeMode: routeMode):Plugin<EventTypes,ITransport>[] {
  const plugins: Plugin<EventTypes,ITransport>[] = [];
  // 根据option判断是否需要添加plugin
  function addPluginByCondition(condition: boolean, plugin: Plugin<EventTypes,ITransport>): void{
    condition && (plugins.push(plugin))
  }
  addRoutePlugin(options.moniteRoute,routeMode,plugins);
  addPluginByCondition(options.moniteFetch,fetchPlugin);
  addPluginByCondition(options.moniteJsError,jsErrorPlugin);
  addPluginByCondition(options.moniteUnhandlePromise,promisePlugin);
  addPluginByCondition(options.moniteXhr,xhrPlugin);
  return plugins;
}