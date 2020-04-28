// pages/goods_list/goods_list.js
import { request } from "../../request/index"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goods_list: []
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalNum: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },
  async getGoodsList() {
    let res = await request({
      url: 'goods/search',
      data: this.queryParams
    });
    const { total } = res;
    this.totalNum = Math.ceil(total / this.queryParams.pagesize)
    this.setData({
      goods_list: [...this.data.goods_list,...res.goods]
    })
    
    wx.stopPullDownRefresh()
  },
  changeTabItem(e){
    let index = e.detail;
    let {tab} = this.data;
    tab.forEach((v, i) => i==index ? v.isActive = true : v.isActive = false)
    this.setData({
      tab
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goods_list: []
    })

    this.queryParams.pagenum = 1

    this.getGoodsList()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum >= this.totalNum) {
      wx.showToast({
        title: '没有更多商品了',
        icon: 'none',
      });
    } else {
    
      this.queryParams.pagenum++;
      this.getGoodsList();
      

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})