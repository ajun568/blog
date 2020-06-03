# React 学习记录

### React如何修改默认端口号

```
npm install cross-env -g

"scripts": {
    "start": "cross-env PORT=5000 react-scripts start",
    //...
}
```