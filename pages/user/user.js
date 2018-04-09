Page({
  data: {
    avatarUrl: undefined,
    nickName: undefined,
    gender: 0,
    height: undefined,
    bonus : 12
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
  onLoad: function () {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight - ((wx.getSystemInfoSync().screenWidth / 750) * 4)
    })
    var url = wx.getStorageSync('avatarUrl')
    var name = wx.getStorageSync('nickName')
    var gen = wx.getStorageSync('gender')
    this.setData({
      'avatarUrl': url,
      'nickName': name,
      'gender': gen
    })
  }
})
