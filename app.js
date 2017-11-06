//app.js
const _api = require('./utils/api.js')
App({

  globalData: {
    _token: ''
  },

  _api: _api.api,

  //获取登录权限
  getUserInfo(callback) {
    const that = this
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: login => {
        wx.hideLoading()
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            this._api.login({ code: login.code, iv: res.iv, encryptedData: res.encryptedData }, (token) => {
              this.globalData._token = token.data.token
              typeof callback === 'function' && callback(res.userInfo)
            })
          },
          fail: (error) => {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.userInfo']) {
                  that.getUserInfo(callback)
                }
              }
            })
          }
        })
      }
    })
  },

  //获取地址
  getAddress(callback, flag) {
    if (flag) {
      return false
    }
    const that = this
    wx.chooseAddress({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.address']) {
              that.getAddress(callback, true)
            }
          }
        })
      }
    })
  }

})