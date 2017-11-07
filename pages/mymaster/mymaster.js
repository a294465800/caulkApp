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

    orders: {
      1: [],
      2: []
    },

    //模拟数据
    naborLists: [
      {
        id: 1,
        name: '程先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 2,
        name: '岑先生',
        phone: 136541251423,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 3,
        name: '程先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 4,
        name: '韩先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 5,
        name: '程先生',
        phone: 13546843215,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      }
    ]
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

    if (index === this.data.currentNav) {
      return false
    }

    if (orders && orders.length > 0) {
      this.setData({
        currentNav: index,
        currentType: type
      })
    } else {
      const tmp = `orders[${type}]`
      app._api.getWorkerReserves({ type: type, token: app.globalData._token }, res => {
        this.setData({
          [tmp]: res.data.data,
          currentNav: index,
          currentType: type
        })
      })
    }
  },

  //接单
  getOrder(e) {
    const id = e.currentTarget.dataset.id
    app._api.acceptReserve(id, { token: app.globalData._token }, res => {
      wx.hideLoading()
      wx.showToast({
        title: '接单成功',
      })
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