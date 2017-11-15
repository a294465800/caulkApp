// pages/mymaster/mymaster.js
const app = getApp()
Page({

  data: {
    //导航
    currentNav: 0,
    currentType: 1,
    navs: [
      {
        type: 1,
        name: '附近单子',
      },
      {
        type: 2,
        name: '已接单子',
      }
    ],

    flag: false,
    bottomFlag: {
      1: false,
      2: false
    },

    pages: {
      1: 1,
      2: 1
    },

    //接口数据
    orders: {
      1: [],
      2: []
    },
  },

  onLoad() {
    app._api.getWorkerReserves({ type: 1, token: app.globalData._token }, res => {
      this.setData({
        'orders[1]': res.data.data
      })
    })
  },

  //导航切换
  switchNav(e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type
    const orders = this.data.orders[type]
    const tmp = `orders[${type}]`
    const tmpPage = `pages[${type}]`
    const tmpFlag = `bottomFlag[${type}]`

    if (index === this.data.currentNav) {
      return false
    }

    // if (orders && orders.length > 0) {
    //   this.setData({
    //     currentNav: index,
    //     currentType: type
    //   })
    // } else {
    //   const tmp = `orders[${type}]`
    //   app._api.getWorkerReserves({ type: type, token: app.globalData._token }, res => {
    //     this.setData({
    //       [tmp]: res.data.data,
    //       currentNav: index,
    //       currentType: type
    //     })
    //   })
    // }

    app._api.getWorkerReserves({ type: type, token: app.globalData._token }, res => {
      this.setData({
        [tmp]: res.data.data,
        currentNav: index,
        currentType: type,
        [tmpPage]: 1,
        [tmpFlag]: false
      })
    })
  },

  //接单
  getOrder(e) {
    const id = e.currentTarget.dataset.id
    app._api.acceptReserve(id, { token: app.globalData._token }, res => {
      wx.hideLoading()
      wx.showToast({
        title: '接单成功',
      })
      app._api.getWorkerReserves({ type: 1, token: app.globalData._token }, res => {
        this.setData({
          'orders[1]': res.data.data,
          'pages[1]': 1,
          'bottomFlag[1]': false
        })
      })
    })
  },

  //触底刷新
  getMore() {
    const flag = this.data.flag
    const type = this.data.currentType
    const bottomFlag = this.data.bottomFLag[type]
    const page = this.data.pages[type]
    const tmpFlag = `bottomFlag[${type}]`
    const tmpPage = `pages[${type}]`
    const tmpOrder = `orders[${type}]`
    if (flag || bottomFlag) {
      return
    }

    this.setData({
      flag: true
    })
    app._api.getWorkerReserves({ type, token: app.globalData._token, page: page + 1 }, res => {
      const data = res.data.data
      if (data.length) {
        this.setData({
          [tmpOrder]: [...this.data.orders[type], ...res.data.data],
          [tmpPage]: page + 1,
          flag: false
        })
      } else {
        this.setData({
          [tmpPage]: page + 1,
          flag: false,
          tmpFlag: true
        })
      }
    })
  },

  //拨打电话
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone + '',
    })
  }


})