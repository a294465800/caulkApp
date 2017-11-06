//index.js
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],

    address: '',
    location: {}
  },

  onLoad() {
    app._api.getAdverts({ type: 1 }, res => {
      console.log(res)
    })
  },

  getLocation() {
    app.getLocation(res => {
      this.setData({
        address: res.address,
        'location.latitude': res.latitude,
        'location.longitude': res.longitude
      })
    })
  },

  //提交
  submit(e) {
    const dataForm = e.detail.value
    const submitForm = Object.assign(dataForm, this.data.location, { token: app.globalData._token })
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
      wx.navigateTo({
        url: '/pages/book/book?success=' + JSON.stringify(submitForm),
      })
    })
  },


})
