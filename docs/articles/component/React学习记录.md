# React 学习记录

> 记录react的学习过程 || 踩坑过程，杂乱无序，之后可能会分类整理。整理到React爬坑指南后会删除该页面。

### Cannot find module 'react-scripts/package.json'

yarn add react-scripts --dev

### Fragment

render 中的占位符，编译时候不会产生多余的div

### 暂无标题，等下整理

constructor 页面最先执行的内容

```js
constructor(props) {
  super(props)
  this.state = {}
}
```

### React不允许直接改变state中的值（immutable）

### 建议每个模块做函数拆分（比如循环部分等）

### this.setState推荐如下写法

```js
const value = e.target.value

this.setState(() => {
  return {
    value: value
  }
})

this.setState(() => ({
  value
}))
```

### this.setState 会接收一个preState的参数，可以直接用preStat.xxx获取

### 单向数据流

### 当组件的state或者props发生改变的时候，render函数就会重新执行。

### 当父组件的render被执行时，子组件的render也会被重新执行

### 虚拟DOM

React提升性能的方法

虚拟DOM就是一个对象，用它来描述真实的DOM（其实就是React的非jsx的写法）

### this.setState({}, () => {})
