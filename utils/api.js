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
   * @param {object} data  {code, iv, encryptedData}
   * @param {function} cb 回调
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
   * @param {object} data {name, number, address, latitude, longitude, token}
   * @param {function} cb 回调
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
   * @param {object} data {type, others}
   * @param {function} cb 回调
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
   * @param {object} data {(title), page, limmit }
   * @param {function} cb 回调
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
   * @param {string} id 
   * @param {function} cb
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
   * @param {array} data [1,2,..]
   * @param {function} cb 回调
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
   * @param {object} data {address, (description), token, products}
   * @param {function} cb 回调
   */
  postPorduct(data, cb) {
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
   * @param {object} data {token, state, (page), (limit)}
   * @param cb 回调
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
   * @param {object} data {token, state, (page), (limit)}
   * @param {function} cb 回调
   */
  getMyOrder(data, cb) {
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
   * @param {string} id 
   * @param {object} data {token}
   * @param {function} cb
   */
  confirmOrder(id, data, cb) {
    _http.get(`${host}confirm/${id}`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 师傅入驻
   * @param {object} data {token, phone, password, city, address, name, id_card}
   * @param {function} cb
   */
  postWorker(data, cb) {
    _http.post(`${host}worker`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 获取师傅的订单
   * @param {object} data {token, type, (limit), (page)}
   * @param {function} cb 回调
   */
  getWorkerReserves(data, cb) {
    _http.get(`${host}worker/reserves`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  },

  /**
   * 师傅接单
   * @param {string} id
   * @param {object} data {token}
   * @param {function} cb 回调
   */
  acceptReserve(id, data, cb) {
    wx.showLoading({
      title: '抢单中',
    })
    _http.get(`${host}accept/reserve/${id}`, data)
      .then(res => {
        wx.hideLoading()
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        wx.hideLoading()
        errFnc(err)
      })
  },

  /**
   * 获取公司简介
   * @param {object} data {type}
   * @param {function} cb 回调
   */
  getArticle(data, cb) {
    _http.get(`${host}article`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      })
      .catch(err => {
        errFnc(err)
      })
  }
}

module.exports = { api }