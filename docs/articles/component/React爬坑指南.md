---
title: 'React爬坑指南'
description: 'Deeruby: 用于记录在使用React中遇到的问题或者使用过程中的一些封装，包括项目前期准备，antd更换主题色，路由鉴权，接口拦截等'
date: '2019-06-01'
updated: '2020-06-26'
meta:
- name: keywords
  content: 前端、博客、deeruby、Deeruby、deeruby.com、yijun、yijun's blog、项目前期准备、antd更换主题色，路由鉴权，接口拦截、更改默认端口号、插件TS报错、配置绝对路径、React基础、React入门指南
---

# React爬坑指南

> 用于记录在使用React中遇到的问题或者使用过程中的一些封装，吐槽一下，加上TS，不熟悉的话真是一步一个坑。

<div style="text-align: center;">
  <img src="./../assets/tremble.jpg" alt="萌新瑟瑟发抖">
</div>

## 构建项目问题

### 更改默认端口号

这里仅提供一种我使用的方法，其他方法有待大家自己去探寻

全局安装 `cross-env -> npm install cross-env -g` 然后在package.json中配置如下：

```js
"scripts": {
    "start": "cross-env PORT=5000 react-scripts start"
}
```

此时默认端口号成功改为了5000

### 插件TS报错

问题描述：引入 typescript 后，安装各种插件，ts语法检查报错。

举例说明：这里我们以 react-router-dom 为例，说下这种情况该如何处理。

解释说明：每一个支持ts的引入插件，都有一个 @types/xxx 的包，需要安装相关依赖才能正常在 ts 模式下使用，比如上述例子需要安装 `yarn add @types/react-router-dom -D` 才能正常使用

更改`index.tsx`代码如下：

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

更改为：

```js
import Route from './router/index';
const render = (Component: any) => {
  ReactDOM.render(
      <Component />, 
      document.getElementById('root') as HTMLElement
  )
}
render(Route)
```

### 配置绝对路径

配置 `tsconfig.json`，增加：

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

## antd配置主题色

### 问题说明

<span style="color: #999">这里直接改webpack就可以了，可以不像我这样引入插件做，因为当时遇到了一个坑，就引入了插件（引入坑依旧在），改好了之后就直接用的这种方式没在改回去，以下是具体实现：</span>

遇到的问题：addLessLoader 里必须要包一层 lessOptions，否则报错

### 前期准备

> yarn add antd react-app-rewired customize-cra babel-plugin-import less less-loader

### 具体操作

更改`package.json`文件

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
}
```

在根目录下创建一个`config-overrides.js`的文件

```js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true  // 这里一定要写true，css和less都不行哦
    }),
    addLessLoader({
        // 必须要包一层lessOptions，否则报错
        lessOptions: {
            javascriptEnabled: true,
            // 更改主题
            modifyVars: { '@primary-color': '#1DA57A' }
        }
    })
)
```

### 推荐实现

用 `yarn run eject` 打开webpack的控制权，然后在less-loader中进行配置，配置方法和上述大体一致，这样就无需引入插件了

## 路由鉴权

### 前期准备

> yarn add react-router-config react-router-dom

`Typescript` 环境请安装下面两个依赖

> yarn add @types/react-router-config @types/react-router-dom

### 常规使用

<span style="color: #FF6600;">router.tsx</span>

```js
import React from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Redirect } from "react-router-dom";

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/page1", component: Page1 },
  {
    path: "/page2",
    component: Page2,
    routes: [
      {
        path: "/page-child",
        component: PageChild
      }
    ]
  }
];

export default class RouteConfig extends Component {
  render() {
    return (
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    )
  }
}
```

### 鉴权实现

<span style="color: #999">
  需要做路由鉴权，不是登录态时候，页面需跳转登录页面。所以我们对 renderRoutes 进行重写。renderRoutes 实际上就是对 routes 数组进行 map 处理。那实现思路则是维护一个 routes 数组，基本参数则正常传入，特殊处理则在 render 中进行处理。
</span>

路由相关参数：

参数 | 类型 | 描述
:--- | ---: | ---:
path | String | 路由路径
exact | Boolean | 区分唯一路由，设置场景 -> 父路由
strict | Boolean | 区分结尾斜杠，无需设置
***

具体实现代码：

<span style="color: #FF6600;">router.tsx</span>

```js
import HomePage from 'pages/Home';
import LoginPage from 'pages/User/Login';
import RegisterPage from 'pages/User/Register';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    requiresAuth: true
  },
  {
    path: "/login",
    component: LoginPage,
    requiresAuth: false
  },
  {
    path: "/register",
    component: RegisterPage,
    requiresAuth: false
  }
];

export default routes
```

<span style="color: #FF6600;">renderRoutes.tsx</span>

```js
import React from "react";
import { Switch, Route, Redirect } from "react-router";

/**
 * 将路由配置渲染成节点
 * @param {Array} routes switch路由列表
 * @param {Boolean} authed 当前账号权限,不传则可以访问该routes列表的所有路由
 * @param {Object} extraProps 添加额外的Route props
 * @param {Object} switchProps Switch props
 */
function renderRoutes(routes: Array<any>, authed: boolean, extraProps = {}, switchProps = {}) {
  let list = [];
  const mapFunc = (R: Array<any>) =>
    R.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          if (!route.requiresAuth || authed) {
            return route.render
              ? route.render({ ...props, ...extraProps, route: route })
              : route.component && <route.component {...props} {...extraProps} route={route} />;
          } else {
            return <Redirect to={{ pathname: "/login" }} />;
          }
        }}
      />
    ));

  if (routes) {
    list.push(
      <Switch {...switchProps} key="SwitchRoutes">
        {mapFunc(routes)}
      </Switch>
    );
    return list;
  }
}

export default renderRoutes;
```

<span style="color: #FF6600;">index.tsx</span>

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from "react-router-dom";
import router from 'router/index';
import renderRoutes from 'router/renderRoutes';

// renderRoutes(router, false) 第二个参数 authed 为变量，用于判定是否为登录态
const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        { renderRoutes(router, false) }
      </Switch>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
  )
}
render();

```

#### 🔗参考链接

[react-router-config使用与路由鉴权](https://juejin.im/post/5e396af66fb9a07cd323c40d)

## 接口拦截

### 前期准备

> yarn add axios

### 任务细化

创建三个文件，一个文件做请求拦截，这里监听接口 cancel 的状态及处理接口的统一报错，如 401、403、500等，或者协定的特殊code码的处理，更换session_id等操作。一个文件用来维护接口地址及接口名称。一个文件用来写接口。具体如下：

<span style="color: #FF6600;">server.tsx</span>

```js
import axios from 'axios';

let CancelToken = axios.CancelToken

axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

axios.interceptors.request.use(config => {
  let requestName = ''
  if (config.data) {
    requestName = config.data.requestName 
  }
  if (config.params) {
    requestName = config.params.requestName
  }
  
  if (requestName) {
    if (axios[requestName] && axios[requestName].cancel) {
      axios[requestName].cancel()
    }
    config.cancelToken = new CancelToken(c => {
        axios[requestName] = {}
        axios[requestName].cancel = c
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const res = response.data
      if (res.code === 401 || res.code === 403) {
        window.location.href = "/login"
        return
      } else {
        return response.data
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios

```

<span style="color: #FF6600;">config.tsx</span>

```js
const HISTORY= 'http://118.31.57.194:56971/';

const URL = {
  // 登录
  login: HISTORY + 'user/login',

  // 注册
  register: HISTORY + 'user/register'
}

export default URL
```

<span style="color: #FF6600;">api.tsx</span>

<span style="color: 999;">这里注意 typescript 要定义接口注明类型</span>

```js
import $axios from './server';
import baseUrl from './config';

type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

interface interfaceObj {
  url: string,
  method: Method,
  dataType: string,
  contentType: string,
  params: any
}

export function login(params: any) {
  let obj: interfaceObj = {
    url: baseUrl.login,
    method: "post",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    params: params
  }
  return $axios(obj)
}

```

## 入门指南

> 此处记录内容为最基础的使用部分，如无必要，跳过此部分即可，详细内容请查找官方文档

### 注释写法

```js
{
  /* 
    xxx
    xxx
  */
}
```

```js
{
  // xxx
  // xxx
}
```

### 类的写法

请用className，因为class会和类同名，不建议用class定义样式

### React input 的双向绑定

<span style="color: #999;">state部分：页面的变量都存在于此处</span>

```js
constructor(props) {
  super(props)
  this.state = {
    value: ''
  }
}
```

<span style="color: #999;">render部分：value用来绑定input的值，onChange用来绑定输入框变化的事件，绑定this用于事件处理中可以找到this，而不是undefined</span>

```js
<input
  value={this.state.value}
  onChange={this.handleOnChange.bind(this)}
/>
```

<span style="color: #999;">js部分：用于实现输入框逻辑，改变state中的值必须使用`this.setState()`</span>

```js
  handleOnChange(e) {
    this.setState({value: e.target.value})
  }
```

### 循环dom结构

<span style="color: #999;">在render中用{}来写逻辑函数，用map去循环数组，这里的key有ID时候用ID</span>

```js
<section>
  {
    this.state.arr.map(item => {
      return (
        <div key={item.id}>{item}</div>
      )
    })
  }
</section>
```

### state值的改变

用setState进行值的更改，用 `let { value } = this.state` 取值，react中不允许直接改变state中的值，更改值时做如下操作：

数组中push一个值：

```js
let arr = [...this.state.arr, {id: 1, value: 'xxx'}]
this.setState({ arr })
```

数组中删除一个值：

```js
let { arr } = this.state
arr.splice(index, 1)
this.setState({ arr })
```

### react 中的 v-html

```js
<div dangerouslySetInnerHTML={{ __html: value }} />
```

### 生命周期函数

<b>Mounted</b>

第一次挂载执行：componentWillMount，componentDidMount

顺序：componentWillMount -> render -> componentDidMount

componentDidMount: 一般用于做接口请求

<b>Updated</b>

shoudComponentUpdate: 需要返回一个boolean值，告诉组件能否进行更新

用于限制不必要的更新，避免影响性能。

```js
shoudComponentUpdate(nextProps, nextState) {
  if (nextProps.content !== this.props.content) {
    return true;
  } else {
    return false;
  }
}
```

顺序：componentWillUpdate -> render -> componentDidUpdate

子组件级别 ～ componentWillReceiveProps

在子组件中执行（需接收参数）且在update时首先执行

第一次渲染在父组件中不会执行，已经渲染过会调用该生命周期函数

<b>Unmount</b>

componentWillUnmount -> 组件被从页面中移除

### 简单的组件传值

父组件向子组件通讯：

父组件：

```js
<div content={this.state.content} clickContent={this.clickContent.bind(this)}></div>
```

子组件：

```js
<div onClick={this.handleClick.bind(this)}>{this.props.content}</div>

handleClick() {
  this.props.clickContent(this.props.content)
}
```

### PropTypes做组件类型声明

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 基础用法
  content: PropTypes.string
  // 常见类型
  string & number & bool & array & object & func
  // 枚举类型
  enum: PropTypes.oneOf(['News', 'Photos'])
  // string || number
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  // 必填项
  content: PropTypes.string.isRequired
}

// 给定默认值
MyComponent.defaultProps = {
  content: 'default content'
}
```

### 小技巧之点击label聚焦input输入框

<span style="color: #999;">label 的 htmlFor 方法设置为 input 的 ID</span>

```js
<label htmlFor="focusInput">focusInput</label>
<input
  id="focusInput"
  value={this.state.value}
  onChange={this.handleOnChange.bind(this)} />
```

### 方法的绑定建议写在constructor中，减少性能的损耗

```js
constructor(props) {
  super(props)
  this.handleClick = this.handleClick.bind(this)
}
```

## 浅谈虚拟DOM

<b>什么是虚拟DOM？</b>

其实虚拟DOM就是一个js对象，用它来模拟DOM结构。

传统方式为有更改时，比对DOM结构，更新不同点。而虚拟DOM则比对的是js，更新DOM。在js中计算比对js对象远比计算比对DOM更节约资源，性能更好。

<b>为什么循环中的key不建议用index？</b>

举个例子，从第0个元素中插入一个元素，index会造成，从第0个开始全部重新渲染，因为index都发生了改变，所以这里建议用ID作为key的唯一值。
