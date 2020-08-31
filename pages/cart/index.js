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
    allChecked: true,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    // 获取缓存-用户的收货地址
    const address = wx.getStorageSync('address');
    // 获取缓存-用户加入购物车的商品
    const cart = wx.getStorageSync('cart') || [];
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({
      address
    });
    this.setCart(cart);
  },

  // 获取收货地址信息事件
  async handleChooseAddress() {
    try {
      // 获取权限状态
      const res = await getSetting();
      // 获取地址权限状态
      const scopeAddress = await res.authSetting['scope.address'];

      // 如果权限状态为false则拉动授权api让用户给予权限
      if (scopeAddress === false) {
        await openSetting();
      }
      // 授权地址 
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 将收货信息缓存
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  },

  // 商品勾选按钮事件
  handleChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    // 获取将要改变的商品索引
    const index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  // 重置数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    // 如果cart为空数组，那么将全选按钮设为false
    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync('cart', cart);
  },

  // 全选按钮事件
  handleAllChange() {
    let {allChecked, cart} = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);

    this.setCart(cart);
  },

  // 商品修改数量按钮事件
  async handleItemNumEdit(e) {
    const {id, opreation} = e.currentTarget.dataset;
    let {cart} = this.data;

    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && opreation === -1) {
      const res = await showModal({content: "您是否要删除该商品?"});
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += opreation;
      this.setCart(cart);
    }

  },

  // 支付按钮事件
  async handlePay() {
    const {address, totalNum} = this.data;

    if (!address.userName) {
      showToast({title: "您还没有填写收货地址呢"});
    } else if(0 === totalNum) {
      showToast({title: "您还没有选购商品呢"});
    } else {
      wx.navigateTo({url: '/pages/pay/index'});
    }
  }








});