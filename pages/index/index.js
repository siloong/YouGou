import { request } from "../../request/index.js";

Page({

  data: {
    // swiper array
    swiperList: [],
    // navigation array
    cateList: [],
    // floor array
    floorList: []
  },

  onLoad: function (options) {
    // this is get swiper's data function
    this.getSwiperList();
    // this is get navigation's data function
    this.getCateList();
    // this is get floor's data function
    this.getFloorList();
  },

  // get swiper's data function
  getSwiperList() {
    request({url: '/home/swiperdata'})
    .then(result => {
      // 因为接口的路径对不上，所以替换为index
      result.forEach(v => {
        v.navigator_url = v.navigator_url.replace(/main/, "index");
      });

      this.setData({
        swiperList: result,
      });
    });
  },
  // get navigation's data function
  getCateList() {
    request({url: '/home/catitems'})
    .then(result => {
      this.setData({
        cateList: result
      });
    });
  },
  // get floor's data function
  getFloorList() {
    request({url: '/home/floordata'})
    .then(result => {
      // console.log(result);

      result.forEach(v1 => {
        v1.product_list.forEach(v2 => {
          // console.log(v2.navigator_url);
          v2.navigator_url = v2.navigator_url.replace(/\?/, "/index?");
        });
      });

      this.setData({
        floorList: result
      });
    });
  }

})