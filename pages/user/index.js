// pages/user/index.js

Page({
  data: {
    userInfo: {},
    collectNum: 0
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    console.log(collect);
    this.setData({
      userInfo,
      collectNum: collect.length
    });
  }
});