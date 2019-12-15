// 配置文件的入口文件
module.exports = {

  // develop config
  base: "/",
  dest: "./dist",

  // page config
  title: 'YiJun Blog',
  description: "yijun's Blogs",
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "./deer.png"}]
  ],

  // theme config
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Contents", link: "/articles/" }
    ],
    sidebar: {
      '/articles/': getSidebar('articles')
    },
    lastUpdated: 'Last Updated'
  }
}

// getSidebar
function getSidebar(name) {
  const sidebarConfigs = {
    articles: [
      {
        title: '服务器，让你的代码环游世界',
        collapsable: true,
        children: [
          'service/git',
          'service/Linux基础命令',
          'service/搭建服务器'
        ]
      },
      {
        title: 'css ~ 装饰你的美',
        collapsable: true,
        children: [
          'css/css小特性'
        ]
      },
      {
        title: 'js ～ 为你的代码添砖加瓦',
        collapsable: true,
        children: [
          'js/js执行机制',
          'js/万物皆对象'
        ]
      },
      {
        title: '函数之美',
        collapsable: true,
        children: [
          'fn/柯里化与偏函数'
        ]
      },
      {
        title: 'fancy',
        collapsable: false,
        children: [
          'fancy/fancy',
          'fancy/原型文档'
        ]
      }
    ]
  }

  return sidebarConfigs[name] || []
}
