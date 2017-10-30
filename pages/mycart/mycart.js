// pages/mycart/mycart.js
const app = getApp()
Page({

  data: {

    wholePrice: 0,
    sumCart: {},
    payCommodities: [],

    //模拟数据
    carts: [
      {
        id: 1,
        num: 1,
        title: '这是美缝剂',
        type: '象牙白 1L',
        price: 128,
        url: 'https://img.alicdn.com/bao/uploaded/i3/2074861905/TB1RAjsXrsTMeJjy1zbXXchlVXa_!!0-item_pic.jpg_b.jpg'
      },
      {
        id: 2,
        num: 1,
        title: '这是美缝剂这是美缝剂这是美缝剂这是美缝剂这是美缝剂,这是美缝剂',
        type: '天蓝 3L',
        price: 22,
        url: 'https://img.alicdn.com/bao/uploaded/i3/2074861905/TB1RAjsXrsTMeJjy1zbXXchlVXa_!!0-item_pic.jpg_b.jpg'
      },
      {
        id: 3,
        num: 1,
        title: '这是美缝剂这是美缝剂这是美缝剂这是美缝剂这是美缝剂,这是美缝剂',
        type: '天蓝 3L',
        price: 22,
        url: 'https://img.alicdn.com/bao/uploaded/i3/2074861905/TB1RAjsXrsTMeJjy1zbXXchlVXa_!!0-item_pic.jpg_b.jpg'
      }
      ,
      {
        id: 4,
        num: 1,
        title: '这是美缝剂这是美缝剂这是美缝剂这是美缝剂这是美缝剂,这是美缝剂',
        type: '天蓝 3L',
        price: 22,
        url: 'https://img.alicdn.com/bao/uploaded/i3/2074861905/TB1RAjsXrsTMeJjy1zbXXchlVXa_!!0-item_pic.jpg_b.jpg'
      },
      {
        id: 5,
        num: 1,
        title: '这是美缝剂这是美缝剂这是美缝剂这是美缝剂这是美缝剂,这是美缝剂',
        type: '天蓝 3L',
        price: 22,
        url: 'https://img.alicdn.com/bao/uploaded/i3/2074861905/TB1RAjsXrsTMeJjy1zbXXchlVXa_!!0-item_pic.jpg_b.jpg'
      }]
  },

  //删除商品
  deleteCommodity(e) {
    const index = e.currentTarget.dataset.index
    let carts = this.data.carts
    wx.showModal({
      title: '提示',
      content: '确定把该商品移出购物车吗？',
      success: (res) => {
        if (res.confirm) {
          carts.splice(index, 1)
          this.setData({
            carts
          })
        }
      }
    })
  },

  //加入购物车
  chooseItem(e) {
    // const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    const sumCart = this.data.sumCart
    if (sumCart.hasOwnProperty(index)) {
      delete sumCart[index]
    } else {
      sumCart[index] = true
    }
    this.sumALl()
    this.setData({
      sumCart: sumCart
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
    const index = e.currentTarget.dataset.index
    const sumCart = this.data.sumCart
    const str = 'carts[' + index + '].num'
    let num = this.data.carts[index].num - 1
    if (num <= 0) {
      return false
    }
    this.sumSingle(index, this.data.carts[index].price, -1)
    this.setData({
      [str]: num
    })
  },

  //增加数值
  addNum(e) {
    const index = e.currentTarget.dataset.index
    const str = 'carts[' + index + '].num'
    let num = this.data.carts[index].num + 1
    if (num > 99) {
      return false
    }
    this.sumSingle(index, this.data.carts[index].price, 1)
    this.setData({
      [str]: num <= 99 ? num : 99
    })
  },

  //统计总价钱和购买的商品
  sumALl() {
    const sumCart = this.data.sumCart
    let temp = []
    let sum = 0
    for (let item in sumCart) {
      const commodity = this.data.carts[item]
      temp.push(commodity)
      sum += commodity.price * commodity.num
    }
    this.setData({
      payCommodities: temp,
      wholePrice: sum
    })
  },

  //单次价格统计
  sumSingle(index, price, num) {
    if (!this.data.sumCart.hasOwnProperty(index)) {
      return false
    }
    let old_price = this.data.wholePrice
    old_price += price * num
    this.setData({
      wholePrice: old_price
    })
  },

  //购买下单
  payForIt() {
    const payItems = this.data.payCommodities
    const wholePrice = this.data.wholePrice
    if (payItems.length) {
      wx.showModal({
        title: '提示',
        content: '你选中了' + payItems.length + '件商品，总计' + wholePrice + '元，确认付款吗？',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '购买成功',
            })
          } else {
            wx.showToast({
              title: '已取消',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先选择商品',
        showCancel: false
      })
      return false
    }
  },

  //商城跳转
  goToShoppingMall() {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  }

})