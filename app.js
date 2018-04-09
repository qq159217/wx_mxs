var util = require('utils/util.js')
App({

  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          var appid = 'wx2194a902a44884f4'
          var secret = 'ab17513937fc4619374de9fdb9bd1cd3'
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
            success: function (id) {
              if (id.data.openid) {
                wx.setStorage({
                  key: 'openid',
                  data: id.data.openid
                })
                wx.authorize({
                  scope: 'scope.userInfo',
                  fali: function () {
                    console.log('未取得用户信息权限！')
                  }
                })
                wx.authorize({
                  scope: 'scope.userLocation',
                  fali: function () {
                    console.log('未取得地理位置权限！')
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + id.errmsg)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      success: function (res) {
        wx.setStorage({
          key: 'nickName',
          data: res.userInfo.nickName
        })
        wx.setStorage({
          key: 'avatarUrl',
          data: res.userInfo.avatarUrl
        })
        wx.setStorage({
          key: 'gender',
          data: res.userInfo.gender
        })
      }
    })  
    wx.getLocation({
      type: 'wgs84',
      altitude: 'true',
      success: function (res) {
        wx.setStorage({
          key: 'latitude',
          data: res.latitude
        })
        wx.setStorage({
          key: 'longitude',
          data: res.longitude
        })
      }
    })
    var socketOpen = false
    var socketMsgQueue = []
    wx.connectSocket({
      url: 'ws://192.168.0.111:8001'
    })
    wx.onSocketOpen(function (res) {
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }
    var openid = wx.getStorageSync('openid')
    var latitude = wx.getStorageSync('latitude')
    var longitude = wx.getStorageSync('longitude')
    sendSocketMessage(`{"type":"Load","openid":"${openid}","latitude":"${latitude}","longitude":"${longitude}"}`)
    wx.onSocketMessage(function (res) {
      if (res.type == 'Load') {
        wx.setStorage({
          key: 'good',
          data: res.good
        })
        wx.setStorage({
          key: 'mach',
          data: res.mach
        })
        wx.setStorage({
          key: 'order_nonpay',
          data: res.order_nonpay
        })
        wx.setStorage({
          key: 'order_pay',
          data: res.order_pay
        })
        wx.setStorage({
          key: 'order_finish',
          data: res.order_finish
        })
      } else if (res.type == 'refreshIndex') {
        wx.setStorage({
          key: 'good',
          data: res.good
        })
        wx.setStorage({
          key: 'mach',
          data: res.mach
        })
      } else if (res.type == 'refreshOrder') {
        wx.setStorage({
          key: 'order_nonpay',
          data: res.order_nonpay
        })
        wx.setStorage({
          key: 'order_pay',
          data: res.order_pay
        })
        wx.setStorage({
          key: 'order_finish',
          data: res.order_finish
        })
      } 
    })
  }
})