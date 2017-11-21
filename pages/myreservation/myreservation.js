// pages/myreservation/myreservation.js
const app = getApp()
Page({

  data: {

    showMaster: false,
    currentMaster: null,
    showComment: false,
    showYourComment: false,

    currentConfirmId: 0,
    currentConfirmIndex: 0,
    currentFinishIndex: 0,

    //导航
    currentNav: 0,
    currentType: 1,
    navs: [
      {
        type: 1,
        name: '已指派',
      },
      {
        type: 0,
        name: '未响应',
      },
      {
        type: 2,
        name: '已完成',
      }
    ],

    lowerFlag: false,
    reservationFlag: {
      0: false,
      1: false,
      2: false
    },
    pages: {
      0: 1,
      1: 1,
      2: 1
    },

    //接口数据
    reservations: {
      0: [],
      1: [],
      2: []
    },
  },

  onLoad() {
    app._api.getMyReserve({ token: app.globalData._token, state: 1 }, res => {
      this.setData({
        'reservations[1]': res.data.data
      })
    })
  },

  //导航切换
  switchNav(e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type
    const temp = `reservations[${type}]`
    const tmpPage = `pages[${type}]`
    const tmpFlag = `reservationFlag[${type}]`
    if (index === this.data.currentNav) {
      return false
    }
    // if (this.data.reservations[type] && this.data.reservations[type].length > 0) {
    //   this.setData({
    //     currentNav: index,
    //     currentType: type
    //   })
    // }
    // else {
    //   app._api.getMyReserve({ token: app.globalData._token, state: type }, res => {
    //     this.setData({
    //       [temp]: res.data.data,
    //       currentNav: index,
    //       currentType: type
    //     })
    //   })
    // }
    app._api.getMyReserve({ token: app.globalData._token, state: type }, res => {
      this.setData({
        [temp]: res.data.data,
        currentNav: index,
        currentType: type,
        [tmpPage]: 1,
        [tmpFlag]: false
      })
    })
  },

  //触底加载
  getMoreReservation() {
    const lowerFlag = this.data.lowerFlag
    const currentType = this.data.currentType
    const currentFlag = this.data.reservationFlag[currentType]
    const page = this.data.pages[currentType]
    const temp = `reservations[${currentType}]`
    const tempFlag = `reservationFlag[${currentType}]`
    const tempPage = `pages[${currentType}]`
    if (lowerFlag || currentFlag) {
      return false
    }
    this.setData({
      lowerFlag: true
    })
    app._api.getMyReserve({ token: app.globalData._token, state: currentType, page: (page + 1) }, res => {
      if (res.data.data.length) {
        this.setData({
          [temp]: [...this.data.reservations[currentType], ...res.data.data],
          lowerFlag: false,
          [tempPage]: page + 1
        })
      } else {
        this.setData({
          [tempFlag]: true,
          lowerFlag: false,
          [tempPage]: page + 1
        })
      }
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
      case 'confirm':
        that.confirm(e)
        break
      default: return false
    }
  },

  //显示、关闭师傅面板 
  checkMaster(e) {
    const master = e.target.dataset.master
    this.setData({
      showMaster: true,
      currentMaster: master.worker
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

  hideComment() {
    this.setData({
      showComment: false
    })
  },

  onlyShowComment() {
    this.setData({
      showComment: true
    })
  },

  showYourComment(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      showYourComment: true,
      currentFinishIndex: index
    })
  },

  hideYourComment() {
    this.setData({
      showYourComment: false
    })
  },

  onlyShowYourComment() {
    this.setData({
      showYourComment: true
    })
  },

  confirm(e) {
    console.log(e)
    this.setData({
      showComment: true,
      currentConfirmId: e.currentTarget.dataset.id,
      currentConfirmIndex: e.currentTarget.dataset.index
    })
  },

  //确认收货
  confirmReservation(e) {
    const id = this.data.currentConfirmId
    const index = this.data.currentConfirmIndex
    let list = this.data.reservations[1]
    const textarea = e.detail.value.comment
    wx.showModal({
      title: '提示',
      content: '确认完成吗？',
      success: confirm => {
        if (confirm.confirm) {
          app._api.confirmReserve(id, { token: app.globalData._token, comment: textarea }, res => {
            list.splice(index, 1)
            this.setData({
              'reservations[1]': list,
              showComment: false
            })
            wx.showToast({
              title: '已确认',
            })
          })
        }
      }
    })
  },


})