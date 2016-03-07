$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    var tap = mobile ? "tap" : "click";

    //阻止屏幕滑动
    $('html,body').on(touchmove,function(e){
        e.preventDefault()
    });
	
	_mz_wx_view (1);//秒针检测
	
	
    var motionObj = {};
    var loadingPath='images/';
    var stageH=$(window).height();
    var stageW=$(window).width();

    //定义时间动画：
    for(var i=0; i<10; i++){
        motionObj["page"+(i+1)] = new TimelineMax();
    };

    //初始化音乐
    var _music;
    function intsound(){
        var sounds = [
            {src: "bg1.mp3", id: 1}
        ];
        createjs.Sound.alternateExtensions = ["ogg"];
        createjs.Sound.registerSounds(sounds, loadingPath);
    }
    intsound();

    //初始化阻止屏幕双击，当有表单页的时候，要关闭阻止事件，否则不能输入文字了，请传入false值，再次运行即可
    initPreventPageDobuleTap(true);
    initPageMotion();
    //initButtons();

    //初始化动画
    function initPageMotion(){

        $(".main").fadeIn(300,function(){
            setTimeout(function(){
                $('.longpage').show();
                //document.title='又是SY11女生节！（24）';
                //setTimeout(function(){
                //    motionObj['page'+1].play();
                //},1000)
                messages1();
            },2000)
        });
    }

    //产生随机姓名
    function GetRandomNum(Min,Max)
    {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    }
    var userNamesArray = ['李铁峥','马丁','成辉','邢学韬','唐彦嵩','王思伦'];
    var _uid = GetRandomNum(0,5);
    var _userName = userNamesArray[_uid];
    
    function getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return "";
    }
    var nameParameter = getUrlParam('id');
    //alert(nameParameter)
    if(nameParameter !='' && nameParameter != null && nameParameter != undefined){
        //alert(userNamesArray[parseInt(_uid)])
        //alert(userNamesArray[parseInt(nameParameter)])
        $('.cont').text(userNamesArray[parseInt(nameParameter)]+'邀请你加入了“又是SY11女生节！”群聊，群聊参与人还有：程维 滴滴、刘强东 京东、王石 万科、柳传志 联想、潘石屹 SOHO中国、王思聪 国民老公-……');
    }


    wxdata['title'] = _userName+'邀请你加入群聊';

    wxdata['desc'] = _userName+'邀请你加入群聊又是SY11女生节！，进入查看详情。'
    wxdata['link'] = wxdata['link']+'?id='+_uid;
    setShare();  //微信分享


    var _DIST = 0
    var _space = stageH/2-520;
    var _space2 = 0;

    var _timer;
    var msgID;
    var dist;
    //显示消息1
    function messages1(){
        msgID=1;
        //dist = -150+_space;
        dist = -150;
        _timer = setInterval(setMS1,2500)
    }

    //显示消息2
    function messages2(){
        //$('#msg'+15).fadeIn();
        //msgID=7;
        dist = 0;
        //dist = _space;
        clearInterval(_timer);
        _timer = setInterval(setMS2,2500)
    }

    //播放消息声音
    function playmessagesSound(){
        _music = createjs.Sound.play('1');
        _music.volume = 0.1;
    }

    function setMS1(){
        if(msgID<=8){
            if(msgID==8){
                console.log(_space)
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':dist-150+_space+'px'},ease:Linear.easeNone});
                dist += -260+_space;
                _DIST = dist;
            }else if(msgID>3){
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':dist+10+'px'},ease:Linear.easeNone});
                dist += -200;
                _DIST = dist;   
            }
            if(msgID==8) receiveMoney();
            $('#msg'+msgID).fadeIn();
            console.log(msgID);
            playmessagesSound();
        }else{
            clearInterval(_timer);
        }
        msgID++;
    }

    function setMS2(){
        console.log("Here");
        if(msgID<=12){
            if(msgID != 12){
                dist += -40;
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist+'px'},ease:Linear.easeNone});
                dist += -180;    
            }else {
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-120+'px'},ease:Linear.easeNone});
                dist += -180;   
            }
            
            

            /*
            if(msgID==11) {
                TweenMax.to($(".longpage>div").not($('.di')), .5, { css: {'top': _DIST + dist - 130 + 'px'}, ease: Linear.easeNone });
                dist += -280;
            }else if(msgID>=11 && msgID<=14){
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist+'px'},ease:Linear.easeNone});
                dist += -100;
                if(msgID==14){
                    clearInterval(_timer);
                    _timer = setInterval(setMS2,1000);
                }
            }else if(msgID==15){
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-50+'px'},ease:Linear.easeNone});
                dist += -150;
                clearInterval(_timer);
                _timer = setInterval(setMS2,1500);
            }else if(msgID==18){
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-100+'px'},ease:Linear.easeNone});
                dist += -250;
            }else if(msgID==19){
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-150+'px'},ease:Linear.easeNone});
                dist += -300;
            }else{
                TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist+'px'},ease:Linear.easeNone});
                dist += -150;
            }*/
            //}else if(msgID>11 && msgID<16){
            //    TweenMax.to($(".longpage>div").not($('.di')),.4, {css:{'top':_DIST+dist+'px'},ease:Linear.easeNone});
            //    dist += -100;
            //    if(msgID==13){
            //        clearInterval(_timer);
            //        _timer = setInterval(setMS2,1300);
            //    }
            //}else if(msgID==16){
            //    TweenMax.to($(".longpage>div").not($('.di')),.4, {css:{'top':_DIST+dist-50+'px'},ease:Linear.easeNone});
            //    dist += -100;
            //}else if(msgID==18){
            //    TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-120+'px'},ease:Linear.easeNone});
            //    //dist += -280;
            //}else if(msgID==17){
            //    TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist-200+'px'},ease:Linear.easeNone});
            //    dist += -350;
            //    clearInterval(_timer);
            //    _timer = setInterval(setMS2,1500);
            //}else{
            //    TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+dist+'px'},ease:Linear.easeNone});
            //    dist += -150;
            //}

            //if(msgID==9) msgID =msgID+1;
            $('#msg'+msgID).fadeIn();
            playmessagesSound();
            _btn2 = 0;
        }else{
            clearInterval(_timer);
        }
        msgID++;
    }

    var _btn1 = 1;
    var _btn2 = 1;
    var _btn3 = 1;

    //打开红包
    var isTheFirstReceive = true;
    var ct = true;
    function receiveMoney(){
        $('#redpick1, #msg8 .hand').one(touchstart, function(){
            $('#msg8 .circle').css({'animation':'none','-webkit-animation':'none'});
            $('#msg8 .circle,#msg8 .hand').fadeOut();
			_mz_wx_view (2);
			_mz_wx_custom(1); 
            if(isTheFirstReceive){
                if(ct){
                    $('.hongbao,#hb1').show();
                    TweenMax.to('#hb1',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
                }else{
                    $('.hongbao,#hb1Open,#btn3').show();
                    TweenMax.to('#hb1Open',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
                }
            }else{
                $('.hbnull,#null1').show();
            }
        })
    }

    //拆红包：
    var canRemoveMoney = true;
    $('#btn2').on(touchstart, function(){
        if(_btn2==1){
            if(canRemoveMoney){
				_mz_wx_view (3);//第一个红包派完页
				_mz_wx_custom(2); 
                $('#hb1Open,#btn3').show();
                $('#hb1').hide();
                TweenMax.to('#hb1',{scale:0.5, alpha:0});
                setTimeout(function(){
                    $('#hongbao .circle').show();
                    $('#hongbao .hand').show();
                },2000);
                //canRemoveMoney = false;
                //第一次拆红包，设置关闭按钮为第二页的关闭
                isTheFirstClose = false;
                
            }else{
                alert('已经拆过红包了');
            }
        }else{
			_mz_wx_view (6);//final红包
			_mz_wx_custom(5); 
            $ ('#chaticons').hide();
            $('.hbnull').css('transform','scale('+stageW/640+','+stageH/1039+')');
            $('.hbnull').css('-webkit-transform','scale('+stageW/640+','+stageH/1039+')');
            $('.hbnull').css('top',stageH/2-520+'px');

            $('.hongbao,#hb2').hide();
            TweenMax.set('#hb2',{alpha:0, scale:0.5});
            $('.hbnull,#null2,#btn4,#btn5').show();
            //alert($('#btn5'))
            goshare();
        }
    })

    //看手气：
    $('#btn3').on(touchstart, function(){
        $('.hbnull,#null1').show();
        $('#hb1Open').hide();
		_mz_wx_view (4);//第一个红包看手气页
		_mz_wx_custom(3); 
        setTimeout(function(){
            $('#hbnull .circle').show();
            $('#hbnull .hand').show();
        },2000);
    })

    //详情页：
    //var isTheFirst = true;
    $('#null1').on(touchstart, function(){
        $('#null1,.hbnull').fadeOut();
        $('.hongbao').hide();
        $('#hbnull .circle').remove();
        $('#hbnull .hand').remove();
        $('#hongbao .circle').remove();
        $('#hongbao .hand').remove();
        isTheFirstReceive = false;
        goNextAnimation();
    })

    //关闭
    var isTheFirstClose = true;
    $('#btn1').on(touchstart, function(){
        if(_btn1 == 1){
            if(isTheFirstClose){
                //拆红包页关闭
                $('.hongbao,#hb1').hide();
                $('#hongbao .circle').remove();
                $('#hongbao .hand').remove();
                TweenMax.set('#hb1', {alpha:0, scale:0.5});
                goNextAnimation();
                //isTheFirstClose = false;
            }else{
                $('.hongbao,#hb1Open,#btn3').hide();
                $('#hongbao .circle').remove();
                $('#hongbao .hand').remove();
                TweenMax.to('#hb1Open',.5, {alpha:0, scale:0.5, ease:Bounce.easeOut});
                //第二页点击关闭按钮：
                ct = false;
                goNextAnimation();
            }
        }else{

        }
    })

    //继续下面的动画：
    var cangoNext = true;
    function goNextAnimation(){
        if(cangoNext){
            //$('.iputmessage').show();
            //TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+60+'px'},ease:Linear.easeNone});
            //TweenMax.from('#imessage',1, {y:530, ease:Expo.easeOut,onStart:function(){ $('#imessage').show();  }})
            //sendMessages();
            //cangoNext = false;
            messages2();
        }
    }

    //发送自己的消息
    function sendMessages(){
        $('.send').on(touchstart, function(){
            //TweenMax.to($(".longpage>div").not($('.di')),.5, {css:{'top':_DIST+150+'px'},ease:Linear.easeNone});
            //TweenMax.to('#imessage',.6, {y:0, ease:Linear.easeNone,onComplete:function(){
            //    $('#imessage,.iputmessage').hide();
            //    //motionObj['page'+2].play();
            //    messages2();
            //}})
            //messages2();
        })
    }

    //打开CEO的红包
    $('#redpick2, #msg12 .hand').on(touchstart, function(){
        $('.hongbao,#hb2').show();
		_mz_wx_view (5);//打开CEO红包
		_mz_wx_custom(4); 
        TweenMax.to('#hb2',.5, {alpha:1, scale:1, ease:Bounce.easeOut});
    })

    function goshare(){
        /*$('#btn4,#btn5').show();
        $('#btn4').on(touchstart, function(){
			_mz_wx_custom(6); 

			setTimeout(function(){
				
				location.href='http://leetz.github.io/GirlsdayWechat';
				
				},500); 
            
        });
        $('#btn5').on(touchstart, function(){
						_mz_wx_custom(7); 

            $('.sharepop').fadeIn(300,function(){
                setTimeout(function(){
                    $('.sharepop').fadeOut(300);
                },1500)
            })
        });*/
    }

    //阻止屏幕双击以后向上位移,当有表单页的时候，要关闭阻止事件，否则不能输入文字了
    function initPreventPageDobuleTap(isPreventPageDobuleTap){
        if(isPreventPageDobuleTap){
            $('.page').on(touchstart,function(e){
                e.preventDefault();
            })
        }else{
            $('.page').off(touchstart);
        }
    }

    //关闭浮层
    $('.sharemask').on(touchstart,function(){
        $(this).hide();
    })
});