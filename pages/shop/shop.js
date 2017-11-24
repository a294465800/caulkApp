// pages/shop/shop.js
const app = getApp()
let timer
Page({

  data: {

    imgUrls: [],

    flag: false,
    page: 1,

    searchTitle: '',

    //接口数据
    shops: []
  },

  onLoad() {
    app._api.getCommodities('', res => {
      this.setData({
        shops: res.data.data,
      })
    })

    app._api.getAdverts({ type: 2 }, res => {
      this.setData({
        imgUrls: res.data.data
      })
    })
  },

  //触底刷新
  onReachBottom() {
    const page = this.data.page
    const flag = this.data.flag
    if (flag) {
      return false
    }
    wx.showLoading({
      title: '加载中',
    })
    app._api.getCommodities({ title: this.data.searchTitle, page: page + 1 }, res => {
      wx.hideLoading()
      const data = res.data.data
      if (data.length) {
        this.setData({
          shops: [...this.data.shops, ...data],
          page: page + 1
        })
      } else {
        wx.showToast({
          title: '没有了',
        })
        this.setData({
          page: page + 1,
          flag: true
        })
      }
    })
  },

  //商品搜索
  searchCommodity(e) {
    const value = e.detail.value
    clearInterval(timer)
    timer = setInterval(() => {
      clearInterval(timer)
      app._api.getCommodities({ title: value }, res => {
        this.setData({
          shops: res.data.data,
          // loading: false
          searchTitle: value,
        })
      })
    }, 500)
  },

  // 具体商品跳转
  goToShopItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + id,
    })
  },

})