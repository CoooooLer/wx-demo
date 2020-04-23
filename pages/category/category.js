// pages/category/category.js
import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧的菜单
    rightContent: [], // 右侧的内容
    currentIndex: 0, // 左侧选中的菜单
    scrollTop: 0, // 右侧商品距离顶部的距离
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
  async getCate() {
    let res = await request({  url: "categories" })
    this.cate = res;
    wx.setStorageSync('time', Date.now());
    wx.setStorageSync('cate', this.cate)
    // 构造=左侧菜单
    let leftMenuList = this.cate.map(v => v.cat_name);
    let rightContent = this.cate[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })

    // request({
    //   url: "categories"
    // })
    //   .then(res => {
    //     // console.log(res.data.message)
    //     this.cate = res.data.message;
    //     wx.setStorageSync('time', Date.now());
    //     wx.setStorageSync('cate', this.cate)
    //     // 构造=左侧菜单
    //     let leftMenuList = this.cate.map(v => v.cat_name);
    //     let rightContent = this.cate[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
  },
  handleMenuTap(e) { // 点击左侧菜单求换商品
    // console.log(e)
    const { index } = e.currentTarget.dataset;
    let rightContent = this.cate[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }

})