// pages/shop/shop.js
const app = getApp()
Page({

  data: {

    loading: true,

    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    //接口数据
    shops: []
  },

  onLoad() {
    app._api.getCommodities('', res => {
      this.setData({
        shops: res.data.data,
        loading: false
      })
    })
  },

  // 具体商品跳转
  goToShopItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + id,
    })
  },

})