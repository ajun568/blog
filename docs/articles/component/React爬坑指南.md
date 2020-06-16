# React爬坑指南

> 用于记录在使用React中遇到的问题或者使用过程中的一些封装，吐槽一下，加上TS，不熟悉的话真是一步一个坑。

<div style="text-align: center;">
  <img src="./../assets/tremble.jpg" alt="萌新瑟瑟发抖">
</div>

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
