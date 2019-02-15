// pages/inspection/inspectionDetail/inspectionDetail.js
import api from '../../../utils/api.js';
var moment = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inspectiononeDetail: {},
    inspectionDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.inspectionDetail(id);
    this.inspectiononeDetail(id);
  },
  inspectionDetail(id) {
    var that = this;
    api({
      url: '/inspection/detail',
      method: 'GET',
      data: {
        inspectionId: id
      },
      success: function (res) {
        const { data } = res;
        const { items } = data;
        that.setData({
          inspectionDetail: items
        });
      }
    })
  },
  inspectiononeDetail(id) {
    var that = this;
    api({
      url: '/inspection/onedetail',
      method: 'GET',
      data: {
        id: id
      },
      success: function (res) {
        res.data.realDate = moment.formatTime(res.data.realDate, 'Y-M-D')
        that.setData({
          inspectiononeDetail: res.data
        });
      }
    })
  }
})