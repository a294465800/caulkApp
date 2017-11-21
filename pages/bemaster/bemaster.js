// pages/bemaster/bemaster.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({
  key: 'EUNBZ-MIEKW-LPMR7-ODGYY-IKEIH-Y3B4O'
});
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

    app.getLocation(res => {
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: (rs) => {
          console.log(rs)
          const cityData = rs.result.address_component
          this.setData({
            address: res.address,
            'submitForm.city': cityData.province + cityData.city + cityData.district
          })
        },
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
    this.setData({
      btnOK: false
    })
    app._api.postSms({ phone: this.data.phone }, res => {
      timer = setInterval(() => {
        if (second > 0) {
          second--
          this.setData({
            btnText: `${second}秒重新获取`
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