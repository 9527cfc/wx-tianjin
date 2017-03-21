// pages/lists/lists.js
Page({
  data: {
    urlId: "baike",
    page: 1,
    dataList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.type) {
      this.setData({
        urlId: options.type  //存储跳转时传递的参数
      })
    }
    this.loadChoose();//判断参数
  },
  loadChoose: function () {
    this.choose();//更改显示内容，和标题栏样式
    this.chooseload();//选择进入页面加载内容
  },
  clickChoose: function (e) {
    this.setData({
      urlId: e.target.dataset.title,
      page: 1
    })
    // console.log(this.data.urlId)
    this.choose();//选择函数
    this.chooseload();//选择谁进行加载
  },
  chooseload: function (id) {
    // var that = this;
    if (this.data.urlId == "baike") {
      var loadId = 2;
    } else if (this.data.urlId == "artisan") {
      loadId = 4;
    } else if (this.data.urlId == "travel") {
      loadId = 3;
    }
    this.loadCon(loadId);//进行加载
  },
  loadCon: function (loadId) {
    var that = this;
    wx.request({
      url: 'https://bobtrip.com/newtj/menu/port/moreTaste.action',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      data: {
        superiorType: loadId
      },
      success: function (res) {
        var li = res.data.list;
        console.log(li);
        that.setData({
          dataList: li
        })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  choose: function () {//更改显示内容，和标题栏样式
    if (this.data.urlId == "baike") {
      this.setData({
        baikePitch: "chooseTitle",
        artisanPitch: "",
        travelPitch: ""
      });
      wx.setNavigationBarTitle({
        title: '品味百科'
      });
    } else if (this.data.urlId == "artisan") {
      this.setData({
        artisanPitch: "chooseTitle",
        baikePitch: "",
        travelPitch: ""
      });
      wx.setNavigationBarTitle({
        title: '匠人'
      });
    } else if (this.data.urlId == "travel") {
      this.setData({
        travelPitch: "chooseTitle",
        artisanPitch: "",
        baikePitch: ""
      });
      wx.setNavigationBarTitle({
        title: '慢游记'
      });
    }

  },
  loadMore: function () {
    if (this.data.urlId == "baike") {
      var loadId = 2;
    } else if (this.data.urlId == "artisan") {
      loadId = 4;
    } else if (this.data.urlId == "travel") {
      loadId = 3;
    }
    this.loadMoreCon(loadId);
  },
  loadMoreCon: function (loadId) {
    var that = this;
    wx.request({
      url: 'https://bobtrip.com/newtj/menu/port/moreTaste.action',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      data: {
        superiorType: loadId,
        currentPage: that.data.page + 1
      },
      success: function (res) {
        var li = res.data.list;
        that.setData({
          dataList: that.data.dataList.concat(li),
          page: that.data.page + 1
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;

    console.log(id);
    wx.navigateTo({
      url: '../details/details?id=' + id
    })
  },
  getLocalTime: function (nS) {
    // var time = new Date(parseInt(nS) *1000);
    // time = time.toLocaleString().substr(0, 17);

    // return time;
    var time = new Date(nS);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds);

  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  }
})