var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;
function getRad(d) {
  return d * PI / 180.0;
}

/**
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);

  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);

  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000.0;

  return s;
}

Page({
  data: {
    flag:true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    imageWidth: wx.getSystemInfoSync().windowWidth,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    dist: " ? ",
    height: undefined,
    
    'discount':[
      {
        "imgurl":'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-05.png',
        "coffee_title":"黑金醇香美式",
        "price":15,
        "id": 1,
      }
    ],

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
    'evens': [
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-03.png',
        "coffee_title": "粉红棉花糖摩卡",
        "price": 15,
        "id": 5,
      },
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-10.png',
        "coffee_title": "米兰优选卡布",
        "price": 15,
        "id": 6,
      },
      {
        "imgurl": 'http://p6hcfckqa.bkt.clouddn.com/%E5%92%96%E5%95%A1%E5%9B%BE%E6%A0%87-08.png',
        "coffee_title": "绿野抹茶拿铁",
        "price": 15,
        "id": 7,
      },
    ],

  },
  buy:function(){
    //this.setData({flag:false});
    wx.setStorage({
      key: 'order_nonpay',
      data: 'meishikafei',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    }),
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  buyHide: function () {

    this.setData({ flag: true });

  },
  billHide: function(){

    this.setData({flag:true})
  
  },
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: res.latitude, // 纬度，范围为-90~90，负数表示南纬
          longitude: res.longitude, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例          
        })
      }
    })
  },
  onLoad: function(){
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 4)
    })
    var d
    var that = this
    wx.getLocation({
      type: 'wgs84',
      altitude: 'true',
      success: function (res) {
        let mach
        wx.getStorage({
          key: 'mach',
          success: function (result) {
            mach = result.data
          }
        })
        d = getGreatCircleDistance(res.latitude, res.longitude, mach.latitude, mach.longitude)
        that.setData({
          dist: d
        })
      }
    })
    var disc = []
    var nor = []
    var od = []
    var eve = []
    var good
    wx.getStorage({
      key: 'good',
      success: function (loc) {
        good = loc.data
      }
    }) 
    for (var i in good){
      if (i.discount == undefined && i.discount ==0) {
        nor.push(i)
        if (nor.length % 2 == 1) od.push(i)
        else eve.push(i)
      } else disc.push(i)
    }
    that.setData({
      dicount: disc,
      normal: nor,
      odd: od,
      even: eve
    })
    setInterval(function () {
      wx.getLocation({
        type: 'wgs84',
        altitude: 'true',
        success: function (res) {
          let mach
          wx.getStorage({
            key: 'mach',
            success: function (loc) {
              mach = loc.data
            }
          })  
          d = getGreatCircleDistance(res.latitude, res.longitude, mach.latitude, mach.longitude)
          that.setData({
            dist: d
          })
        }
      })
      var disc = []
      var nor = []
      var od = []
      var eve = []
      var good
      wx.getStorage({
        key: 'good',
        success: function (loc) {
          good = loc.data
        }
      })
      for (var i in good) {
        if (i.discount == undefined && i.discount == 0) {
          nor.push(i)
          if (nor.length % 2 == 1) od.push(i)
          else eve.push(i)
        } else disc.push(i)
      }
      that.setData({
        dicount: disc,
        normal: nor,
        odd: od,
        even: eve
      })
    }, 5000)
  },
  onPullDownRedresh: function () {
    wx.stopPullDownRefresh()
    wx.getLocation({
      type: 'wgs84',
      altitude: 'true',
      success: function (res) {
        sendSocketMessage(`{'type': 'refreshIndex', 'latitude': '${res.latitude}', 'longitude': '${res.longitude}'}`)
      }
    })
  },
  tap: function (e) {
    var that = this
    var latitude
    var longitude
    wx.getStorage({
      key: 'mach',
      success: function (res) {
        latitude = res.data.latitude
        longitude = res.data.longitude
      }
    })
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 18
    })
  },
})  