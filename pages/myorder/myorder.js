// pages/myorder/myorder.js
const app = getApp()
Page({

  data: {
    //导航
    currentNav: 0,
    navs: [
      {
        type: 1,
        name: '待收货',
      },
      {
        type: 2,
        name: '已完成',
      }
    ],

    //模拟数据
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

  //导航切换
  switchNav(e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type
    if (index === this.data.currentNav) {
      return false
    }
    this.setData({
      currentNav: index
    })
  },

  //确认收货
  confirmOrder(e) {
    const id = e.currentTarget.dataset.id
    console.log(e, id)
  }

})