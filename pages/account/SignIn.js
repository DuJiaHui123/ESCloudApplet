// pages/account/SignIn.js
import api from '../../utils/api.js'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoPng: '../../static/img/logo.png',
    bgJpg: '../../static/img/bg2.jpg',
    mobile: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  changeMobile(res) {
    this.setData({
      mobile: res.detail
    })
  },
  changePassword(res) {
    this.setData({
      password: res.detail
    })
  },
  clickLogin() {
    const { mobile, password } = this.data;
    if (!mobile.trim()) {
      Toast.fail('请输入手机号');
      return;
    }
    if (!password) {
      Toast.fail('请输入密码');
      return;
    }
    api({
      url: '/user/signin',
      method: 'POST',
      data: {
        mobile,
        password,
        terminalMark: '小程序',
      },
      success: function (res) {
        if (res.statusCode == 200) {
          const { token } = res.data;
          wx.setStorageSync('token', token);
          wx.switchTab({
            url: '../index/index'
          })
        } else if (res.statusCode == 500) {
          Toast.fail('请输入正确的手机号和密码');
          return;
        }
      }
    })
  }
})