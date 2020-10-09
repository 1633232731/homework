//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      password: "",
      userName: "",
      _id: "",

      homeworkInfo : {},      // choose 中的作业简略信息
      homework : [],          // 全部作业信息
      answer : [],            // 所有的答案
      analysis : [],          // 所有的分析
      isGetHomework : false,  // 是否从服务器获取过作业

      //homeworkLeft: 0,
      homeworkCurrent: 1,   // 当前作业编号

      homeworkNo : [],      // 作业序号
      
      isFinish : false,     // 作业是否结束，结束为false

      



      // 老师的数据

      studentInfo : {
        id : "",
        name : ""
      }




      /*levelName: "",
      order: 0,
      leftover: 0,
      correct: 0,
      wrong: 0,
      score: 0,
      review: "",*/
    }
  }
})
