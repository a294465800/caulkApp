// pages/company/company.js
const WxParse = require('../../wxParse/wxParse.js')
const app = getApp()
Page({

  data: {

    // 导航
    tabText: [
      {
        id: 1,
        name: '荣誉资质'
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
      this.setData({
        imgUrls: res.data.data
      })
    })
    app._api.getArticle({ type: 2 }, res => {
      const article2 = res.data.data ? res.data.data.content : '<h1 style="text-align:center;">暂无内容</h1>'
      const that = this
      WxParse.wxParse('article2', 'html', article2, that, 10)
    })
    app._api.getArticle({ type: 1 }, res => {
      const article1 = res.data.data ? res.data.data.content : '<h1 style="text-align:center;">暂无内容</h1>'
      const that = this
      WxParse.wxParse('article1', 'html', article1, that, 10)
    })
  },

  switchTab(e) {
    const id = e.target.id
    this.setData({
      currentPage: id
    })
  },

})