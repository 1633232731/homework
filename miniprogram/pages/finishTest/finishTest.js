// miniprogram/pages/finishTest/finishTest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    correct : 0,
    wrong : 0,
    score : 0,
  },

  logout : function(){
    app.globalData.review = "",
    app.globalData.correct = 0,
    app.globalData.wrong = 0,
    wx.reLaunch({
      url: '../login/login',
    })
  },

  continue : function(){
    app.globalData.review = "",
    app.globalData.correct = 0,
    app.globalData.wrong = 0,
    wx.navigateTo({
      url: '../choose/choose',
    })
  },

  review : function(){
    var that = this
    wx.navigateTo({
      url: '../reviewTest/reviewTest',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.globalData.order = 0
    that.setData({
      score : app.globalData.score,
      wrong : app.globalData.wrong,
      correct : app.globalData.correct,
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