// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,

    // 操作列表
    operations: [
      {
        id: 1,
        name: '我的预约',
        url: '/images/icon/reservation.png',
        fnc: 'goTomyReservation'
      },
      {
        id: 2,
        name: '我的订单',
        url: '/images/icon/my_order.png',
        fnc: 'goTomyOrder'
      },
      {
        id: 3,
        name: '我的购物车',
        url: '/images/icon/my_cart.png',
        fnc: 'goTomyCart'
      },
      {
        id: 4,
        name: '我是师傅',
        url: '/images/icon/master.png',
        fnc: 'goToMaster'
      }
    ],
  },

  // 登录
  login() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo
      })
    })
  },
})