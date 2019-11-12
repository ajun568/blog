// 配置文件的入口文件
module.exports = {

  // develop config
  base: "/",
  dest: "./dist",

  // page config
  title: 'YiJun Blog',
  description: "yijun's Blogs",

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
      }
    ]
  }

  return sidebarConfigs[name] || []
}
