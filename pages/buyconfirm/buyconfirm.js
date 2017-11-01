// pages/buyconfirm/buyconfirm.js
const app = getApp()
Page({

  data: {
    address: '',
    price: '',
    currentType: '',

    carts: null,
  },

  onLoad(options) {
    const operation = options.type
    const price = options.price || 0
    if (operation === 'single') {
      const carts = [JSON.parse(wx.getStorageSync('cart'))]
      const currentType = 'cart'
      this.setData({
        price, carts, currentType
      })
    } else {
      const carts = JSON.parse(wx.getStorageSync('carts'))
      const currentType = 'carts'
      this.setData({
        price, carts, currentType
      })
    }
  },

  //添加地址
  addAddress() {
    app.getAddress(res => {
      this.setData({
        address: res.provinceName + res.cityName + res.countyName + res.detailInfo
      })
    })
  },

  //付款
  payForIt() {
    if (!this.data.address) {
      wx.showModal({
        title: '提示',
        content: '请先选择地址',
        showCancel: false
      })
      return false
    }
    wx.showModal({
      title: '提示',
      content: '你选中了' + this.data.carts.length + '件商品，总计' + this.data.price + '元，确认付款吗？',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '购买成功',
          })
          wx.removeStorage({
            key: this.data.currentType,
          })
        } else {
          wx.showToast({
            title: '已取消',
          })
        }
      }
    })
  }

})