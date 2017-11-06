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
      final_num: 1,
    },

    //规格表
    standardList: {
    },

    //规格判断
    feature: [],

    currentCommdity: null,

    //接口数据
    commodity: {}
  },

  onLoad(options) {
    const id = options.id
    app._api.getCommodity(id, res => {
      this.setData({
        commodity: res.data.data
      })
    })
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

  //选择标准
  chooseStandard(e) {
    const standard_id = e.currentTarget.dataset.standard_id
    const id = e.currentTarget.dataset.id
    // const title = e.currentTarget.dataset.title
    let statusList = this.data.standardList
    let tmpArr = []
    // let tmpTitle = []
    if (statusList[standard_id] == id) {
      statusList[standard_id] = ''
      for (let it in statusList) {
        if (statusList[it]) {
          tmpArr.push(statusList[it])
          // tmpTitle.push()
        }
      }
      this.setData({
        standardList: statusList,
        feature: tmpArr
      })
    } else {
      statusList[standard_id] = id
      for (let it in statusList) {
        if (statusList[it]) {
          tmpArr.push(statusList[it])
        }
      }
      this.setData({
        standardList: statusList,
        feature: tmpArr
      })
    }
    app._api.getCommodityStandard({ feature: tmpArr }, res => {
      this.setData({
        currentCommdity: res.data.data
      })
    })
  },

  //删除数值
  deleteNum(e) {
    const currentCommdity = this.data.currentCommdity
    if (!currentCommdity) {
      return false
    }
    let num = this.data.waittingBuy.final_num - 1
    if (num <= 0) {
      return false
    }
    // this.sumSingle(currentCommdity.price, -1)
    this.setData({
      'waittingBuy.final_num': num
    })
  },

  //增加数值
  addNum(e) {
    const currentCommdity = this.data.currentCommdity
    if (currentCommdity && currentCommdity.stock > this.data.waittingBuy.final_num) {
      let num = this.data.waittingBuy.final_num + 1
      if (num > 99) {
        return false
      }
      // this.sumSingle(currentCommdity.price, 1)
      this.setData({
        'waittingBuy.final_num': num <= 99 ? num : 99
      })
    } else {
      return false
    }
  },

  //单次价格统计
  // sumSingle(price, num) {
  //   let old_price = this.data.waittingBuy.final_price
  //   old_price += price * num
  //   this.setData({
  //     'waittingBuy.final_price': old_price >= 0 ? old_price : 0
  //   })
  // },

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
    const currentCommdity = this.data.currentCommdity
    if (!currentCommdity) {
      wx.showModal({
        title: '提示',
        content: '请选择正确商品',
        showCancel: false
      })
      return false
    }
    if (currentCommdity.stock == 0) {
      wx.showModal({
        title: '提示',
        content: '该商品已经没有库存了',
        showCancel: false
      })
      return false
    }
    let buyCommodity = Object.assign(currentCommdity, this.data.waittingBuy, { title: this.data.commodity.title, url: this.data.commodity.pictures[0] })
    wx.setStorage({
      key: 'cart',
      data: JSON.stringify(this.data.currentCommdity),
    })
    wx.navigateTo({
      url: '/pages/buyconfirm/buyconfirm?type=single',
    })
  },

  //加入购物车
  addToCart() {
    const currentCommdity = this.data.currentCommdity
    let carts = wx.getStorageSync('cartsObj')
    if (carts) {
      carts = JSON.parse(carts)
    } else {
      carts = {}
    }
    if (!currentCommdity) {
      wx.showModal({
        title: '提示',
        content: '请选择正确商品',
        showCancel: false
      })
      return false
    }
    if (currentCommdity.stock == 0) {
      wx.showModal({
        title: '提示',
        content: '该商品已经没有库存了',
        showCancel: false
      })
      return false
    }
    let buyCommodity = Object.assign(currentCommdity, this.data.waittingBuy, { title: this.data.commodity.title, url: this.data.commodity.pictures[0] })
    if (!carts[buyCommodity.id]) {
      carts[buyCommodity.id] = buyCommodity
    }
    wx.setStorage({
      key: 'cartsObj',
      data: JSON.stringify(carts),
    })
    wx.showToast({
      title: '加入成功',
    })
  }
})