// 配置文件的入口文件
const headLink = [
  ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/deer.png"}],
  ['meta', { name: 'baidu-site-verification', content: 'qXjHGb0OWV' }],
  ['meta', { name: '360-site-verification', content: 'd0440fd87feebbf9da38fc40e9531753' }],
  ['script', { id: 'sozz', src: 'https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba'}]
]

module.exports = {

  // 基础配置
  base: "/",
  port: 8080,
  dest: "./dist",

  // 页面配置
  title: 'Deeruby',
  description: "yijun's Blogs",
  head: headLink,

  // 缓存离线内容
  serviceWorker: true,
  
  // markdown 配置
  markdown: {
    toc: {
      includeLevel: [1, 2]
    }
  },

  // 主题配置
  themeConfig: {
    themeConfig: {
      logo: './public/deer.png',
    },
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

// 侧边栏配置
function getSidebar(name) {
  const sidebarConfigs = {
    articles: [
      {
        title: '服务器~连接世界的桥梁',
        collapsable: true,
        children: [
          'service/搭建服务器',
          'js/浏览器网络状态',
          'service/git',
          'service/Linux基础命令'
        ]
      },
      {
        title: 'css~点缀你的美',
        collapsable: true,
        children: [
          'css/css小特性'
        ]
      },
      {
        title: 'js~让代码“动”起来',
        collapsable: true,
        children: [
          'js/js执行机制',
          'js/万物皆对象'
        ]
      },
      {
        title: '算法~舞动你的思维',
        collapsable: true,
        children: [
          'fn/柯里化与偏函数'
        ]
      },
      {
        title: '奇思妙想小项目',
        collapsable: true,
        children: [
          'fancy/fancy',
          'fancy/原型文档'
        ]
      }
    ]
  }

  return sidebarConfigs[name] || []
}
