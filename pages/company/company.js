// pages/company/company.js
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

    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    currentPage: 1,
  },

  switchTab(e) {
    const id = e.target.id
    this.setData({
      currentPage: id
    })
  },

})