// pages/myorder/myorder.js
const app = getApp()
Page({

  data: {
    //导航
    currentNav: 0,
    currentType: 1,
    navs: [
      {
        type: 1,
        name: '待发货',
      },
      {
        type: 2,
        name: '待收货',
      },
      {
        type: 3,
        name: '已完成',
      }
    ],

    flag: false,
    bottomFlag: {
      1: false,
      2: false,
      3: false
    },
    pages: {
      1: 1,
      2: 1,
      3: 1
    },

    //接口数据
    orders: {
      1: [],
      2: [],
      3: []
    },
  },

  onLoad() {
    app._api.getMyOrder({ token: app.globalData._token, state: 1 }, res => {
      this.setData({
        'orders[1]': res.data.data
      })
    })
  },

  //导航切换
  switchNav(e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type
    const tmp = `orders[${type}]`
    if (index === this.data.currentNav) {
      return false
    }
    if (this.data.orders[type] && this.data.orders[type].length > 0) {
      this.setData({
        currentNav: index,
        currentType: type,
      })
    } else {
      app._api.getMyOrder({ token: app.globalData._token, state: type }, res => {
        this.setData({
          [tmp]: res.data.data,
          currentNav: index,
          currentType: type,
        })
      })
    }
  },

  //确认收货
  confirmOrder(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    let list = this.data.orders[2]
    wx.showModal({
      title: '提示',
      content: '确认收货吗？',
      success: confirm => {
        if (confirm.confirm) {
          app._api.confirmOrder(id, { token: app.globalData._token }, res => {
            list.splice(index, 1)
            this.setData({
              'orders[2]': list
            })
          })
          wx.showToast({
            title: '已确认',
          })
        }
      }
    })
  },

  //触底刷新
  getMore() {
    const flag = this.data.flag
    const type = this.data.currentType
    const bottomFlag = this.data.bottomFlag[type]
    const page = this.data.pages[type]
    const tmpFlag = `bottomFlag[${type}]`
    const tmpOrder = `orders[${type}]`
    const tmpPage = `pages[${type}]`
    if (flag || bottomFlag) {
      return false
    }
    this.setData({
      flag: true
    })
    app._api.getMyOrder({ token: app.globalData._token, state: type, page: page + 1 }, res => {
      const data = res.data.data
      if (data.length) {
        this.setData({
          flag: false,
          [tmpOrder]: [...this.data.orders[type], ...data],
          [tmpPage]: page + 1
        })
      } else {
        this.setData({
          flag: false,
          [tmpPage]: page + 1,
          [tmpFlag]: true
        })
      }
    })
  }

})