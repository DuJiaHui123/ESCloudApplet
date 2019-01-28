  //index.js
  import api from '../../utils/api.js'
  import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
  //获取应用实例
  const app = getApp()

  Page({
    data: {

    },
    onLoad: function() {
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
    // 获取人员
    getUser() {
      api({
        url: '/user/test',
        method: 'GET',
        success: function(res) {
          console.log(res.data)
        }
      })
    }
  })