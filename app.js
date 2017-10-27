//app.js
App({

  //获取登录权限
  getUserInfo(callback) {
    const that = this
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: () => {
        wx.hideLoading()
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            typeof callback === 'function' && callback(res.userInfo)
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
  getAddress(callback) {
    const that = this
    wx.chooseAddress({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.address']) {
              that.getAddress(callback)
            }
          }
        })
      }
    })
  }

})