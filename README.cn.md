# monitor-dom
## 👋 特性
* 监控xhr ✅
* 监控fetch ✅
* 监控路由(hash模式,history模式) ✅
* 监控js错误以及静态资源报错 ✅
* 监控未处理的promise ✅
* 自定义监控上传数据 🔨

## 😎 开始

### 🛠️ 安装
```js
# using npm
npm i monitor-dom
# using yarn
yarn add monitor-dom
```
### 🥳 使用
```js
import initMonitorSdk from 'monitor-dom'
initMonitorSdk({
	serverDomain: 你的后端服务的地址,
  appVersion: 当前web程序的版本 ,
  app_id: web程序的id(唯一标识),
  options: sdk中提供的选项
})
```
#### ⚙️ 选项

| 属性    | 说明 | 类型          |  默认值   |
| :---:       |    :----:   |    :---:      |    :---:   |
| moniteXhr   | 是否监控xhr  | boolean   |     true     |
| moniteFetch   | 是否监控fetch  | boolean   |     true     |
| moniteJsError   | 是否监控js错误 | boolean   |     true     |
| moniteUnhandlePromise   | 是否监控未处理promise  | boolean   |     true     |
| filterHttpUrl   | 不进行监控的请求  | (url) => boolean   |   () => true   |
| eventHttpRoute   | 每个监控映射到的后端的路由地址 | (eventType: number) => string   |   () => 'monitor'   |