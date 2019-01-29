  //index.js
  import api from '../../utils/api.js'
  import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
  //获取应用实例
  const app = getApp()

  Page({
    data: {
      show: true,
      areaAll: {
        province_list: {
          110000: '北京市'
        },
        city_list: {
          110100: '北京市'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区'
        }
      }
    },
    onLoad: function() {
      console.log(this.data.areaAll);
      this.getUser();
      // this.getArea();
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
    },
    getArea() {
      var that = this;
      api({
        url: '/area/all',
        method: 'GET',
        success: function (res) {
          console.log(res.data)
          that.setData({
            areaAll: res.data
          });
        }
      })
    }
  })