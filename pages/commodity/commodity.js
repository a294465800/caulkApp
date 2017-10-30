// pages/commodity/commodity.js
const app = getApp()
Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],
  },

  preImg(e) {
    const img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img,
      urls: this.data.imgUrls,
    })
  }
})