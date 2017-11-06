const host = 'http://119.23.255.177:8090/api/v1/'
// const app = getApp()

// 请求 promise 封装
const _http = {
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'GET',
        success: res => {
          if (res.data.code === "200") {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      // const realData = Object.assign()
      // console.log(app.globalData._token)
      wx.request({
        url,
        data,
        method: 'POST',
        success: res => {
          if (res.data.code === "200") {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}

const errFnc = function (err) {
  const message = err.data ? err.data.msg : err
  wx.showModal({
    title: '提示',
    content: message,
  })
}

const api = {

  /**
   * 登录获取 token
   * @params {object} data  {code, iv, encryptedData}
   * @params {function} cb 回调
   */
  login(data, cb) {
    _http.post(`${host}login`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取广告
   * @params {object} data {name, number, address, latitude, longitude, token}
   * @params {function} cb 回调
   */
  postReserve(data, cb) {
    _http.post(`${host}reserve`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取广告轮播
   * @params {object} data {type, others}
   * @params {function} cb 回调
   */
  getAdverts(data, cb) {
    _http.get(`${host}adverts`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取商品信息
   * @params {object} data {(title), page, limmit }
   * @params {function} cb 回调
   */
  getCommodities(data, cb) {
    _http.get(`${host}commodities`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取商品
   * @params {string} id 
   * @params {function} cb
   */
  getCommodity(id, cb) {
    _http.get(`${host}commodity/${id}`)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取商品库存
   * @params {array} data [1,2,..]
   * @params {function} cb 回调
   */
  getCommodityStandard(data, cb) {
    _http.get(`${host}product`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 付款，向微信获取订单号
   * @params {object} data {address, (description), token, products}
   * @params {function} cb 回调
   */
  postPorduct(data, cb){
    _http.post(`${host}order`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取我的预约
   * @params {object} data {token, state, (page), (limit)}
   * @params cb 回调
   */
  getMyReserve(data, cb) {
    _http.get(`${host}my/reserves`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取我的订单
   * @params {object} data {token, state, (page), (limit)}
   * @params {function} cb 回调
   */
  getMyOrder(data, cb){
    _http.get(`${host}my/orders`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 确认收货
   * @params {string} id 
   * @params {object} data {token}
   * @params {function} cb
   */
  confirmOrder(id, data, cb){
    _http.get(`${host}confirm/${id}`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  }
}

module.exports = { api }