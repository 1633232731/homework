// pages/testDetail/testDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testQuestion: "",
    currentAnswer: "",
    currentAnalysis: "",

    homeworkId: "",
    //homeworkLeft: 0,
    homeworkCount: 0,
    homeworkCurrent: 1,

    //选题页面的打开
    open: false,
    // mark 是指原点x轴坐标
    markX: 0,
    markY: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmarkX: 0,
    newmarkY: 0,

    istoright: true,
    isDrag: false,

    problemNo: [],    // 侧边栏题目序号
    problemColor: [] //  侧边栏序号颜色
  },

  // 点击左上角小图标事件
  bindtapIcon: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }

  },

  bindtapStart: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.markX = this.data.newmarkX = e.touches[0].pageX;
    this.data.markY = this.data.newmarkY = e.touches[0].pageY;
  },

  bindtapDrag: function (e) {
    this.setData({
      isDrag: true
    })
  },

  bindtapEnd: function (e) {
    // touchend事件
    this.data.newmarkX = e.changedTouches[0].pageX;
    this.data.newmarkY = e.changedTouches[0].pageY;

    // 手指从左向右移动,并且垂直不超过限度
    if (this.data.markX < this.data.newmarkX && Math.abs(this.data.newmarkY - this.data.markY) <= 40) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.markX > this.data.newmarkX) {
      this.istoright = false;
    }
    // 通过改变 open 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
    if (this.data.isDrag == false && this.data.open == true) {
      this.setData({
        open: false
      });
    }
    this.data.isDrag = false
    this.data.markX = 0;
    this.data.newmarkX = 0;
    this.data.markY = 0;
    this.data.newmarkY = 0;
    /*console.log("开始Y",this.data.markY)
    console.log("结束Y",this.data.newmarkY)*/
  },
  onGetAllHomework: async function () {
    //参数为测试的信息

    /**
     * TODO
     * 需要在这里获取题目：用homeworkInfo.id作为参数,作为一个数组存入question数组
    **/

    var that = this
    //题目中不能有引号
    var homework = ["执行以下指令，最终%eax的结果为______(以十六进制格式小写表示例0xffffffff)\n\
      movl $0xc1ffbe30,%edx \n\
      movl $0x3764148b,%eax \n\
      cmpl %eax,%edx\n\
      jge  .L2\n\
      subl  %edx,%eax\n\
      jmp  .L3\n\
      .L2:\n\
      subl  %eax,%edx\n\
      movl  %edx,%eax\n\
      .L3:\n\
      已知%eax=0x5b1f0155,%ebx=0x588224a2,%ecx=0x25dbdd7f,%edx=0x32c86b89,\n\
      在内存区域中\n\
      0x0804d6d2～0x0804d6e1的内容为\n\
      0x8a,0x76,0x79,0xd4,0x19,0x12,0xbe,0x2e,0x6d,0xa0,0x1e,0x12,0x9d,0xfe,0x8a,0x8e\n\
      则在如下指令执行后\n\
      movw 0x0804d6d7,%bl\n\
      addl %ebx,%eax\n\
      %eax的值为：0x____", "xxx"]

    app.globalData.homework = homework
    app.globalData.isGetHomework = true
  },

  onGetAllAnswerAndAnalysis: async function () {
    /**
     * 从服务器获取已保存的答案和解析
     */

  },

  showPage: function () {
    /**
     * 展示页面的默认值，包括：
     * 问题、作业id、/*作业剩余/、作业总数、当前作业下标、保存的答案、保存的解析
     */
    var that = this
    that.setData({
      testQuestion: app.globalData.homework[app.globalData.homeworkCurrent - 1],
      homeworkId: app.globalData.homeworkInfo.id,
      //homeworkLeft: app.globalData.homeworkLeft,
      homeworkCount: app.globalData.homeworkInfo.questionCount,
      homeworkCurrent: app.globalData.homeworkCurrent,
      problemNo: app.globalData.homeworkNo
    })

    if (app.globalData.answer[app.globalData.homeworkCurrent - 1] != undefined) {
      that.setData({
        currentAnswer: app.globalData.answer[app.globalData.homeworkCurrent - 1]
      })
    }
    if (app.globalData.analysis[app.globalData.homeworkCurrent - 1] != undefined) {
      that.setData({
        currentAnalysis: app.globalData.analysis[app.globalData.homeworkCurrent - 1]
      })
    }
    // 为侧边栏索引获取颜色值
    var color = []
    for (let i = 0; i < that.data.homeworkCount; i++) {
      if (app.globalData.answer[i] != undefined && app.globalData.answer[i] != "") {
        // 已填写答案为绿色
        color.push(true)
      }
      // 未填写答案为黑色
      else {
        color.push(false)
      }
    }
    that.setData({
      problemColor: color
    })
    //console.log(that.data.problemColor)
  },

  bindInputSaveAnswer: function (e) {
    /**
     * 获取输入并将输入存储到app.globalData.answer中
     */
    var that = this
    app.globalData.answer[that.data.homeworkCurrent - 1] = e.detail.value    //保存答案
  },
  bindInputSaveAnalysis: function (e) {
    /**
     * 获取输入并将输入存储到app.globalData.analysis中
     */
    var that = this
    app.globalData.analysis[that.data.homeworkCurrent - 1] = e.detail.value    //保存答案

  },

  checkFinish: function () {
    /**
     * 检查是否所有题目都完成，如未完成弹出提示框
     * 返回布尔值
     */
    var that = this
    console.log(app.globalData.answer)
    //JS if判断只有0为假，所以要加1
    if (app.globalData.answer.indexOf("empty") + 1 || app.globalData.answer.length != that.data.homeworkCount) {
      wx.showModal({
        title: '提示',
        content: '还有题目未作答,确认提交？',
        confirmText: "提交",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            return true
          } else if (res.cancel) {
            console.log('用户点击取消')
            return false
          }
        }
      })
    }
    else {
      return true
    }
  },
  submitAnswerOnline: function () {
    /**
     * 提交答案
     */
    var that = this
    if (that.checkFinish()) {
      wx.showModal({
        title: '提示',
        content: '确认提交？提交后不可更改',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // TODO：将答案上传到服务器
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },

  saveAnswerOnline: function () {
    /**
     * TODO : 把app.globalData.answer 中的数据上传到服务器做暂时保存
     */
  },

  showChooseProblem: function (e) {
    /**
     * 跳转至任意题目
     */

    // index第一个是0，后面需要+1
    app.globalData.homeworkCurrent = e.currentTarget.dataset.index + 1
    wx.redirectTo({
      url: '../testDetail/testDetail',
    })
  },
  showNextProblem: function () {
    /**
     * 获取下一题
     * 如果是最后一题就跳转到第一题
     */
    var that = this
    if (app.globalData.homeworkCurrent == that.data.homeworkCount) {
      setTimeout(function () {
        wx.showToast({
          title: '已到最后一题，跳转至第一题',
          icon: 'none'
        })
      }, 500)

      app.globalData.homeworkCurrent = 1
    }
    else {
      // 获取下一题
      app.globalData.homeworkCurrent += 1
    }
    /*if(app.globalData.answer[that.data.homeworkCurrent] != ""){

    }*/
    wx.redirectTo({
      url: '../testDetail/testDetail',
    })
  },

  showLastProblem: function () {
    /**
     * 获取上一题
     * 如果是第一题就跳转到最后一题
     */
    var that = this
    if (app.globalData.homeworkCurrent == 1) {
      setTimeout(function () {
        wx.showToast({
          title: '已到第一题，跳转至最后一题',
          icon: 'none'
        })
      }, 500)

      app.globalData.homeworkCurrent = that.data.homeworkCount
    }
    else {
      // 获取下一题
      app.globalData.homeworkCurrent -= 1
    }
    /*if(app.globalData.answer[that.data.homeworkCurrent] != ""){

    }*/
    wx.redirectTo({
      url: '../testDetail/testDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this

    /**
     * 加载页面的时候判断是否已经获取过整个作业内容
     * 如果获取过则显示当前题目
     * 如果未获取则获取题目
     */
    if (!app.globalData.isGetHomework) {
      // 第一次进到这个页面里面，需要在服务器上获取全部作业和已经提交的答案
      that.onGetAllAnswerAndAnalysis()
      that.onGetAllHomework()
      that.showPage()
    }
    else {
      // 下一题 || 选择题目
      that.showPage()
      console.log("已获取作业！")
    }

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