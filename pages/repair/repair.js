// pages/repair/repair.js
import api from '../../utils/api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    if (!token) {
      Dialog.alert({
        title: '提示',
        message: '您未登录，点击确认立即前往登录'
      }).then(() => {
        wx.redirectTo({
          url: '../account/SignIn'
        })
      });
    }
  }
})