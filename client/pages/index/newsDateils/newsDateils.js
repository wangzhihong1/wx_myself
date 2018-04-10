// pages/index/newsDateils.js
var app = getApp();
var newsData = require("../../../data/data-template.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    details: {},
    isCollection: false,
    isMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      id: options.newsId,
      details: newsData[options.newsId]
    });
    wx.getBackgroundAudioPlayerState({ // 获取播放状态
      success: function (res) {
        //console.log(res.status);
        if (res.status == 1) {// 1 正在播放
          if (app.globalData.musicId == _this.data.id) {
            _this.setData({
              isMusic: true
            });
          } else {
            _this.setData({
              isMusic: false
            });
          }

        } else if (res.status == 0) { // 0 未播放
          _this.setData({
            isMusic: false
          });
        }
      }
    })
    wx.onBackgroundAudioStop(function () { // 监听音乐停止
      if (app.globalData.musicId == _this.data.id) {
        _this.setData({
          isMusic: true
        });
      } else {
        _this.setData({
          isMusic: false
        });
      }
    })
    wx.onBackgroundAudioPlay(function () { // 控件里播放时触发
      console.log("继续播放");
      if (app.globalData.musicId == _this.data.id) {
        _this.setData({
          isMusic: true
        });
      } else {
        _this.setData({
          isMusic: false
        });
      }
    })
    wx.onBackgroundAudioPause(function () { // 控件里暂停播放时触发
      console.log("暂停播放");
      if (app.globalData.musicId == _this.data.id) {
        _this.setData({
          isMusic: true
        });
      } else {
        _this.setData({
          isMusic: false
        });
      }
    })
  },
  // 点击图标 音乐
  onMusicTap: function () {
    app.globalData.musicId = this.data.id;
    console.log(app.globalData.musicId);
    var _this = this;
    if (_this.data.isMusic) {
      _this.setData({
        isMusic: false
      });
      wx.pauseBackgroundAudio();// 暂停播放
    } else {
      _this.setData({
        isMusic: true
      });
      wx.playBackgroundAudio({ // 打开音乐
        title: _this.data.details.music.title,
        dataUrl: _this.data.details.music.url,
        coverImgUrl: _this.data.details.music.coverImg,
        success: function () {
          console.log("正在播放。。");
        }
      })
    }



  },
  // 收藏
  onCollectionTap: function () {
    var _this = this;
    var text = this.data.isCollection ? '是否要取消收藏？' : '是否要收藏？';
    wx.showModal({
      content: text,
      success: function (res) {
        if (res.confirm) {
          if (_this.data.isCollection) {
            _this.setData({
              isCollection: false
            });
          } else {
            _this.setData({
              isCollection: true
            });
          }
        }
      }
    })
  },
  // 分享
  onShareTap: function () {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到朋友圈', '分享到QQ空间', '分享到微博'],
      success: function (res) {
        console.log(res.tapIndex);
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})