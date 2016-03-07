var baseUrl = "http://leetz.github.io/GirlsdayWechat/";
var wxdata = {
 link: baseUrl+"index.html",   //分享出去后落地页的链接
 icon: baseUrl+"images/share.jpg",  //分享出去时的ICON 180*180的尺寸
 title: '李铁峥邀请你加入群聊',   //分享出去时文案标题
 desc: '李铁峥邀请你加入群聊，进入查看详情。',
 success:function(){
	 _hmt.push(['_trackEvent','share_succ','click']);
 },
 cancel:function(){
	 
 },
};
setShare();
function setShare()
{
	
	didi.weixin(function (wx) {
	   wx.showOptionMenu({});
	
	   //分享朋友圈
	   wx.onMenuShareTimeline({
		  title: wxdata.title, // 分享标题
		  desc: wxdata.desc, // 分享描述
		  link: _mz_wx_shareUrl(wxdata.link), // 分享链接
		  imgUrl: wxdata.icon, // 分享图标
		  success: function () {
			 _mz_wx_timeline();
		  },
		  cancel: function () {
			 // 用户取消分享后执行的回调函数
		  }
	   });
	
	   //分享好友
	   wx.onMenuShareAppMessage({
		  title: wxdata.title, // 分享标题
		  desc: wxdata.desc, // 分享描述
		  link: _mz_wx_shareUrl(wxdata.link), // 分享链接
		  imgUrl: wxdata.icon, // 分享图标
		  success: function () {
			 _mz_wx_friend();
		  },
		  cancel: function () {
			 // 用户取消分享后执行的回调函数
		  }
	   });
	
	   //分享微博
	   wx.onMenuShareWeibo({
		  title: wxdata.title, // 分享标题
		  desc: wxdata.desc, // 分享描述
		  link: _mz_wx_shareUrl(wxdata.link), // 分享链接
		  imgUrl: wxdata.icon, // 分享图标
		  success: function () {
			 _mz_wx_weibo();
		  },
		  cancel: function () {
			 // 用户取消分享后执行的回调函数
		  }
	   });
	
	   wx.onMenuShareQQ({
		  title: wxdata.title, // 分享标题
		  desc: wxdata.desc, // 分享描述
		  link: _mz_wx_shareUrl(wxdata.link), // 分享链接
		  imgUrl: wxdata.icon, // 分享图标
		  success: function () {
			 _mz_wx_qq();
		  },
		  cancel: function () {
			 // 用户取消分享后执行的回调函数
		  }
	   });
	})
	
}



