// pages/mymaster/mymaster.js
const app = getApp()
Page({

  data: {
    //导航
    currentNav: 0,
    navs: [
      {
        type: 1,
        name: '附近单子',
      },
      {
        type: 2,
        name: '已接单子',
      }
    ],

    //模拟数据
    naborLists: [
      {
        id: 1,
        name: '程先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 2,
        name: '岑先生',
        phone: 136541251423,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 3,
        name: '程先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 4,
        name: '韩先生',
        phone: 1814512151,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      },
      {
        id: 5,
        name: '程先生',
        phone: 13546843215,
        address: '广州市XXX区XXX街道XXX号XXX',
        time: '2017-10-21 15:12'
      }
    ]
  },

  //导航切换
  switchNav(e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type
    if (index === this.data.currentNav) {
      return false
    }
    this.setData({
      currentNav: index
    })
  },

  //拨打电话
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone + '',
    })
  }


})