// pages/company/company.js
const WxParse = require('../../wxParse/wxParse.js')
const app = getApp()
Page({

  data: {

    // 导航
    tabText: [
      {
        id: 1,
        name: '公司展示'
      },
      {
        id: 2,
        name: '关于我们'
      }
    ],

    nodes: {
      1: '',
      2: ''
    },

    imgUrls: [],

    currentPage: 1,
  },

  onLoad() {
    app._api.getAdverts({ type: 3 }, res => {
      console.log(res)
      this.setData({
        imgUrls: res.data.data
      })
    })
    app._api.getArticle({ type: 1 }, res => {
      console.log('error')
      const article = res.data.data ? res.data.data.content : '<h1 style="text-align:center;">暂无内容</h1>'
      const that = this
      console.log(article)
      WxParse.wxParse('article', 'html', article, that, 10)
      console.log('error')
    })
    app._api.getArticle({ type: 2 }, res => {
      const article2 = res.data.data ? res.data.data.content : '<h1 style="text-align:center;">暂无内容</h1>'
      const that = this
      console.log(article2)
      WxParse.wxParse('article2', 'html', article2, that, 10)
    })
  },

  switchTab(e) {
    const id = e.target.id
    this.setData({
      currentPage: id
    })
  },

})