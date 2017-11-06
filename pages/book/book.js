// pages/book/book.js
const app = getApp()
Page({

  data: {
    book: {}
  },

  onLoad(options) {
    const data = JSON.parse(options.success)
    this.setData({
      book: data
    })
  },

  //回到首页
  goBack() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})