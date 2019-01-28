import C from './config.js'
import Promise from './bluebird.core.min.js';
var request = function(req) {
  // url, method, data, success, err, auth
  const isLogin = C.isLogin;
  wx.showLoading({
    title: '请稍后...'
  });
  var token = wx.getStorageSync('token');
  if (token) {
    wx.request({
      url: C.url + req.url,
      data: req.data,
      method: req.method,
      complete: function() {
        wx.hideLoading();
      },
      success: req.success,
      fail: req.fail,
      header: {
        'content-type': 'application/json',
        authorization: token
      },
      headers: {
        authorization: token
      }
    })
  } else {
    wx.request({
      url: C.url + req.url,
      data: req.data,
      method: req.method,
      complete: function() {
        wx.hideLoading();
      },
      success: req.success,
      fail: req.fail,
      header: {
        'content-type': 'application/json'
      }
    })
  }

}
export default request;