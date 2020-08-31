import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    // The value of the left menu
    leftMenuList: [],
    // The value of the right menu
    rightMenuList: [],
    // The value of the left menu item's index
    currenIndex: 0,
    // Set the scroll bar on the right to zero
    scrollTop: 0
  },

  // The value of the category list
  categoryData: [],

  onLoad: function() {
    // this.getClassList();
    const CATES = wx.getStorageSync('cate');
    if (!CATES) {
      this.getClassList();
    } else {
      // Is it more than 10s
      if (Date.now() - CATES.time > 1000 * 10) {
        // To resend
        this.getClassList();
      } else {
        // Use old data
        console.log("Can use old data...");
        this.categoryData = CATES.data;
        
        let leftMenuList = this.categoryData.map(v => v.cat_name);
        let rightMenuList = this.categoryData[0].children;
        this.setData({  
          leftMenuList,
          rightMenuList
        });
      }
    }
  },

  // get category's data
  async getClassList() {
    // request({url: '/categories'})
    // .then(result => {
    //   this.categoryData = result.data.message;

    //   wx.setStorageSync('cate', {time: Date.now(), data: this.categoryData});

    //   let leftMenuList = this.categoryData.map(v => v.cat_name);
    //   let rightMenuList = this.categoryData[0].children;
      
    //   this.setData({  
    //     leftMenuList,
    //     rightMenuList
    //   });
    // });
    const res = await request({url: '/categories'});
      this.categoryData = res;

      wx.setStorageSync('cate', {time: Date.now(), data: this.categoryData});

      let leftMenuList = this.categoryData.map(v => v.cat_name);
      let rightMenuList = this.categoryData[0].children;
      
      this.setData({  
        leftMenuList,
        rightMenuList
      });
  },

  // response leftMenuItem click event function
  handleItemTap(e) {
    // console.log(e);
    const {index} = e.currentTarget.dataset;
    let rightMenuList = this.categoryData[index].children;
    console.log(index);
    this.setData({
      currenIndex: index,
      // set right is menu's scroll-top:0
      scrollTop: 0,
      rightMenuList
    });
  }

  
});