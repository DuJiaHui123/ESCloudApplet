// pages/repair/repair.js
import api from '../../utils/api.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
var moment = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repairList: [],
    pageSize: 10,
    pageInfo: {},
    moreFlag: false,
    REPAIR_STATUS: {
      PENDING: '待处理',
      ASSIGNED: '已指派',
      RECEIVED: '已接单',
      DONE: '已完成',
    },
    REPAIR_STATUS_CLASSNAME: {
      PENDING: 'item-status-zero',
      ASSIGNED: 'item-status-one',
      RECEIVED: 'item-status-two',
      DONE: 'item-status-three',
    },
  },
  getRepairList() {
    const { pageSize } = this.data;
    var that = this;
    api({
      url: '/repairs/list',
      method: 'POST',
      data: {
        page: 1,
        pageSize
      },
      success: function (res) {
        const { data } = res
        for (let i = 0; i < data.list.length; i++) {
          data.list[i].createDate = moment.formatTime(data.list[i].createDate, 'Y-M-D h:m')
        }
        that.setData({
          repairList: data.list,
          pageInfo: data.pageInfo
        });
        console.log(pageSize);
        if (pageSize === 11) {
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          });
        }
        // // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.setData({
      pageSize: 11
    }, () => {
      this.getRepairList();
    });
  },
  onReachBottom: function () {
    let that = this;
    const { pageSize, pageInfo } = that.data;
    console.log(pageInfo);
    if (pageInfo.pageSize > pageInfo.totalRecord) {
      wx.showToast({
        title: '没有更多记录了',
        icon: 'none',
        success: function () {
          setTimeout(() => {
            wx.hideToast()
          }, 1000);
        }
      });
      return;
    }
    wx.showLoading({
      title: '玩命加载中',
    });
    that.setData({
      pageSize: pageSize + 5
    }, () => {
      that.getRepairList();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRepairList();
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