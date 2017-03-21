// pages/index/index.js
Page({
    data: {
        bannerList: [],
        headLineList: [],
        baikeList: [],
        baikeCount: 2,
        artisanList: [],
        travelList: [],
        indicatorDots: false,
        circular: true,
        vertical: true,
        autoplay: true,
        interval: 5000,
        duration: 1000
        // scrollLeft: 0
    },
    onLoad: function (e) {
        // 页面初始化 options为页面跳转所带来的参数
        // console.log(e);
        this.bannerLoad();//加载轮播
        this.baikeLoad();//加载百科数据
        this.artisanLoad();
        this.traveLoad();
        // this.tab();
    },
    bannerLoad: function () {
        var that = this;
        wx.request({
            url: 'https://bobtrip.com/newtj/menu/port/getPicture.action', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                var li = res.data.picturelist;
                that.setData({
                    bannerList: li
                })

            },
            fail: function () {
                console.log("请求失败");
            },
            complete: function () {
                that.headLineLoad();
            }
        })
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
                // console.log(li);
                that.setData({
                    headLineList: li
                })
            },
            fail: function () {
                console.log("请求失败");
            }
        })
    },
    baikeLoad: function () {
        var that = this;
        var reg = /&nbsp;/g;
        var reg1 = /。[^\u0000-\u00FF]*/g;
        wx.request({
            url: 'https://bobtrip.com/newtj/menu/port/getTaste.action', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                var li = res.data.tastlist.slice(0, that.data.baikeCount);
                li.forEach(function (value, index, array) {
                    value.context = value.context.replace(reg, "");//去掉空格
                    value.context = value.context.replace(reg1, "。");//截取到第一个句号
                })
                console.log(li);
                that.setData({
                    baikeList: li
                })
            },
            fail: function () {
                console.log("请求失败");
            }

        })
    },
    artisanLoad: function () {
        var that = this;
        var reg = /&nbsp;/g;
        var reg1 = /。[^\u0000-\u00FF]*/g;
        wx.request({
            url: "https://bobtrip.com/newtj/menu/port/getArt.action",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                var li = res.data.artlist;
                li.forEach(function (value, index, array) {
                    value.content = value.content.replace(reg, "");
                    value.content = value.content.replace(reg1, "。");
                })
                that.setData({
                    artisanList: li
                })

            },
            fail: function () {
                console.log("请求失败");
            }

        })
    },
    traveLoad: function () {
        var that = this;
        var reg = /&nbsp;/g;
        var reg1 = /。[^\u0000-\u00FF]*/g;
        wx.request({
            url: "https://bobtrip.com/newtj/menu/port/getTakeWork.action",
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("请求成功");
                var li = res.data.takelist;
                li.forEach(function (value, index, array) {
                    value.context = value.context.replace(reg, "");
                    value.context = value.context.replace(reg1, "。");
                })
                that.setData({
                    travelList: li
                })
            },
            fail: function () {
                console.log("请求失败");
            }
        })
    },
    jumpHeadLineList: function () {
        wx.navigateTo({
            url: '../headLineList/headLineList'
        })//跳转到头条列表
    },
    jumpbaikeList: function (e) {
        var type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../lists/lists?type=' + type
        })//判断跳转目标并跳转，实际名称应为jumpList
    },
    jumpdetails: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../details/details?id=' + id
        })
    }
    // scrollmove: function (e) {
    //     if (e.detail.scrollLeft < 380 && e.detail.deltaX > 0) {
    //         this.setData({
    //             scrollLeft: 0
    //         })
    //     }else if (e.detail.scrollLeft < 380  && e.detail.deltaX < 0) {
    //         this.setData({
    //             scrollLeft: 390
    //         })
    //     }  else if (e.detail.scrollLeft > 500 && e.detail.scrollLeft < 750 && e.detail.deltaX > 0) {
    //         this.setData({
    //             scrollLeft: 390
    //         })
    //     }
    //     // } else if (e.detail.scrollLeft > 380 && e.detail.scrollLeft < 790 && e.detail.deltaX < 0) {
    //     //     this.setData({
    //     //         scrollLeft: 780
    //     //     })
    //     // }else if (e.detail.scrollLeft > 770 && e.detail.scrollLeft < 1000 && e.detail.deltaX > 0) {
    //     //     this.setData({
    //     //         scrollLeft: 390
    //     //     })
    //     // } 
    //        console.log( e.detail);
    // }

})

/*"tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "img/home.png",
        "selectedIconPath": "img/home-hover.png"
      },
      {
        "pagePath": "pages/user/user",
        "text": "我的",
        "iconPath": "img/user.png",
        "selectedIconPath": "img/user-hover.png"
      }
    ],
    "borderStyle": "white"
  }*/








