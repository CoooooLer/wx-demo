import { getSetting, chooseAddress, openSetting, showToast } from "../../request/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrss: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 结算
  handlePay() {
    const { address, totalNum } = this.data;
    if(!address) {
      showToast('请填写收货地址！！！')
      return ;
    }
    if(!totalNum) {
      showToast("购物车还没有商品哦！！！")
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 修改 全选 计算价格 和 数量
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.checked)
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    // const allChecked = cart.length ? cart.every(v => v.checked) : false // 全选
    for(let v of cart) {
      if(v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    }
    allChecked = cart.length!=0 ? allChecked : false; 

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })

    this.setData({
      address
    })
  },

  // 共用函数
  // 设置 底部工具栏的  数量 和 总价格  
  setCart(cart){

   
    wx.setStorageSync('cart', cart)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})