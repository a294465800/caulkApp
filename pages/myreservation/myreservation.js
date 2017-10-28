// pages/myreservation/myreservation.js
const app = getApp()
Page({

  data: {

    showMaster: false,
    currentMaster: null,

    //导航
    currentNav: 0,
    navs: [
      {
        type: 1,
        name: '已指派',
      },
      {
        type: 2,
        name: '未响应',
      },
      {
        type: 3,
        name: '已完成',
      }
    ],

    //模拟数据
    sents: [
      {
        id: 1,
        name: '陈先生',
        phone: 13541534813,
        address: '广州市XXX区XXXXX街道XXX号',
        time: '2017-10-21 15:31'
      },
      {
        id: 2,
        name: '曾先生',
        phone: 18451346125,
        address: '广州市XXX区XXXXX街道XXX号',
        time: '2017-10-26 16:41'
      }
    ],
    notSents: [
      {
        id: 1,
        name: '陈先生',
        phone: 13541534813,
        address: '广州市XXX区XXXXX街道XXX号',
        time: '2017-10-21 15:31'
      },
      {
        id: 2,
        name: '曾先生',
        phone: 18451346125,
        address: '广州市XXX区XXXXX街道XXX号',
        time: '2017-10-26 16:41'
      }
    ],
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

  //按钮操作
  operationFnc(e) {
    const operation = e.target.dataset.operation
    const that = this
    switch (operation) {
      case 'checkMaster':
        that.checkMaster(e)
        break
      case 'cancel':
        that.cancel()
        break
      default: return false
    }
  },

  //显示、关闭师傅面板 
  checkMaster(e) {
    const master = e.target.dataset.master
    console.log(e)
    this.setData({
      showMaster: true,
      currentMaster: master
    })
  },

  hideMaster() {
    this.setData({
      showMaster: false
    })
  },

  //拨打师傅电话
  callMaster(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone + '',
    })
  },

  cancel() {
    console.log('cancel')
  },


})