//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播数组
    swiperList: []
  },
  onShow() {
    console.log(0)
    console.log(sum(5))
  },
  onLoad: function () {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        console.log(result.data.message)
        this.setData({
          swiperList: result.data.message
        })
      }
    });
    
  },
  sum: function(num){
    if(num==1){						
			return 1 ;
		}else{
			return num + sum(num-1) ;	
		}
  }
 
})
