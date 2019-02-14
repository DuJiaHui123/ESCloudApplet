  //index.js
  import api from '../../utils/api.js'
  import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
  //获取应用实例
  const app = getApp()

  Page({
    data: {
      show: false,
      areaList: {},
      siteListL: [],
      area: '',
      areaName: {},
      boolean: false,
      bgJpg: '../../static/img/spacechose.png'
    },
    onLoad: function() {
      this.getUser();
      this.getArea();
      this.getSite();
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
    // 获取人员(测试)
    getUser() {
      api({
        url: '/user/test',
        method: 'GET',
        success: function(res) {
          // console.log(res.data)
        }
      })
    },
    // 获取区域
    getArea() {
      var that = this;
      var areaAll = {
        province_list: {},
        city_list: {},
        county_list: {}
      };
      // var all = { id:1, name: "所有站点" };
      api({
        url: '/area/getOpen',
        method: 'GET',
        success: function (res) {
          const { data } = res
          data.map(p => {
            areaAll.province_list[p.id] = p.name
            p.children.map(c => {
              areaAll.city_list[c.id] = c.name
              c.children.map(a => {
                areaAll.county_list[a.id] = a.name
              })
            })
          })
          that.setData({
            areaList: areaAll
          })
        }
      })
    },
    // 获取所有站点
    getSite() {
      const { area } = this.data;
      var that = this;
      api({
        url: '/site/search',
        method: 'GET',
        data: {
          area,
          page: 1,
          pageSize: 999
        },
        success: function (res) {
          res.data.list.map(e => {
            if (e.deviceNum == null){
              e.deviceNum = 0
            }
          })
          that.setData({
            siteList: res.data.list
          });
        }
      })
    },
    clickArea() {
      this.setData({
        show: true
      })
    },
    areaConfirm(e) {
      var areaName = {}
      const { detail } = e;
      const { values } = detail;
      var area = Number(values[values.length - 1].code);
      areaName.provinceName = values[0].name;
      areaName.cityName = values[1].name;
      areaName.countyName = values[2].name;
      this.setData({
        area,
        areaName,
        boolean: true
      })
      this.areaCancel();
      this.getSite();
    },
    areaCancel() {
      this.setData({
        show: false
      })
    },
    toSiteDetail(e) {
      wx.navigateTo({
        //目的页面地址
        url: './siteDetail/siteDetail?id=' + [e.currentTarget.id],
      })
    }
  })