// pages/order/index.js

import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  payAfterList: [],
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },
  onShow() {
    let page = getCurrentPages(); 
    let currentPage = page[page.length - 1];
    const {type} = currentPage.options;
    
    // this.getOrder(type);
    const payAfterList = wx.getStorageSync('payAfterList') || [];
    this.setData({
      payAfterList
    });
    this.changeTitleByIndex(type - 1);
  },

  // 没有token值，不能够实现该功能
  // async getOrder(type) {
  //   const res = await request({url: "/my/orders/all"});
  //   console.log(res);
  // },


  changeTitleByIndex(index) {
    let {tabs} = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  handleItamTabChange(e) {
    const {index} = e.detail;
    this.changeTitleByIndex(index);
  }
 
});