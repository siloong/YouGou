// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  onShow() {
    // 获取缓存-用户的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存-用户加入购物车的商品
    let cart = wx.getStorageSync('cart') || [];
    // 过滤没有勾选的商品
    cart = cart.filter(v => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  async handleOrderPay() {
    const token = wx.getStorageSync("token");

    // 支付之后，删除缓存中购物车该商品的条目 ---模拟
    let cart = wx.getStorageSync('cart');
    cart = cart.filter(v => {
      if (v.checked) {
        let payAfterList = wx.getStorageSync('payAfterList') || [];
        v.time = new Date();
        payAfterList.push(v);
        wx.setStorageSync('payAfterList', payAfterList);
      }
      return !v.checked;
    });
    wx.setStorageSync('cart', cart);

    // ---模拟  脑瘫代码不可为
    await showToast({title: "购买成功"}).then((res) =>{
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/cart/index',
        });
      }, 1000);
    });
    
    // 由于使用的是个人用户所以获取不到token值
    // if (!token) {
    //   wx.navigateTo({url: '/pages/auth/index'});
    //   return;
    // } else {
    //   console.log('token 已经存在');
    // }
  }


});