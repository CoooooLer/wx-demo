//index.js
//获取应用实例
const app = getApp()
import {request} from '../../request/index'

Page({
  data: {
    // 轮播 数组
    swiperList: [],
    // 导航栏 数组
    cateList: [],
    // 楼层 数组
    floorList: []
  },
  onShow() {
  },
  onLoad: function () {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 轮播图
  getSwiperList() {
    request({
      url: 'home/swiperdata'
    })
      .then(res => {
        this.setData({
          swiperList: res
        })
      })    
  },
  // 导航栏
  getCateList() {
    request({
      url: 'home/catitems'
    })
      .then(res => {
        this.setData({
          cateList: res
        })
      })    
  },
   // 楼层
   getFloorList() {
    request({
      url: 'home/floordata'
    })
      .then(res => {
        this.setData({
          floorList: res
        })
      })    
  },
  sum: function(num){
    if(num==1){						
			return 1 ;
		}else{
			return num + sum(num-1) ;	
		}
  }
 
})
