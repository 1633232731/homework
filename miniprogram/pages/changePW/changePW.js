// miniprogram/pages/changePW/changePW.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPassword : "",
    confirmPassword : "",
    formerPassword : ""
  },

  getNewPassword : function(e){
    var that=this
    that.data.newPassword=e.detail.value
  },

  getConfirmPassword : function(e){
    var that=this
    that.data.confirmPassword=e.detail.value
  },

  getFormerPassword : function(e){
    var that=this
    that.data.formerPassword=e.detail.value
  },

  checkFormerPassword : function(){
    var that = this
    if(that.data.formerPassword == app.globalData.password){
      // 原密码正确
      return true
    }
    else{
      return false
    }
  },
  
  checkNewPasswordSame : function(){
    var that = this
    if (that.data.newPassword == that.data.confirmPassword){
      return true
    }
    else{
      return false
    }
  },
  checkPasswordValid : function(){
    var that = this
    var reg1=/^\w{6,10}$/;
    var reg2=/[0-9]+/;
    var reg3=/[a-z]+/;
    var reg4=/[A-Z]+/;
    return reg1.test(that.data.newPassword)//&reg2.test(that.data.newPassword)&reg3.test(that.data.newPassword)&reg4.test(that.data.newPassword);
  },
  checkChanging :async function(){
    var that = this
    var isFormerCorrect = that.checkFormerPassword()
    var isNewPasswordSame = that.checkNewPasswordSame()
    const db = wx.cloud.database()
    if(isFormerCorrect == true && isNewPasswordSame == true && that.checkPasswordValid()){
      const res = await db.collection("userInfo").doc(app.globalData._id).update({
        data: {
          password: that.data.newPassword
        }
      })
      wx.showToast({
        title: '修改密码成功',
        icon : "none"
      })
      wx.reLaunch({
        url: '../login/login'
      })
    }
    else{
      if(isFormerCorrect == false){
        wx.showToast({
          title: '原密码错误',
          icon : "none"
        })
      }
      if (isNewPasswordSame == false){
        wx.showToast({
          title: '两次密码输入不一致',
          icon : "none"
        })
      }
      if(!that.checkPasswordValid()){
        wx.showToast({
          title: '请设置6-10位包含数字和大、小写字母的密码',
          icon : "none"
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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