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
      }
    ]
  },

  onLoad() {
    let carts = wx.getStorageSync('cartsObj')
    let tmpCarts = []
    if (carts) {
      carts = JSON.parse(carts)
      for (let it in carts) {
        tmpCarts.push(carts[it])
      }
    }
    this.setData({
      carts: tmpCarts
    })
  },

  //删除商品
  deleteCommodity(e) {
    const index = e.currentTarget.dataset.index
    let sumCart = this.data.sumCart
    let carts = this.data.carts
    wx.showModal({
      title: '提示',
      content: '确定把该商品移出购物车吗？',
      success: (res) => {
        if (res.confirm) {
          if (sumCart.hasOwnProperty(index)) {
            delete sumCart[index]
          }
          carts.splice(index, 1)
          this.sumALl()
          //更新购物车本地缓存
          const commodities = this.data.payCommodities
          let tmp = {}
          for (let it in commodities) {
            tmp[commodities[it].id] = commodities[it]
          }
          wx.setStorageSync('cartsObj')
          this.setData({
            carts, sumCart
          })
        }
      }
    })
  },

  //加入购物车
  chooseItem(e) {
    const index = e.currentTarget.dataset.index
    let sumCart = this.data.sumCart
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
    const str = 'carts[' + index + '].final_num'
    let num = this.data.carts[index].final_num - 1
    if (num <= 0) {
      return false
    }
    this.sumSingle(index, this.data.carts[index].price, -1)
    this.setData({
      [str]: num
    })

    //更新购物车
    this.sumALl()
  },

  //增加数值
  addNum(e) {
    const stock = e.currentTarget.dataset.stock
    const index = e.currentTarget.dataset.index
    const str = 'carts[' + index + '].final_num'
    if (this.data.carts[index].final_num >= stock) {
      wx.showToast({
        title: '没库存了',
      })
      return false
    }
    let num = this.data.carts[index].final_num + 1
    if (num > 99) {
      return false
    }
    this.sumSingle(index, this.data.carts[index].price, 1)
    this.setData({
      [str]: num <= 99 ? num : 99
    })
    this.sumALl()
  },

  //统计总价钱和购买的商品
  sumALl() {
    const sumCart = this.data.sumCart
    let temp = []
    let sum = 0
    for (let item in sumCart) {
      const commodity = this.data.carts[item]
      temp.push(commodity)
      sum += commodity.price * commodity.final_num
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

      wx.setStorage({
        key: 'carts',
        data: JSON.stringify(payItems),
      })
      wx.navigateTo({
        url: '/pages/buyconfirm/buyconfirm?type=cart&price=' + wholePrice,
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