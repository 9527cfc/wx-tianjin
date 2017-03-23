// pages/headLine/headLine.js
Page({
  data: {
    CurrentPage: 1,
    headLineList: []
  },
  onLoad: function (options) {
    this.headLineLoad();
    wx.setNavigationBarTitle({
      title: '本周推荐'
    });//修改标题
  },
  headLineLoad: function () {
    var that = this;
    wx.request({
      url: 'https://bobtrip.com/newtj/menu/port/getRecommend.action', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("请求成功");
        var li = res.data.reclist;
        li.forEach(function (value, index, array) {
          value.date = that.getLocalTime(value.date.time)//时间戳转换
          // value.date = that.getDay(value.date.time)
        })
        that.setData({
          headLineList: li
        })
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  loadMore: function () {
    var that = this;
    var lists = this.data.headLineList;
    wx.request({
      url: 'https://bobtrip.com/newtj/menu/port/getRecommendAll.action', //仅为示例，并非真实的接口地址
      data: {
        CurrentPage: that.data.CurrentPage
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("请求成功");
        var li = res.data.list;
        li.forEach(function (value, index, array) {
          value.date = that.getLocalTime(value.date.time)
          // value.date = that.getDay(value.date.time)
        })
        that.setData({
          headLineList: that.data.headLineList.concat(li),
          CurrentPage: that.data.CurrentPage + 1
        })//CurrentPage+1获取下一页数据
      },
      fail: function () {
        console.log("请求失败");
      }
    })
  },
  jumpDetails: function (e) {
    var Id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + Id
    })
  },
  getDay: function (time) {
    var nowDate = new Date();
    var oldDate = new Date(time);
    var nTime = nowDate.getTime() - oldDate.getTime();
    console.log(nTime);
    var day = Math.floor(nTime / 86400000);
    if (day == 0) {
      return "今天";
    } else if (day > 0) {
      return day + "天前";
    }

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
    return year + '-' + this.add0(month) + '-' + this.add0(date);

  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  }

})