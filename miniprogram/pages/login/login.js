// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPassword: "",
    isShowPassword : true,
    imgSrc:"../../images/close.png"

  },

  checkUserExist: async function () {
    var that = this
    const db = wx.cloud.database()
    const res = await db.collection("userInfo").where({
      userName: that.data.userName
    }).get()
    if (res.data.length == 0) {
      // 用户未注册
      wx.showToast({
        title: '请先注册',
        icon : "none"
      })
      return false
    } else {
      // 用户已注册，密码正确，登陆成功
      var password = res.data[0].password
      if (password == that.data.userPassword) {
       /* wx.showToast({
          title: '登录成功',
        })*/
        app.globalData.password = res.data[0].password
        app.globalData._id = res.data[0]._id
        app.globalData.userName = res.data[0].userName
        return true
      } else {
        // 密码错误
        wx.showToast({
          title: '密码错误',
          icon : "none"
        })
        return false
      }
    }
    /* console.log(res.data[0].password)
     var password = res.data[0].password*/

  },

  navigatorToChoose: async function () {
    var that = this
    const loginState = await that.checkUserExist()
    if (loginState == true) {
      wx.navigateTo({
        url: '../choose/choose',
      })
    }
  },

  register : function(){
    var that = this
    wx.navigateTo({
      url: '../register/register',
    })
  },

  getUserName: function (e) {
    var that = this
    that.data.userName = e.detail.value
    //console.log(that.data.userName) 
  },
  getUserPassword: function (e) {
    var that = this
    that.data.userPassword = e.detail.value
  },
  showPassword : function(){
    var that = this
    if(that.data.isShowPassword == true){
      that.setData({
        isShowPassword : false,
        imgSrc:"../../images/open.png"
      })
    }
    else{
      that.setData({
        isShowPassword : true,
        imgSrc:"../../images/close.png"
      })
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