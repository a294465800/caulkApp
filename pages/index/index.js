//index.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({
  key: 'EUNBZ-MIEKW-LPMR7-ODGYY-IKEIH-Y3B4O'
});
Page({

  onShareAppMessage(res) {
    return {
      title: '美家美缝服务中心',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    imgUrls: [],

    number: '',
    name: '',
    address: '',
    location: {}
  },

  onLoad() {
    app._api.getAdverts({ type: 1 }, res => {
      this.setData({
        imgUrls: res.data.data
      })
    })
  },

  getLocation() {
    app.getLocation(res => {
      // this.setData({
      // address: res.address,
      // address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
      // 'location.city': res.provinceName + res.cityName + res.countyName,
      // 'location.latitude': res.latitude,
      // 'location.longitude': res.longitude
      // })
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: (rs) => {
          const cityData = rs.result.address_component
          this.setData({
            address: res.address,
            // address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
            // 'location.city': res.provinceName + res.cityName + res.countyName,
            // 'location.latitude': res.latitude,
            // 'location.longitude': res.longitude
            'location.city': cityData.province + cityData.city + cityData.district
          })
        },
      })
    })
  },

  //提交
  submit(e) {
    if (!app.globalData._token) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: ok => {
          if (ok.confirm) {
            app.getUserInfo()
          }
        }
      })
      return false
    }
    let dataForm = e.detail.value
    dataForm.address = dataForm.address + dataForm.detail
    dataForm.detail = "nouse"
    const submitForm = Object.assign(dataForm, this.data.location, { token: app.globalData._token })
    console.log(submitForm)
    for (let it in submitForm) {
      if (!submitForm[it]) {
        wx.showModal({
          title: '提示',
          content: '信息不能留空',
          showCancel: false,
        })
        return false
      }
    }
    app._api.postReserve(submitForm, res => {
      this.setData({
        name: '',
        address: '',
        detail: '',
        number: ''
      })
      wx.navigateTo({
        url: '/pages/book/book?success=' + JSON.stringify(submitForm),
      })
    })
  },


})
