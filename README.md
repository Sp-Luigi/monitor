# monitor-dom
[简体中文](https://github.com/Sp-Luigi/monitor/README.cn.md)
## 👋 Feature
* monitor xhr ✅
* monitor fetch ✅
* monitor route change(hashRoute, historyRoute) ✅
* monitor code error, resource load error ✅
* monitor unhanlde Rejected promise ✅
* monitor custom transfer data 🔨

## 😎 Get Started

### 🛠️ Install
```js
# using npm
npm i monitor-dom
# using yarn
yarn add monitor-dom
```
### 🥳 Usage
```js
import initMonitorSdk from 'monitor-dom'
initMonitorSdk({
	serverDomain: your server ip ,
  appVersion: your current appVersion ,
  app_id: application id(a unique string),
  options: your options for this sdk
})
```
#### ⚙️ options

| Property    | Description | Type          |  Default   |
| :---:       |    :----:   |    :---:      |    :---:   |
| moniteXhr   | if monite application's xhr  | boolean   |     true     |
| moniteFetch   | if monite application's fetch  | boolean   |     true     |
| moniteJsError   |if  monite application's code error  | boolean   |     true     |
| moniteUnhandlePromise   | if monite application's unhandlePromise  | boolean   |     true     |
| filterHttpUrl   | filter URL to without monitor  | (url) => boolean   |   () => true   |
| eventHttpRoute   | The routing path is mapped to the back end through events| (eventType: number) => string   |   () => 'monitor'   |