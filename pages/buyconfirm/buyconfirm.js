// pages/buyconfirm/buyconfirm.js
const app = getApp()
Page({

  data: {
    currentType: '',

    carts: [],

    submitForm: {
      address: '',
      description: '',
      products: []
    },

    mode: ''
  },

  onLoad(options) {
    const operation = options.type
    let carts = []
    if (operation === 'single') {
      carts = [JSON.parse(wx.getStorageSync('cart'))]
      const currentType = 'cart'
      this.setData({
        carts, currentType
      })
    } else {
      carts = JSON.parse(wx.getStorageSync('carts'))
      const currentType = 'cartsObj'
      this.setData({
        carts, currentType
      })
    }

    //制造 post 数据
    let tmpPost = []
    for (let it in carts) {
      tmpPost.push({ id: carts[it].id, number: carts[it].final_num })
    }
    this.setData({
      'submitForm.products': tmpPost
    })
  },

  //添加地址
  addAddress() {
    app.getAddress(res => {
      this.setData({
        'submitForm.address': res.provinceName + res.cityName + res.countyName + res.detailInfo,
        'submitForm.name': res.userName,
        'submitForm.phone': res.telNumber,
      })
    })
  },

  //获取 textarea
  getTextarea(e) {
    this.setData({
      'submitForm.description': e.detail.value
    })
  },

  //付款
  payForIt(e) {
    const that = this
    const price = e.currentTarget.dataset.price
    const submitForm = this.data.submitForm
    let endForm = Object.assign(submitForm, { token: app.globalData._token })
    if (!submitForm.address) {
      wx.showModal({
        title: '提示',
        content: '请先选择地址',
        showCancel: false
      })
      return false
    }
    wx.showModal({
      title: '提示',
      content: '你选中了' + this.data.carts.length + '种商品，总计' + price + '元，确认付款吗？',
      success(res) {
        if (res.confirm) {
          app._api.postPorduct(endForm, res => {
            wx.requestPayment({
              timeStamp: res.data.data.timeStamp,
              nonceStr: res.data.data.nonceStr,
              package: res.data.data.package,
              signType: res.data.data.signType,
              paySign: res.data.data.paySign,
              success: success => {
                wx.showToast({
                  title: '购买成功',
                })
                wx.removeStorage({
                  key: that.data.currentType,
                })
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/shop/shop',
                  })
                }, 300)
              },
              fail: fail => {
                wx.showToast({
                  title: '已取消',
                })
              }
            })
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