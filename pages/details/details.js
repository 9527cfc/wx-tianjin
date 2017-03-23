// pages/details/details.js
var R_htmlToWxml = require('../../utils/htmlToWxml.js');


var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    urlId: '8a9a2b3559d39614015a5b36e7702c1d',
    // ad:'<view>',
    dataTitle: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      console.log(options.id)
      this.setData({
        urlId: options.id  //存储跳转时传递的参数
      })
    }
    this.loadCon();
  },
  loadCon: function () {
    var that = this;
    wx.request({
      url: 'https://bobtrip.com/newtj/menu/port/tasteDrtails.action',
      data: {
        superiorProgramId: that.data.urlId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // console.log(res.data);

        WxParse.wxParse('article', 'html', res.data.content, that, 5);


        that.setData({
          dataTitle: res.data.title
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
  jumpDetails: function (e) {
    var Id = e.currentTarget.dataset.src.split('=')[1];
    console.log(e);
    wx.navigateTo({
      url: '../details/details?id=' + Id
    })
  }


})




 // regfilter: function (res) {
  //   var that = this;
  //   var arr = [];
  //   var arr1 = [];
  //   var arr2 = [];

  //   var obj = {};
  //   var over;

  //   var reg = /(<p.*?>)(.*?)(<\/p>)/gi;
  //   var reg1 = /<p.*?>(.*?)<\/p>/i;
  //   var reg2 = /<strong.*?>(.*?)<\/strong>/i;
  //   var reg3 = /(<img.*src=")(.*)("\/>)/i;
  //   var reg4 = /(<a.*style=")(.*)(".*href=".*ProgramId=)(\w*)(".*>.*<span.*style=")(.*)(">.*<strong>)(.*)(<\/strong>.*<\/span>.*<\/a>)/i;
  //   var reg5 = /&quot;/g;
  //   var reg6 = /&gt;/g;
  //   var reg7 = /<span.*style="(.*)">(.*)<\/span>/i;
  //   var reg8 = /<strong>(.*：)<\/strong>(<span.*">)*(.*)(<\/span>)*/i;
  //   var reg9 = /&nbsp;/g;

  //   arr = res.data.content.match(reg);
  //   for (var i in arr) {
  //     // console.log(arr[i]);
  //     arr[i] = { "con": arr[i].replace(reg9, "").replace(reg5, "").replace(reg6, "").replace("<br/>", "").match(reg1)[1] };
  //     // console.log(arr[i].con);
  //     if (arr[i].con.match(reg4) !== null) {
  //       over = arr[i].con.match(reg4);
  //       arr[i] = {
  //         "astyle": over[2],
  //         'id': over[4],
  //         'titlestyle': over[6],
  //         'title': over[8]
  //       };
  //     } else if (arr[i].con.match(reg3) !== null) {
  //       arr[i] = {
  //         "image": arr[i].con.match(reg3)[2]
  //       };
  //     } else if (arr[i].con.match(reg2) !== null) {
  //       over = arr[i].con.match(reg2)[1];
  //       if (over.match(reg7) !== null) {
  //         // console.log(over);
  //         over = arr[i].con.match(reg7)[2];
  //       } else if (arr[i].con.match(reg8) !== null) {
  //         over = arr[i].con.match(reg8);
  //         // console.log(over);
  //         over = over[1] + over[3].replace("</span>", "");
  //       }
  //       arr[i] = {
  //         "strong": over
  //       };
  //     } else if (arr[i].con.match(reg7) !== null) {
  //       over = arr[i].con.match(reg7)[2];
  //       // console.log(over);
  //       arr[i] = {
  //         "strong": over
  //       };
  //     }
  //   }

  //   return arr;
  // }