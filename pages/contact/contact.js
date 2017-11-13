// pages/contact/contact.js
const app = getApp()
Page({

  data: {
    imgUrls: []
  },

  onLoad() {
    app._api.getAdverts({ type: 3 }, res => {
      this.setData({
        imgUrls: res.data.data
      })
    })
  },

  //拨打电话
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone + '',
    })
  },
})