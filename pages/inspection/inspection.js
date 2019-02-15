// pages/inspection/inspection.js
import api from '../../utils/api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inspectionList: [],
    page: 1,
    pageSize: 5,
    pageInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this.getInspectionList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getInspectionList(num) {
    var that = this;
    const {
      data
    } = that;
    const {
      pageSize
    } = data;
    api({
      url: '/inspection/list',
      method: 'POST',
      data: {
        inspectorId: "",
        page: 1,
        pageSize: pageSize,
        realDateRange: "",
        siteId: ""
      },
      success: function(res) {
        const {
          data
        } = res;
        const {
          list,
          pageInfo
        } = data;
        that.setData({
          inspectionList: list,
          pageInfo
        });
        if(num == 1){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉刷新
          wx.stopPullDownRefresh();
          wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.hideLoading();
        }
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    that.getInspectionList(1);
  },
  // 上拉加载
  onReachBottom() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    });
    const {
      data
    } = that;
    const {
      pageSize,
      pageInfo
    } = data;
    that.setData({
      pageSize: pageSize + 5
    })
    if (pageInfo.pageSize >= pageInfo.totalRecord) {
      wx.showLoading({
        title: '没有更多记录了',
        success: function() {
          setTimeout(() => {
            wx.hideLoading();
          }, 1000)
        }
      });
      return;
    }
    this.getInspectionList(2);
  }
})