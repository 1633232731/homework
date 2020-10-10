// miniprogram/pages/teacherPage/teacherPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerClass: ["1", "2", "3"],
    selectClass: "请选择",
    student : [{id:"201808010425",name:"zxc"},{id:"201808010430",name:"kkk"}]
  },

  navigateStudentDetail : function(e){
    console.log(e.currentTarget.dataset.item)
    app.globalData.studentInfo.id = e.currentTarget.dataset.item.id
    app.globalData.studentInfo.name = e.currentTarget.dataset.item.name

    wx.navigateTo({
      url: 'studentDetail/studentDetail',
    })
  },
  onGetClass : async function(){
    /**
     * 从服务器获取班级列表并放入that.data.pickerClass
     */
  },

  onGetStudent : async function(){
    /**
     * 从服务器获取学生列表并放入that.data.student
     */
    var that = this
    var selectClass = that.data.selectClass
  },

  bindpicker: function (e) {
    /**
     * 接收picker的选择值，并查询选择的班级信息
     */
    var that = this
    console.log("picker: 用户选择 ", that.data.pickerClass[e.detail.value])
    that.setData({
      selectClass: that.data.pickerClass[e.detail.value]
    })

    that.onGetStudent()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.onGetClass()

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