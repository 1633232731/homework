// miniprogram/pages/choose/choose.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    //level : [ "小学","初中","高中" ],
    //levelName : "请选择",
    //qNumber : "",

    testTotal: 0,    //这些需要在onload函数中访问数据库获得
    testOverview: []
  },



  changePassword: function () {
    var that = this
    wx.navigateTo({
      url: '../changePW/changePW'
    })
  },

  initGlobalData: function (e, isFinish) {
    // 把 app 中的数据清空
    app.globalData.homeworkInfo = e.currentTarget.dataset.item
    app.globalData.isGetHomework = false
    app.globalData.homework = []
    app.globalData.answer = []
    app.globalData.analysis = []
    //app.globalData.homeworkLeft = app.globalData.homeworkInfo.questionCount
    app.globalData.homeworkCurrent = 1
    app.globalData.homeworkNo = []
    for (let i = 1; i <= app.globalData.homeworkInfo.questionCount; i++) {
      app.globalData.homeworkNo.push(i)
    }
    app.globalData.isFinish = isFinish
  },
  navigateDetail: function (e) {
    var that = this
    if (e.currentTarget.dataset.item.answerStatus == 0) {
      that.initGlobalData(e, false)
      wx.navigateTo({
        url: '/pages/testDetail/testDetail',
      })
    }
    else if (e.currentTarget.dataset.item.answerStatus == 1) {
      that.initGlobalData(e, true)
      wx.navigateTo({
        url: '/pages/testDetail/testDetail',
      })
    }
  },

  getTestOverview: function () {  // 从数据库获取简略数据
    var that = this
    // 作业状态、批改状态有：0(进行中)， 1(已完成)
    var temp1 = {
      id: 1,
      author: "杨老师",
      year: "2020",
      semester: "春季",
      class_: "计科1804",
      description: "补测3（不好意思）",
      grade: 100,
      answerStatus: 0,
      correctStatus: 0,
      questionCount: 2,
      testTime: "2020-07-04 15:52:57",
    }
    var temp2 = {
      id: 2,
      author: "杨老师",
      year: "2022",
      semester: "春季",
      class_: "计科1804",
      description: "补测3（不好意思）",
      grade: 100,
      answerStatus: 1,
      correctStatus: 1,
      questionCount: 10,
      testTime: "2020-07-04 15:19:46",
    }
    var temp = []
    temp.push(temp1)
    temp.push(temp2)
    that.setData({
      testOverview: temp
    })
  },
  /*bindPickerChange : function(e){
    var that=this
    that.setData({
      levelName : that.data.level[e.detail.value]
    })
    app.globalData.levelName = e.detail.value
  },*/

  /*getQNumber : function(e){
    var that=this
    that.data.qNumber = e.detail.value
  },*/

  /*checkIfReady : function(){
    var that = this
    var num = Number(that.data.qNumber);
    if(that.data.levelName == "请选择"){
      wx.showToast({
        title: '请选择试题难度',
        icon : "none"
      })
      return false
    }
    else{
      if(num<10||num>30){
        wx.showToast({
          title: '请将试题数量设定在10-30之间',
          icon : "none"
        })
        return false
      }
      else{
        app.globalData.leftover = num
        return true
      }
    }
  },*/

  /*testOnReady : async function(){
    var that=this
    var judge=await that.checkIfReady()
    if(judge==true){
      app.globalData.leftover = Number(that.data.qNumber)
      app.globalData.wrong = 0
      app.globalData.correct = 0
      app.globalData.order = 0
      app.globalData.review =""
      wx.navigateTo({
        url: '../testPaper/testPaper'
      })
    }
  },*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userName: app.globalData.userName
    })
    that.getTestOverview()
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