import { userConfig, } from './typings';
import MonitorWeb from './core'
import { defaultToOptions, pluginAddByOptions } from './utils';
export default function initMonitorSdk (config: userConfig,customPlugins?: any[]){
	config.options = defaultToOptions(config.options); // 设置config的默认值
  //  校验plugins的可执行性，即是否存在monitor方法并且该方法要是一个函数
  if(Array.isArray(customPlugins) && customPlugins.findIndex(item => typeof item.monitor !== 'function') !== -1){
    throw Error(`plugin'monitor must be a function `)
  }
  // 校验config中的属性
	const plugins = pluginAddByOptions(config.options,config.routeMode);
  Array.isArray(customPlugins) && (plugins.push(...customPlugins))
  const monitorSdk = new MonitorWeb(config);
  monitorSdk.use(plugins);
}
