// pages/index/siteDetail.js
import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boolean: false,
    showState: false,
    deviceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.siteDetail(id);
  },
  siteDetail(id) {
    var that = this;
    api({
      url: '/device/getBySiteId',
      method: 'GET',
      data: {
        siteId: id
      },
      success: function (res) {
        if(res.data.length != 0){
          that.setData({
            boolean: true,
            deviceList: res.data
          })
        }
      }
    })
  }
})