// pages/movies/more/more.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl:'',
    startNum:0,
    isStatus:true,
    newMoviesList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var douBanBaseUrl = app.globalData.douBanBaseUrl;
    var url = douBanBaseUrl + '/v2/movie/' + options.moviesId;
    var _this = this;
    var pageTitle = '';
    if (options.moviesId == 'in_theaters'){
      pageTitle = '正在热映'
    } else if (options.moviesId == 'coming_soon'){
      pageTitle = '即将上映'
    } else if (options.moviesId == 'top250'){
      pageTitle = 'top250'
    }
    wx.setNavigationBarTitle({
      title: pageTitle
    })
    this.data.requestUrl = options.moviesId;
    this.httpData(url);
  },
  httpData:function(url){
    var _this = this;
    wx.request({
      url: url,
      success: function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        //console.log(res.data.subjects);
        var subjects = res.data.subjects;
        var aData = [];
        var title = '';
        //console.log(res);
        for (var i = 0; i < subjects.length; i++) {
          if (subjects[i].title.length > 6) {
            title = subjects[i].title.substring(0, 6) + '...';
          } else {
            title = subjects[i].title;
          }
          var obj = {
            "id": subjects[i].id,
            "title": title,
            "images": subjects[i].images,
            "rating": {
              stars: util.convertToStarsArray(subjects[i].rating.stars),
              average: subjects[i].rating.average
            }
          }
          aData.push(obj);
        }
        
        if (!_this.data.isStatus){
          _this.data.newMoviesList = _this.data.newMoviesList.concat(aData);
        }else{
          _this.data.newMoviesList = aData;
          _this.data.isStatus = false;
        }
        _this.setData({
          subjects: _this.data.newMoviesList
        });
        _this.data.startNum += 20;
      }
    })
  },

  onMoviesDetailsTap:function(event){
    var detailsId = event.currentTarget.dataset.detailsId;
    wx.navigateTo({
      url: '../moviesDetails/moviesDetails?detailsId=' + detailsId,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    var douBanBaseUrl = app.globalData.douBanBaseUrl;
    var url = douBanBaseUrl + '/v2/movie/' + this.data.requestUrl +'?start=0&count=20';
    this.data.newMoviesList = [];
    this.data.isStatus = true;
    this.httpData(url);
    //console.log(url);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    var url = app.globalData.douBanBaseUrl + '/v2/movie/' +
    this.data.requestUrl + '?start=' + this.data.startNum + '&count=20';
    this.httpData(url);
    //console.log(url);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})