/**
 * Created by Administrator on 2016/9/24.
 */
(function($){
    $(function(){
        var headClose = $(".header-close");
        var header = $(".header");
        //给头部的关闭按钮添加点击事件
        headClose.click(function(){
            header.css({display:"none"});
        })
        var hMrpulldown = $(".hMr-pull-down");
        var hMrfirst = $(".hMrfirst");
        var pulldown = $(".pulldown");

        //给头部主要内容的右边的内容的第一个li添加滑过事件
        hMrpulldown.mouseenter(function(){
            pulldown.css({display:"block"});
            hMrpulldown.css({border:"1px solid #ccc",borderBottom:"none"});
            pulldown.css({border:"1px solid #ccc",borderTop:"none"});
            pulldown.animate({display:"block",height:144},200)
        })
        hMrpulldown.mouseleave(function () {
            //pulldown.css({display:"none"});
            pulldown.stop(true).animate({height: 0},200, function () {
                $(this).css({display: "none", border: "1px solid #f5f5f5", borderTop: "none"});
                hMrpulldown.css({border: "1px solid #f5f5f5",borderBottom:"none"})
            })
        })


        //给头部主要内容的右边的内容的最后一个li添加滑过事件
        var hMrlast = $(".hMrlast");
        var app = $(".app");
        hMrlast.mouseenter(function(){
            app.css({display:"block"}).animate({height:125},200);
        })
        hMrlast.mouseleave(function(){
            app.stop(true).animate({height:0},200,function(){
                $(this).css({display:"none"})
            })
        })


        //给logo里面的form框添加滑过事件
        var tex = $(".tex");
        tex.mouseenter(function(){
            tex.css({borderColor:"#666"});
        })
        tex.mouseleave(function(){
            tex.css({borderColor:"#cc1d00"});
        })
        //给logo里面的form框添加聚焦事件
        tex.focus(function(){
            tex.val("");
        })
        tex.blur(function(){
            if(tex.val()==""){
                tex.val("请输入商品名称,支持拼音搜索");
            }
        })

        //给logo里面的form框添加跨域
        var searchlist = $(".search-list");
        var texvalue = "";
        tex.bind("input propertychange",function(){
            texvalue = tex.val();
            searchlist.css({borderColor:"#ccc"});
            if($(this).val()!==""){
                $.ajax({
                    url: 'http://www.gou.com/search/getkey.do?',
                    jsonp: 'jsoncallback',
                    dataType: 'jsonp',
                    data: {
                        q: $(this).val()
                    },
                    success: function (data) {
                        var aContent = data.Content.split('\n');
                        var sHtml = '';
                        for(var i =0; i < aContent.length-1; i++) {
                            sHtml += '<li>' + aContent[i] + '</li>';
                        }
                        searchlist.html(sHtml);
                    }
                });
            }
        })

        //文本框失去焦点事件
        tex.blur(function(){
            searchlist.css({borderColor:"#fff",display:"none"});
            $.ajax({
                url: 'http://www.gou.com/search/getkey.do?',
                jsonp: 'jsoncallback',
                dataType: 'jsonp',
                data: {
                    q: $(this).val()
                },
                success: function (data) {
                    var aContent = data.Content.split('\n');
                    var sHtml = '';
                    for(var i =0; i < aContent.length-1; i++) {
                        sHtml += '<li>' + aContent[i] + '</li>';
                    }
                    searchlist.html(sHtml);
                }
            });
        })
        //文本框获取焦点事件
        tex.focus(function(){
            searchlist.css({borderColor:"#ccc",display:"block"});
            $.ajax({
                url: 'http://www.gou.com/search/getkey.do?',
                jsonp: 'jsoncallback',
                dataType: 'jsonp',
                data: {
                    q: $(this).val()
                },
                success: function (data) {
                    var aContent = data.Content.split('\n');
                    var sHtml = '';
                    for(var i =0; i < aContent.length-1; i++) {
                        sHtml += '<li>' + aContent[i] + '</li>';
                    }
                    searchlist.html(sHtml);
                }
            });

        });


        //给nav里面的li加入滑动门效果
        var navli = $(".navul li");
        var navliA = $(".navul a");
        var limargin = 24;
        var navborder = $(".navborder");
        navli.mouseenter(function(){
            var oindex = $(this).index();
            if(oindex == 0){
                navborder.animate({width:"32px",left:"237px"});
            }else{
                navborder.stop(true).animate({width:navli.eq(oindex).width()+"px",left:(navli.eq(oindex).offset().left)+"px"})
            }
        })
        navli.mouseleave(function(){
            navborder.animate({width:"64px",left:"557px"});
        })


        //给nav里面的整点抢li加入向上滚动效果
        var full = $(".full");
        var click = $(".click");
        var rob = $(".rob");
        var full1 = $(".full1");
        var click1 = $(".click1");
        var rob1 = $(".rob1");
        var aCode = [full, click, rob, full1, click1, rob1];
        var iIndexCode = 0;
        var oTimer = null;
        setInterval(function () {
            if(iIndexCode !== 0) {
                clearInterval(oTimer);
                for(var i =0; i < aCode.length; i++) {
                    aCode[i].css({top:i < 3 ? 0 : 32});
                }
                iIndexCode = 0;
            }
            oTimer = setInterval(function () {
                if(iIndexCode<=5){
                    aCode[iIndexCode].animate({top: iIndexCode < 3 ? -32 : 0}, 200, function () {
                        if(iIndexCode >= aCode.length){
                            clearInterval(oTimer);
                            for(var i =0; i < aCode.length; i++) {
                                aCode[i].css({top:i < 3 ? 0 : 32});
                            }
                            iIndexCode = 0;
                        }
                    });
                }
                iIndexCode++;
            }, 300);
        }, 3000);

        //给nav里的购物车div添加点击效果
        var shoppingCart = $(".shopping-cart");
        shoppingCart.click(function(){
            alert("您的购物车里没有商品,请继续购物!")
        })
        //给全部商品分类加入移入移除效果
        var navgoods = $(".navgoods");
        var arrows = $(".arrows");
        var bannernav = $(".bannernav");
        //console.log(bannernav)
        navgoods.mouseenter(function(){
            console.log(bannernav);
            arrows.css({background:"url(../images/arrows.png) no-repeat 0 0"});
            bannernav.css({display:"block"}).stop(true).animate({height:480});
            //navgoods.stop(true).animate({height:516});

        })
        navgoods.mouseleave(function(){
            arrows.css({background:"url(../images/arrows.png) no-repeat 0 -11px"});
            /*bannernav.animate({height:0},function(){"display","none"
            })*/
            bannernav.stop(true).animate({height:0},function(){
                bannernav.css({display:"none"});
            });


        })
        //给banner的ul列表添加划入效果
        var bannernavexplain = $(".bannernavexplain");
        var bannernavli = $(".bannernav li");
        var bannernavexplainDiv = $(".bannernavexplain>div")
        bannernavli.mouseenter(function(){
            var Index = $(this).index();
            bannernavli.eq(Index).css({background:"#a90000"}).stop(true).animate({padding:"0 0 0 10px",})
            //当划入li的时候相应的div显示出来
            bannernavexplainDiv.eq(Index).css({display:"block"}).stop(true).animate({opacity:1,left:"225px"})
        })
        bannernavli.mouseleave(function(){
            var Index = $(this).index();
            bannernavli.eq(Index).css({background:"#cb3e25"}).stop(true).animate({padding:"0 0 0 0",})
            bannernavexplainDiv.eq(Index).css({display:"none"}).stop(true).animate({opacity:0,left:"215px"})
        })

        //给右边隐藏栏下面的ul添加点击事件
        var rightmenuul2 = $(".rightmenuul2 li");
        var allexplain   = $(".rightmenuul2 div");
        rightmenuul2.mouseenter(function(){
            var oindex = $(this).index();
            allexplain.eq(oindex).stop(true).animate({opacity:1})
        })
        rightmenuul2.mouseleave(function(){
            var oindex = $(this).index();
            allexplain.eq(oindex).stop(true).animate({opacity:0})
        })

        //给右边的隐藏栏的注册里面的验证码一栏添加随机生成4为验证码
        var showcode = $(".showcode");
        showcode.click(function(){
            var codearr = [];
            for(var i=0;i<4;i++){
                var code = Math.ceil(Math.random()*9);
                codearr.push(code);
            }
            var show = codearr.join("");
            showcode.val(show);
        })
        var change = $(".change");
        change.click(function(){
            var codearr = [];
            for(var i=0;i<4;i++){
                var code = Math.ceil(Math.random()*9);
                codearr.push(code);
            }
            var show = codearr.join("");
            showcode.val(show);
        })

        //给右边隐藏框的按钮添加点击时间,
        var username = $(".username");
        var rightmenu = $(".rightmenu");
        var  buycar = $(".buycar");
        var  collect=$(".collect");
        var renovation=$(".renovation");
        var content = 0;
        var bbtn = true;
        var rightmenurightCar = $(".rightmenuright-car");
        var rightmenurightRegister = $(".rightmenuright-register")
        username.click(function(){
            bbtn = false;
            content++;
            rightmenu.animate({right:0});
            if(rightmenu.animate({right:0})){
                rightmenurightCar.css({display:"block"});
                rightmenurightRegister.css({display:"none"})
            }
            if(content!=1&&content%2!=0&&bbtn){
                rightmenu.animate({right:"-280px"});
                bbtn=true;
            }
        })
        buycar.click(function(){
            bbtn=false;
            content++;
            rightmenu.animate({right:0});
            if(rightmenu.animate({right:0})){
                rightmenurightCar.css({display:"none"});
                rightmenurightRegister.css({display:"block"})
            }
            if(content!=1&&content%2!=0){
                rightmenu.animate({right:"-280px"});
                bbtn=true;
            }
        })
        renovation.click(function(){
            rightmenu.animate({right:0});
            if(rightmenu.animate({right:0})){
                rightmenurightCar.css({display:"block"});
                rightmenurightRegister.css({display:"none"})
            }
        })
        collect.click(function(){
            bbtn=false;
            content++;
            rightmenu.animate({right:0});
            if(rightmenu.animate({right:0})){
                rightmenurightCar.css({display:"none"});
                rightmenurightRegister.css({display:"block"})
            }
            if(content!=1&&content%2!=0){
                rightmenu.animate({right:"-280px"});
                bbtn=true;
            }
        })


        //给返回顶部按钮添加点击事件
        var backtop = $(".backtop");
        ispeed = -300;
        var backtoptimer = null;
        backtop.click(function(){
            backtoptimer = setInterval(function(){
                document.body.scrollTop=document.body.scrollTop+ispeed;
                document.documentElement.scrollTop=document.documentElement.scrollTop+ispeed;
                if(document.body.scrollTop==0&&document.documentElement.scrollTop==0){
                    clearInterval(backtoptimer)
                }
            },30)
        })


        //给面膜产品加入滑入事件
        var maskgoods1 = $(".maskgoods1");
        var joinshoppingcart = $(".joinshoppingcart");
        var maskindex = 0;
        maskgoods1.mouseenter(function(){
            maskindex = $(this).index();
            joinshoppingcart.eq(maskindex).css({display:"block"});
            maskgoods1.eq(maskindex).css({border:"1px solid #ccc",borderBottom:"2px solid #c91f00"})
        })
        maskgoods1.mouseleave(function(){
            joinshoppingcart.eq(maskindex).css({display:"none"});
            maskgoods1.eq(maskindex).css({border:"1px solid #fff",borderBottom:"2px solid #fff"})
        })



    })
})(jQuery)

//给banner图添加倒计时
window.onload = function(){
    var timeremaining = document.getElementsByClassName("timeremaining")[0];
    function timer(){
        var time = new Date();
        var time1 = new Date("2016/10/01");
        var cha = time1-time;
        var day = parseInt(cha/1000/60/60/24);
        var hour = parseInt(cha/1000/60/60%24);
        var minu = parseInt(cha/1000/60%60);
        var secon = parseInt(cha/1000%60);
        if(day>=10){
            day = day;
        }else{
            day = "0"+day;
        }
        if(hour>=10){
            hour = hour;
        }else{
            hour = "0"+hour;
        }
        if(minu>=10){
            minu = minu;
        }else{
            minu = "0"+minu;
        }
        if(secon>=10){
            secon = secon;
        }else{
            secon = "0"+secon;
        }
        timeremaining.innerHTML = hour+"小时"+minu+"分钟"+secon+"秒";
    }
    setInterval(timer,1000);
}


