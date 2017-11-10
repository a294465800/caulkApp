// pages/contact/contact.js
Page({

  data: {

  },

  //拨打电话
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone + '',
    })
  }
})