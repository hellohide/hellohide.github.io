/**
 * Created by Administrator on 2016/9/20.
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
        /*//键盘事件
        var messagesearchlist = document.getElementsByClassName("search-list")[0];
        var messagelistli = messagesearchlist.getElementsByTagName("li");
        //console.log(messagelistli)
        var Index=-1;
        var txt = document.getElementsByClassName("tex")[0];
        console.log(txt);
        txt.onkeydown = function(e){
            //alert(1);
            //console.log(messagelistli);
            var event = e || window.event;
            //console.log(1)
            //判断当内容不为空,如果为空时41行(先选中再按上下键)会报错,因为messagelistli找不到,且按上下键,触发onkeydown事件
            if(messagelistli.length && (event.keyCode===38||event.keyCode===40)){//判断当li的值不为空时,且按下键盘的上下键是触发;
                //当事件触发时,索引进行自增
                if(event.keyCode===38){
                    Index--;
                    if(Index<0){
                        Index=messagelistli.length-1;
                    }
                }else{
                    Index++;
                    if(Index==messagelistli.length){
                        Index=0;
                    }
                }
                for(var j=0;j<messagelistli.length;j++){
                    messagelistli[j].className="";
                }
                messagelistli[Index].className="active";
                console.log(Index)
                var spanname = document.getElementsByClassName("span_name")[0].value
                //点击上下键时,这时要改变该文本框的内容;
                txt.value=spanname[Index].value;//innerHTML会把li里面的标签页打印出来,但是innerText不会,它只会打印除里面的文本
                return false;//阻止键盘事件的上按钮会把光标跳转到头部
            }

        }*/
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
            navborder.animate({width:"32px",left:"237px"});
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

        //给banner的ul列表添加划入效果
        var bannernav = $(".bannernav li");
        var bannernavexplainDiv = $(".bannernavexplain>div")
        bannernav.mouseenter(function(){
            var Index = $(this).index();
            bannernav.eq(Index).css({background:"#a90000"}).stop(true).animate({padding:"0 0 0 10px",})
            //当划入li的时候相应的div显示出来
            bannernavexplainDiv.eq(Index).css({display:"block"}).stop(true).animate({opacity:1,left:"225px"})
        })
        bannernav.mouseleave(function(){
            var Index = $(this).index();
            bannernav.eq(Index).css({background:"#cb3e25"}).stop(true).animate({padding:"0 0 0 0",})
            bannernavexplainDiv.eq(Index).css({display:"none"}).stop(true).animate({opacity:0,left:"215px"})
        })
        //当鼠标划过banner里的小图片时,小图片向上运动
        var bannerbigimg = $(".bannerbigimg");
        var bannersmallimg = $(".bannersmallimg")
        var bannerbigimgli = $(".bannerbigimg li");
        var bannersmallimgli = $(".bannersmallimg li");
        var bannerindex = -1;
        var bannertimer = null;
        bannersmallimgli.mouseenter(function(){
            bannerindex = $(this).index();
            bannersmallimgli.animate({top:417}).eq(bannerindex).stop(true).animate({top:"407px"});
            bannerbigimgli.animate({
                opacity: 0
            }, 200, function () {
                $(this).css('display', 'none');
            }).eq(bannerindex).css({display:"block"}).stop(true).animate({opacity:1},200);
        });
        //开启一个定时器让小图片图片自动上去下来
        bannertimer = setInterval(function(){
            bannerindex++;
            if(bannerindex>4){
                bannerindex=0;
            }
            bannersmallimgli.animate({top:417}).eq(bannerindex).stop(true).animate({top:"407px"});
                bannerbigimgli.animate({
                    opacity: 0
                }, 200, function () {
                    $(this).css('display', 'none');
                }).eq(bannerindex).css({display:"block"}).stop(true).animate({opacity:1},200);
},2000)

        //当鼠标离开bannersmallimg的时候,开启一个定时器
        bannersmallimg.mouseleave(function(){
            bannertimer = setInterval(function(){
                bannerindex++;
                if(bannerindex>4){
                    bannerindex=0;
                }
                bannersmallimgli.animate({top:417}).eq(bannerindex).stop(true).animate({top:"407px"});
                bannerbigimgli.animate({
                    opacity: 0
                }, 200, function () {
                    $(this).css('display', 'none');
                }).eq(bannerindex).css({display:"block"}).stop(true).animate({opacity:1},200);
            },2000)
        })

        //当鼠标放在bigimg的时候清除定时器
        bannersmallimg.mouseenter(function(){
            clearInterval(bannertimer);
        })

        //给限时抢购的tab选项卡
        var timebottom = $(".timebottom>a");
        var robgoodsul = $(".robgoods>ul");
        var robindex = -1;
        timebottom.mouseenter(function(){
            robindex = $(this).index();
            robgoodsul.css({display:"none"}).eq(robindex).css({display:"block"});
        })

        //给方向按钮添加切换选项卡
        var left = $(".left");
        var right = $(".right");
        left.click(function(){
            robindex++;
            if(robindex>4){
                robindex=0;
            }
            robgoodsul.css({display:"none"}).eq(robindex).css({display:"block"});
        })
        right.click(function(){
            robindex--;
            if(robindex<0){
                robindex=4;
            }
            robgoodsul.css({display:"none"}).eq(robindex).css({display:"block"});
        })

        //给特卖的字一个飞的特效
        var sporti = $(".sport i");
        setInterval(function(){
            for(var i=0;i<sporti.length;i++){
                sporti.animate({top:0},200).eq(i).animate({top:-7},300)
            }
        },3000)

        //给猜你喜欢模块的方向按钮添加点击事件
        var youlikeleft = $(".youlikeleft");
        var youlikeright = $(".youlikeright");
        var allyoulike = $(".allyoulike");
        var youlikeindex = 0;
        youlikeleft.click(function(){
            youlikeindex--;
            if(youlikeindex<0){
                youlikeindex=allyoulike.length-1;
            }
            allyoulike.css({display:"none"}).eq(youlikeindex).css({display:"block"})
        })
        youlikeright.click(function(){
            youlikeindex++;
            if(youlikeindex>allyoulike.length-1){
                youlikeindex=0;
            }
            allyoulike.css({display:"none"}).eq(youlikeindex).css({display:"block"})
        })

        //给1楼添加轮播效果
        var onefloorimgoutside = $(".onefloorimgoutside");
        var onefloorimginside = $(".onefloorimginside");
        var onefloorpathleft = $(".onefloorpathleft");
        var onefloorpathright = $(".onefloorpathright");
        var onefloorindex = 1;
        var onefloorwidth = 90;
        var onefloorbtn = true;
        var onefloortime = null;
        onefloorpathleft.click(function(){
            if(onefloorbtn){
                onefloorbtn = false;
                onefloorindex--;
                //console.log(onefloorindex);
                onefloorimginside.animate({left:onefloorindex*-onefloorwidth},function(){
                    onefloorbtn = true;
                    if(onefloorindex==2){
                        onefloorimginside.css({left:-2*onefloorwidth})
                    }
                })
                if(onefloorindex==0){
                    onefloorindex = 2;
                }
            }
        })
        //给右按钮添加点击时间
        onefloorpathright.click(function(){
            if(onefloorbtn){
                onefloorbtn = false;
                onefloorindex++;
                //console.log(onefloorindex);
                onefloorimginside.animate({left:onefloorindex*-onefloorwidth},function(){
                    onefloorbtn = true;
                    if(onefloorindex==1){
                        onefloorimginside.css({left:-onefloorwidth})
                    }
                })
                if(onefloorindex==3){
                    onefloorindex = 1;
                }
            }
        })
        //开启一个自动向右轮播
        onefloortime = setInterval(function(){
            if(onefloorbtn){
                onefloorbtn = false;
                onefloorindex++;
                //console.log(onefloorindex);
                onefloorimginside.animate({left:onefloorindex*-onefloorwidth},function(){
                    onefloorbtn = true;
                    if(onefloorindex==1){
                        onefloorimginside.css({left:-onefloorwidth})
                    }
                })
                if(onefloorindex==3){
                    onefloorindex = 1;
                }
            }
        },2000)
        //当鼠标滑入大的imgdiv的时候,清除定时器
        var onefloorimg = $(".onefloorimg");
        onefloorimg.mouseenter(function(){
            clearInterval(onefloortime);
        })
        //当鼠标离开大的imgdiv的时候,开启定时器
        onefloorimg.mouseleave(function(){
            onefloortime = setInterval(function(){
                if(onefloorbtn){
                    onefloorbtn = false;
                    onefloorindex++;
                    //console.log(onefloorindex);
                    onefloorimginside.animate({left:onefloorindex*-onefloorwidth},function(){
                        onefloorbtn = true;
                        if(onefloorindex==1){
                            onefloorimginside.css({left:-onefloorwidth})
                        }
                    })
                    if(onefloorindex==3){
                        onefloorindex = 1;
                    }
                }
            },2000)


        })

        //吸顶菜单
        var topmenu = $(".topmenu");
        $(window).scroll(function(){
            var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
            //var marTop = 420-scrollTop;
            topmenu.css({display:"block"});
            if(scrollTop<1600){
                topmenu.css({display:"none"});
            }else{
                topmenu.css({display:"block"});
            }
        });


    })
})(jQuery)

window.onload = function(){
    //var timetop1li2 = document.getElementsByClassName("timetop1li2");
    var spantime = document.getElementById("spantime");
    function timer(){
        var time = new Date();
        var time1 = new Date("2016/11/01");
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
        spantime.innerHTML = day+":"+hour+":"+minu+":"+secon;
    }
    setInterval(timer,1000);

    var specialofferp2 = document.getElementsByClassName("specialofferp2time");
    function timer1(){
        var time = new Date();
        var time1 = new Date("2016/11/01");
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
        for(var i=0;i<specialofferp2.length;i++){
            specialofferp2[i].innerHTML = hour+"小时"+minu+"分钟"+secon+"秒";
        }
    }
    setInterval(timer1,1000);
}
