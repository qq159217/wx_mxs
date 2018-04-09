Page({
  data: {
    navbar: ['待付款', '待取货', '已付款'],
    currentTab: 0,
    height: undefined,
    good:'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-05.png',
    'odds': [
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-05.png',
        "coffee_title": "黑金醇香美式",
        "price": 15,
        "id": 1,
      },
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-06.png',
        "coffee_title": "卡其经典拿铁",
        "price": 15,
        "id": 2,
      },
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-09.png',
        "coffee_title": "古铜浓郁拿铁",
        "price": 15,
        "id": 3,
      },
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-07.png',
        "coffee_title": "蓝调丝绒摩卡",
        "price": 15,
        "id": 4,
      },
    ], 
  },

  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
  },

  onLoad: function(){
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 106)
    })
    var that = this
    wx.getStorage({
      key: 'order_nonpay',
      success: function (res) {
        that.setData({
          nonpay: res.data
        })
      }
    })
    wx.getStorage({
      key: 'order_pay',
      success: function (res) {
        that.setData({
          pay: res.data
        })
      }
    })
    wx.getStorage({
      key: 'order_finish',
      success: function (res) {
        that.setData({
          finish: res.data
        })
      }
    })
    setInterval(function () {
      wx.getStorage({
        key: 'order_nonpay',
        success: function (res) {
          that.setData({
            nonpay: res.data
          })
        }
      })
      wx.getStorage({
        key: 'order_pay',
        success: function (res) {
          that.setData({
            pay: res.data
          })
        }
      })
      wx.getStorage({
        key: 'order_finish',
        success: function (res) {
          that.setData({
            finish: res.data
          })
        }
      })
    },1000)
  },
  onPullDownRedresh: function () {
    wx.stopPullDownRefresh()
    wx.getStorage({
      key: 'opind',
      success: function (usr) {
        sendSocketMessage(`{'type': 'refreshOrder', 'openid': '${usr.data}'}`)
      }
    }) 
  },

})