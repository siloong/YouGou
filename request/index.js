//当前请求的数量
let ajaxTimer = 0;

export const request = (params) => {
  ajaxTimer++;
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  // 显示加载图标并且阻止用户行为
  wx.showLoading({
    title: 'loading...',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {

        resolve(result.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimer--;
        if (ajaxTimer === 0) {
          //关闭加载图标
          wx.hideLoading();
        }
      }
    });
  });
};