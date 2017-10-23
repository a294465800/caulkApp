// pages/shop/shop.js
const app = getApp()
Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    //模拟数据
    shops: [
      {
        id: 1,
        name: '这是一个商品啊',
        price: 120,
        sell: 21,
        url: 'http://cw1.tw/CW/images/fck/F1450079513946.jpg'
      },
      {
        id: 2,
        name: '这是一个商品啊这是一个商品啊',
        price: 1100,
        sell: 1520,
        url: 'http://cw1.tw/CW/images/fck/F1450079513946.jpg'
      },
      {
        id: 3,
        name: '这是一个商品啊这是一个商品啊',
        price: 21,
        sell: 11,
        url: 'http://cw1.tw/CW/images/fck/F1450079513946.jpg'
      }
    ]
  },

  // 具体商品跳转
  goToShopItem(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
  },

})