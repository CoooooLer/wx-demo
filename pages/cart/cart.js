import { getSetting, chooseAddress, openSetting } from "../../request/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrss: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 修改地址
  async handleChooseAddress() {
    try {
      // 获取用户的权限设置 authSetting scope.address
    let result = await getSetting()
    const scopeAddress = result.authSetting["scope.address"]
    // 判断是否授权
    if(scopeAddress === false){
      await openSetting()
    }
    // 获取选择的地址
    let address = await chooseAddress()
    let all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    address.all = all
    wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error)
    }

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 修改 全选 计算价格 和 数量
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];

    this.setCart(cart)
    this.setData({
      address
    })
  },
  // 手动触发单选 计算 价格 和 数量
  handleChangeItem(e) {
    const goods_id = e.currentTarget.dataset.id;
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
   
   this.setCart(cart);


  },
  // 设置全选
  handleItemAllCheck() {
    let { cart, allChecked } = this.data;
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 共用函数
  // 设置 底部工具栏的  数量 和 总价格  
  setCart(cart){

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
    wx.setStorageSync('cart', cart)

  },
  // 物品 增加 减少 操作
  handleItemNumEdit(e) {
    const { id, operation } = e.currentTarget.dataset;
    let { cart } = this.data;
    const index = cart.findIndex(v => v.goods_id === id)
    if(operation == -1 && cart[index].num == 1) {
     
        wx.showModal({
          title: '',
          content: '确定删除该商品吗？',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (res) => {
            if (res.confirm) {
              cart.splice(index, 1)
              this.setCart(cart)
            } 

          },
          fail: (err)=>{
            console.log(err)
          }
        });
     
    }else if(operation == -1 && cart[index].num > 1) {
      cart[index].num--
    } else {
      cart[index].num++
    }
    console.log(1)
    this.setCart(cart)
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