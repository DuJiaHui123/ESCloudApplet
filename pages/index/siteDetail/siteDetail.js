// pages/index/siteDetail.js
import api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    console.log(id);
    this.getUser(id);
  },
  getUser(id) {
    api({
      url: '/device/getBySiteId',
      method: 'GET',
      data: {
        siteId: id
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})