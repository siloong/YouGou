import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销售",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总的页数
  totalPages: 0,

  onLoad: function (options) {
    this.QueryParams.cid = options.cat_id || ""; 
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
  },

  // request good-list data
  async getGoodsList() {
    const res = await request({url: "/goods/search", data: this.QueryParams});
    // 获取总条数 
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);  
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    });

    // close PullDownRefresh
    wx.stopPullDownRefresh();
  },

  handleItamTabChange(e) {
    let {tabs} = this.data;
    const {index} = e.detail;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '已经到底啦',
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  onPullDownRefresh() {
    // Reset the data
    this.setData({
    goodsList: [],
    });
    // Reset the pagenum
    this.QueryParams.pagenum = 1;
    // Requerst Data
    this.getGoodsList();
  }



});