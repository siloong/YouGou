// pages/feedback/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    imgList: [],
    textVal: ""

  },

  UpLoadImg: [],

  handleItamTabChange(e) {
    let {tabs} = this.data;
    const {index} = e.detail;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          imgList: [...this.data.imgList, ...result.tempFilePaths]
        });
      },
      fail: (err)=>{
        console.log(err);
      }
    });
  },

  handleRemoveImg(e) {
    const {index} = e.currentTarget.dataset;
    let {imgList} = this.data;
    imgList.splice(index, 1);
    this.setData({
      imgList
    });
  },


  handleTextInput(e) {
    const {value} = e.detail;
    this.setData({
      textVal: value
    });
  },

  handleFormSubmit() {
    const {textVal, imgList} = this.data;
    console.log(textVal);
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }

    wx.showLoading({
      title: "上传中",
      mask: true,
    });

    if (/*imgList != imgList.length*/false) {
      imgList.forEach((v, i) => {
        var upTask = wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: 'file',
          formData: {},
          success: (result)=>{
            let url = JSON.parse(result.data).url;
            this.UpLoadImg.push(url);
            
            if(i === imgList.length - 1) {
              console.log('上传中...');

              // 成功后。。。
              this.setData({
                textVal: "",
                imgList: []
              });
            }
          }
        });
      });
    } else {
      wx.hideLoading();
      // 成功后。。。
      this.setData({
        textVal: "",
        imgList: []
      });

      wx.navigateBack({
        delta: 1
      });
    }
    

  }

});