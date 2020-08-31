// pages/goods_detail/index.js
import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    goodsObj: {},
    isCollect: false
  },

  goodsInfo: [],

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let {options} = currentPage;

    const {goods_id} = options;
    this.getDetailList(goods_id);
  },

  async getDetailList(goods_id) {
    const res = await request({url: "/goods/detail", data:{goods_id}});
    this.goodsInfo = res;
    // collect
    let collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);

    this.setData({
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce,
        pics: res.pics
      },
      isCollect
    });
  },

  // 大图显示swiper-item
  handlePreviewImage(e) {
    const urls = this.goodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    console.log(current);
    
    wx.previewImage({
      current,
      urls  
    })
  },

  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })

  },


  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);

    if(-1 != index) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: "取消成功",
        icon: "success",
        mask: true
      });
    } else {
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        mask: true
      });
    }

    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    });
  },

  handleBuy() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)

    wx.switchTab({
      url: '/pages/cart/index'
    });
  }






});