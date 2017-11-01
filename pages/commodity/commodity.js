// pages/commodity/commodity.js
const app = getApp()
Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ],

    buyNow: false,
    btnText: '加入购物车',

    //购买商品的数据
    waittingBuy: {
      num: 1,
      price: 99,
    },

    //模拟数据

    commodity: {
      id: 1,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
      ],
      title: '这是一件商品',
      price: 99,
      sell: 9,
      description: '这是一大段商品描述。。。。。。。。。。。。。。。。',
      type: [
        {
          id: 1,
          name: '规格一',
          items: ['红色', '蓝色', '白色'],
        },
        {
          id: 2,
          name: '规格二',
          items: ['红色', '蓝色', '白色'],
        }
      ],
      details: [
        'http://img04.taobaocdn.com/bao/uploaded/i4/TB1suLDOpXXXXc3XXXXXXXXXXXX_!!0-item_pic.jpg',
        'https://cbu01.alicdn.com/img/ibank/2017/924/859/4068958429_1902505327.310x310.jpg',
        'http://www.xayijiayi.com/uploads/140611/xiangyajin.jpg'
      ]
    }
  },

  preImg(e) {
    const img = e.currentTarget.dataset.img
    wx.previewImage({
      current: img,
      urls: this.data.imgUrls,
    })
  },

  //操作
  operation(e) {
    const operation = e.target.dataset.operation
    switch (operation) {
      case 'delete':
        this.deleteNum(e)
        break
      case 'add':
        this.addNum(e)
        break
      default:
        return false
    }
  },

  //删除数值
  deleteNum(e) {
    let num = this.data.waittingBuy.num - 1
    if (num <= 0) {
      return false
    }
    this.sumSingle(this.data.commodity.price, -1)
    this.setData({
      'waittingBuy.num': num
    })
  },

  //增加数值
  addNum(e) {
    let num = this.data.waittingBuy.num + 1
    if (num > 99) {
      return false
    }
    this.sumSingle(this.data.commodity.price, 1)
    this.setData({
      'waittingBuy.num': num <= 99 ? num : 99
    })
  },

  //单次价格统计
  sumSingle(price, num) {
    let old_price = this.data.waittingBuy.price
    old_price += price * num
    this.setData({
      'waittingBuy.price': old_price
    })
  },

  //加入购物车显示
  addToCartText() {
    this.setData({
      buyNow: true,
      btnText: '加入购物车'
    })
  },

  //直接购买显示
  singleBuyText() {
    this.setData({
      buyNow: true,
      btnText: '直接购买'
    })
  },

  //关闭购物弹框
  closeBox() {
    this.setData({
      buyNow: false
    })
  },

  //显示
  showBox() {
    this.setData({
      buyNow: true
    })
  },

  //直接购买
  singleBuy() {
    wx.setStorage({
      key: 'cart',
      data: JSON.stringify(this.data.commodity),
    })
    wx.navigateTo({
      url: '/pages/buyconfirm/buyconfirm?type=single&price=' + this.data.waittingBuy.price,
    })
  },

  //加入购物车
  addToCart() {

  }
})