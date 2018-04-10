// pages/movies/moviesDetails/moviesDetails.js
var app = getApp();
var util = require("../../../utils/util.js"); //公共js文件
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
    var _this = this;
    var detailsId = options.detailsId;
    var url = app.globalData.douBanBaseUrl + "/v2/movie/subject/" + detailsId;
    util.http(url, this.movieDetailsData);
    
  },

  movieDetailsData: function (res) {
    var data = res.data;
    var datalist = {};
    var directors = "";// 导演
    var castsName = ""; // 主演
    var genres = "";// 电影类型
    for (var i = 0; i < data.directors.length; i++) {// 导演
      if (i != 0) {
        directors += "、" + data.directors[i].name
      } else {
        directors += data.directors[i].name;
      }
    }
    for (var i = 0; i < data.casts.length; i++) {// 主演 影人
      if (i != 0) {
        castsName += " / " + data.casts[i].name
      } else {
        castsName += data.casts[i].name;
      }
    }
    for (var i = 0; i < data.genres.length; i++) {// 电影类型
      if (i != 0) {
        genres += "、" + data.genres[i]
      } else {
        genres += data.genres[i];
      }
    }
    datalist.title = data.title;// 片名
    datalist.countries = data.countries[0];// 国家
    datalist.year = data.year // 年份
    datalist.wish_count = data.wish_count; // 喜欢
    datalist.reviews_count = data.reviews_count; // 评论
    datalist.images = data.images.large; // 海报
    datalist.original_title = data.original_title; // 原名
    datalist.rating = {
      stars: util.convertToStarsArray(data.rating.stars),
      average: data.rating.average
    }; // 评分
    datalist.directors = directors; // 导演
    datalist.castsName = castsName; // 影人名字
    datalist.genres = genres; // 电影类型
    datalist.summary = data.summary; // 剧情介绍
    datalist.casts = data.casts;// 影人名字和头像
    this.setData({
      detailsData: datalist
    });
  },
  // 点击查看大图
  viewMoviesImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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