// pages/movies/movies.js
var app = getApp();
var util = require("../../utils/util.js"); //公共js文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isContainerPage:true,
    isSearchPage:false,
    searchValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var douBanBaseUrl = app.globalData.douBanBaseUrl;
    var in_theaters_url = douBanBaseUrl + '/v2/movie/in_theaters?start=0&count=3';
    var coming_soon_url = douBanBaseUrl + '/v2/movie/coming_soon?start=0&count=3';
    var top250_url = douBanBaseUrl + '/v2/movie/top250?start=0&count=3'; 

    this.getMoviesData(in_theaters_url, '正在热映', 'in_theaters');
    this.getMoviesData(coming_soon_url, '即将上映', 'coming_soon');
    this.getMoviesData(top250_url, 'top250', 'top250'); 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  onMoviesDetailsTap:function(event){
    var detailsId = event.currentTarget.dataset.detailsId;
    wx.navigateTo({
      url: './moviesDetails/moviesDetails?detailsId=' + detailsId,
    })
  },

  getMoviesData:function(url,moduleTitle,moduleName){
    var _this = this;
    wx.showLoading({
      title: '加载中。。。',
    })
    wx.request({
      url: url,
      success: function (res) {
        _this.douBanMoviesData(res, moduleTitle, moduleName);
      }
    })
  },
  douBanMoviesData: function (res, moduleTitle, moduleName){
    //console.log(res);
    wx.hideLoading();
    wx.stopPullDownRefresh();
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
    var readyData = {};
    readyData[moduleName] = { // readyData[moduleName] 这个写法：表示moduleName是一个变量
      id: moduleName,// 这个id控制《更多》跳转
      title: moduleTitle,
      subjects: aData
    }
    this.setData(readyData);
        //console.log(readyData);
  },
  // 更多电影列表
  onMoreMoviesTap:function(event){
    var douBanBaseUrl = app.globalData.douBanBaseUrl;
    var url = douBanBaseUrl + '/v2/movie/' + event.currentTarget.dataset.moviesId
    wx.navigateTo({
      url: './more/more?moviesId=' + event.currentTarget.dataset.moviesId,
      success: function(res) {}
    })
  },
  // 得到焦点
  onBindFocus:function(){
    this.setData({
      isContainerPage:false,
      isSearchPage:true
    });
  },
  closeSearch: function (event){
    this.setData({
      isContainerPage: true,
      isSearchPage: false,
      searchData:{},
      searchValue:''
    });
  },
  // 点击键盘‘完成’触发的事件
  onBindConfirm:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.douBanBaseUrl + '/v2/movie/search?q=' + text;
    this.getMoviesData(searchUrl, '', 'searchData'); 
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