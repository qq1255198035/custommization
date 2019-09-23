import wx from 'weixin-js-sdk'
import { axios } from '@/utils/request'
import qs from 'qs'
/*var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() { 
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
              aCallback(anHttpRequest.responseText);
      }

      anHttpRequest.open( "GET", aUrl, true );            
      anHttpRequest.send( null );
  }
}
var client = new HttpClient();client.get('http://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=23_6BqKd_3O15A_z3_X14yviIjlib79w4orDOcxoQVCpaB68Q_xTO7lKqd6z8vTs0uAvR_5iC2hr5sKmSJk2FgoBcN4HANBqQZ5q6WQqkdh2t_qd8OZ95_Glb-M8GKCJ9ReQq5VE7fgQ7HoIpLXDWHhAEAKDO', function(response) {
  console.log(response)
})*/
  // do something with response});
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (callback) {
    // 这边的接口请换成你们自己的
    let params = {url:(window.location.href).split('#')[0]}
    axios.post('wxUtil/getCreateSign', qs.stringify(params)).then((res) => {
      console.log(res)
      wx.config({
        debug: true, // 开启调试模式
        appId: 'wx34f9fd39f0ea75fe', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      console.log(res)
      console.log(this.queryData.title)
      var shareData = { 
        title: this.queryData.title, 
        desc: '吃茶去喊你一起搞事情~你来还是来还是来？', 
        link: window.location.href,
         imgUrl: this.queryData.bannerImage,
     }; 
     wx.onMenuShareAppMessage(shareData); // 分享给朋友
     wx.onMenuShareTimeline(shareData); // 分享到朋友圈
     wx.onMenuShareQQ(shareData);  // 分享到QQ
     wx.onMenuShareWeibo(shareData); // 分享到腾讯微博
     wx.onMenuShareQZone(shareData); // 分享到QQ空间
      if (callback) {
        callback()
      }
    })
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
  * [ShareAppMessage 微信分享给朋友]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareAppMessage (option) {
      console.log(option)
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success () {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel () {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  }
}
export default wxApi