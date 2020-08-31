import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    goodsList: [],
    inValue: "",
    isFocus: false
  },
  // 防抖定时器ID
  TimeId: -1,
  handleInput(e) {
    const {value} = e.detail;
    if (!value.trim()) {
      this.setData({
        isFocus: false,
        goodsList: []
      });
      return;
    }
    this.setData({
      isFocus: true
    });
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getQueryList(value);
    }, 500);
  },

  async getQueryList(value) {
    console.log(typeof value);
    let res = await request({url: '/goods/search', data:{query: value}});
    this.setData({
      goodsList: res.goods
    });
  },

  handleCancel() {
    this.setData({
      isFocus: false,
      goodsList: [],
      inValue: ""
    });
  }


});