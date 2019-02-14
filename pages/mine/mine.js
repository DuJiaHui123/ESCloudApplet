// pages/mine/mine.js 
import api from '../../utils/api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  /** 
   * 页面的初始数据 
   */
  data: {
    userList: {}
  },
  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    this.getUser();
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
  },
  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

  },
  getUser() {
    var that = this;
    api({
      url: '/user/getLoginInfo',
      method: 'GET',
      success: function (res) {
        that.setData({
          userList: res.data
        })
      }
    })
  }
})