// pages/bemaster/bemaster.js
const app = getApp()
let timer = null
Page({

  data: {
    address: '',

    btnOK: false,
    btnText: '获取验证码',
    phone: '',

    submitForm: {
      city: '',
      token: ''
    }
  },

  onLoad() {
    this.setData({
      'submitForm.token': app.globalData._token
    })
  },

  //获取地址
  getLocation() {
    app.getAddress(res => {
      this.setData({
        address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
        'submitForm.city': res.provinceName + res.cityName + res.countyName
      })
    })
  },

  //检查手机号
  checkNumber(e) {
    const value = e.detail.value
    if (value.length === 11) {
      this.setData({
        btnOK: true,
        phone: value
      })
    } else {
      this.setData({
        btnOK: false,
        phone: value
      })
    }
  },


  //获取验证码
  getSms() {
    let second = 60
    app._api.postSms({ phone: this.data.phone }, res => {
      timer = setInterval(() => {
        if (second > 0) {
          second--
          this.setData({
            btnText: `${second}秒重新获取`,
            btnOK: false
          })
        } else {
          this.setData({
            btnOK: true,
            btnText: '获取验证码'
          })
          clearInterval(timer)
        }
      }, 1000)
    })

  },

  //提交
  submit(e) {
    const postData = Object.assign(e.detail.value, this.data.submitForm)
    for (let it in postData) {
      if (!postData[it]) {
        wx.showModal({
          title: '提示',
          content: '请确保已填写所有信息',
          showCancel: false
        })
        return false
      }
    }

    app._api.postWorker(postData, res => {
      wx.showToast({
        title: '申请成功',
      })
      wx.setStorageSync('apply', 1)
      setTimeout(() => {
        wx.navigateBack()
      }, 300)
    })
  }
})