const host = 'http://119.23.255.177:8090/api/v1/'

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
   * @params {function} cb 
   */
  login(data, cb) {
    _http.post(`${host}login`, data)
      .then(res => {
        typeof cb === 'function' && cb(res)
      }).catch(err => {
        errFnc(err)
      })
  }
}

module.exports = { api }