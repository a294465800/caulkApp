// pages/myorder/myorder.js
const app = getApp()
Page({

  data: {
    //导航
    currentNav: 0,
    currentType: 0,
    navs: [
      {
        type: 0,
        name: '待收货',
      },
      {
        type: 1,
        name: '已完成',
      }
    ],

    //模拟数据
    orders: {
      0: [],
      1: []
    },
    orders: [
      {
        id: 1,
        order_id: 213213,
        time: '2017-10-31 15:22',
        commodities: [
          {
            id: 1,
            name: '这是一桶油漆',
            num: 1,
            type: '象牙白',
            price: 128,
            url: 'http://a1.att.hudong.com/86/95/01300543915313147018958658988_s.jpg'
          },
          {
            id: 2,
            name: '这是一桶油漆,这是一桶油漆,这是一桶油漆,这是一桶油漆,这是一桶油漆,这是一桶油漆',
            num: 2,
            type: '天蓝',
            price: 256,
            url: 'http://a1.att.hudong.com/86/95/01300543915313147018958658988_s.jpg'
          }
        ],
        all_price: 384,
        fare: 20
      },
      {
        id: 1,
        order_id: 213213,
        time: '2017-10-31 15:22',
        commodities: [
          {
            id: 1,
            name: '这是一桶油漆',
            num: 1,
            type: '象牙白',
            price: 128,
            url: 'http://a1.att.hudong.com/86/95/01300543915313147018958658988_s.jpg'
          }
        ],
        all_price: 128,
        fare: 20
      }
    ]
  },

  onLoad() {
    app._api.getMyOrder({ token: app.globalData._token, state: 0 }, res => {
      this.setData({
        'orders[0]': res.data.data
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
    if (this.orders[type] && this.orders[type].length > 0) {
      this.setData({
        currentNav: index
      })
    } else {
      app._api.getMyOrder({ token: app.globalData._token, state: type }, res => {
        this.setData({
          [tmp]: res.data.data,
          currentNav: index
        })
      })
    }
  },

  //确认收货
  confirmOrder(e) {
    const id = e.currentTarget.dataset.id
    console.log(e, id)
  }

})