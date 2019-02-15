// pages/inspection/inspectionDetail/inspectionDetail.js
import api from '../../../utils/api.js'
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
        console.log(res.data);
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
        console.log(res.data);
        that.setData({
          inspectiononeDetail: res.data
        });
      }
    })
  }
})