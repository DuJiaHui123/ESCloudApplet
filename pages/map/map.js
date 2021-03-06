// pages/map/map.js
import api from '../../utils/api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
// import QQMapWX from '../../utils/map.js';
// const qqmapsdk = new QQMapWX({
//   key: 'ZOUBZ-AJGKU-KZRVO-BFSFF-W4BYV-TWB2J' // 必填
// });
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapKey: 'ZOUBZ-AJGKU-KZRVO-BFSFF-W4BYV-TWB2J',
    markers: [],
    latitude: '',
    longitude: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    this.getSearch();
    wx.getLocation({
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
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
    this.getSearch();
  },
  getSearch() {
    const { markers } = this.data;
    var that = this;
    api({
      url: '/device/all',
      method: 'GET',
      success: function (res) {
        res.data.map(e => {
          markers.push({
            latitude: e.lat,
            longitude: e.lng,
            title: e.siteName,
            iconPath: "../../static/img/coordinate.png"
          })
          that.setData({
            markers
          })
        })
      }
    })
  }
})