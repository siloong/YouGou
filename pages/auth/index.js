import { login } from "../../utils/asyncWx";
import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';



Page({
  async handleGetUserInfo (e) {
    // ？获取不到token无法实现该支付功能
    const {encryptedData, rawData, iv, signature} = e.detail;
    const {code} = await login();
    const loginParams = {encryptedData, rawData, iv, signature, code};

    const res = await request({url: "/users/wxlogin", data: loginParams, method: "post"});
    console.log(res);



  }






});