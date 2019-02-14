// pages/mine/mine.js
import api from '../../utils/api.js'
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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getUser(){
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