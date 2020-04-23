// pages/category/category.js
import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单
    rightContent: [], // 右侧的内容
    currentIndex: 0, // 左侧选中的菜单
  },
  cate: [], 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过时间戳 做一个缓存
    const cate = wx.getStorageSync('cate');
    const time = wx.getStorageSync('time');
    if(!cate) {
      this.getCate()
    } else {
      if(Date.now() - time > 10*1000){
        this.getCate()
      } else {
        this.cate = cate;
        // 构造=左侧菜单
        let leftMenuList = this.cate.map(v => v.cat_name);
        let rightContent = this.cate[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  getCate() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
      .then(res => {
        // console.log(res.data.message)
        this.cate = res.data.message;
        wx.setStorageSync('time', Date.now());
        wx.setStorageSync('cate', this.cate)
        // 构造=左侧菜单
        let leftMenuList = this.cate.map(v => v.cat_name);
        let rightContent = this.cate[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },
  handleMenuTap(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset;
    let rightContent = this.cate[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
    })
  }

})