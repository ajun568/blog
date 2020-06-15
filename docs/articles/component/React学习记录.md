# React 学习记录

> 记录react的学习过程 || 踩坑过程，杂乱无序，之后可能会分类整理

### React如何修改默认端口号

```
npm install cross-env -g

"scripts": {
    "start": "cross-env PORT=5000 react-scripts start",
    //...
}
```

### react-router-dom + ts 报错

需要安装声明文件，让`typescript`认识`react`的路由，执行下列操作：

```yarn add @types/react-router-dom -D```

更改`index.tsx`代码如下：

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

更改为：

```ts
import Route from './router/index';
const render = (Component: any) => {
  ReactDOM.render(
      <Component />, 
      document.getElementById('root') as HTMLElement
  )
}
render(Route)
```

### 设置绝对路径

配置 `tsconfig.json`，增加：

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

### antd更换主题

yarn add antd react-app-rewired customize-cra babel-plugin-import less less-loader

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

### Cannot find module 'react-scripts/package.json'

yarn add react-scripts --dev
