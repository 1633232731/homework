// miniprogram/pages/reviewTest/reviewTest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    review : [],
  },

  getMistake : function(){
    
    console.log(that.data.review)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      review : app.globalData.review
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