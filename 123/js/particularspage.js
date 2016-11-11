/**
 * Created by Administrator on 2016/9/25.
 */
(function($){
    $(function(){
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
                navborder.animate({width:"0",left:"237px"});
            }else{
                navborder.stop(true).animate({width:navli.eq(oindex).width()+"px",left:(navli.eq(oindex).offset().left)+"px"})
            }
        })
        navli.mouseleave(function(){
            navborder.animate({width:"0",left:"237px"});
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
            arrows.css({background:"url(../images/arrows.png) no-repeat 0 0"});
            //bannernav.css({display:"block"});
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
            bannernavexplain.css({display:"block"});
            bannernavli.eq(Index).css({background:"#a90000"}).stop(true).animate({padding:"0 0 0 10px",})
            //当划入li的时候相应的div显示出来
            bannernavexplainDiv.eq(Index).css({display:"block"}).stop(true).animate({opacity:1,left:"225px"})
        })
        bannernavli.mouseleave(function(){
            var Index = $(this).index();
            bannernavexplain.css({display:"none"});
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

        //给图片加入tab选项卡
        var productlistli = $(".productlist li");
        var productbigimg = $(".productbigimg img");
        var filter = $(".filter");
        var imgbigproductimg = $(".bigproductimg img");
        productlistli.mouseenter(function(){
            var productlistindex = $(this).index();
            productbigimg.attr({src:"../particularsimages/productbigimg"+(productlistindex+1)+".jpg"})
            imgbigproductimg.attr({src:"../particularsimages/productbigimg"+(productlistindex+1)+".jpg"});
        })

        //给购买数量添加点击事件
        var paramenter6a1 = $(".paramenter6a1");
        var paramenter6a2 = $(".paramenter6a2");
        var goodsnum = $(".num");
        var goodscount = 1;

        paramenter6a2.click(function(){
            goodscount+=1;
            goodsnum.val(goodscount);
            paramenter6a1.css({cursor:"pointer",color:"#666"});
        })
        paramenter6a1.click(function(){
            if(goodscount==1){
                paramenter6a1.css({cursor:"not-allowed",color:"#ccc"});
                return false;
            }else{
                goodscount-=1;
                paramenter6a1.css({cursor:"pointer",color:"#666"});
            }
            goodsnum.val(goodscount);
        })

        //优惠搭配给其点击事件,然后计算价位
        var cont1 = $(".cont1");//全部搭配下的计数器
        var cont2 = $(".cont2");//右边的计数器
        var spanprice = $(".spanprice");//span里的价格
        var saveprice = $(".saveprice");//节省的价格
        var input1 = $(".input1");//获取第1个input
        var input2 = $(".input2");//获取第2个input
        var input3 = $(".input3");//获取第3个input
        var input4 = $(".input4");//获取第4个input
        var input5 = $(".input5");//获取第5个input
        var input6 = $(".input6");//获取第6个input
        var input7 = $(".input7");//获取第7个input
        var allcont = 1;
        var allprice = 0;
        var allsaveparice = 0
        var arrspanprice = [];//定义一个数组去接受所有节省后的价格的标签
        var arrsaveprice = [];//定义一个数组去接受所有原来价格的标签
        for(var i = 1;i<8;i++) {//获取所有原来的价格标签对象和节省后的价格的标签的对象;
            arrspanprice.push($('.spanprice' + i));
            arrsaveprice.push($('.saveprice' + i));
        }
        var btn1 = false;
        input1.click(function(){
            if(btn1){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[0].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[0].html());
                spanprice.html(allprice);
                saveprice.html(allsaveparice);
                btn1=!btn1;
            }else if(btn1==false){
                btn1=!btn1;
                if(allcont==0){
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[0].html());
                    /*allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[0].html());*/
                    saveprice.html(30);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });

        var btn2 = true;
        input2.click(function(){
            if(btn2){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[1].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[1].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn2 = !btn2;
            }else if(btn2==false){
                btn2 = !btn2;
                if(allcont==0){
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[1].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[1].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var btn3 = true;
        input3.click(function(){
            if(btn3){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[2].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[2].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn3 = !btn3;
            }else if(btn3==false){
                btn3 = !btn3;
                if(allcont==0){
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[2].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[2].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var btn4 = true;
        input4.click(function(){
            if(btn4){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[3].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[3].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn4 = !btn4;
            }else if(btn4==false){
                btn4 = !btn4;
                if(allcont==0){
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[3].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[3].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var btn5 = true;
        input5.click(function(){
            if(btn5){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[4].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[4].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn5 = !btn5;
            }else if(btn5==false){
                btn5 = !btn5;
                if(allcont==0){
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[4].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[4].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var btn6 = true;
        input6.click(function(){
            if(btn6){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[5].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[5].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn6 = !btn6;
            }else if(btn6==false){
                btn6 = !btn6;
                if(allcont==0){
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[5].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[5].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var btn7 = true;
        input7.click(function(){
            if(btn7){
                allcont+=1;
                cont1.html(allcont);
                cont2.html(allcont);
                allprice=parseFloat(spanprice.html())+parseFloat(arrspanprice[6].html());
                allsaveparice = parseFloat(saveprice.html())+parseFloat(arrsaveprice[6].html());
                saveprice.html(allsaveparice);
                spanprice.html(allprice);
                btn7 = !btn7;
            }else if(btn7==false){
                btn7 = !btn7;
                if(allcont==0){
                    allprice=parseFloat(spanprice.html());
                    allsaveparice = parseFloat(saveprice.html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont = allcont;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }else if(allcont>0){
                    allprice=parseFloat(spanprice.html())-parseFloat(arrspanprice[6].html());
                    allsaveparice = parseFloat(saveprice.html())-parseFloat(arrsaveprice[6].html());
                    saveprice.html(allsaveparice);
                    spanprice.html(allprice);
                    allcont-=1;
                    cont1.html(allcont);
                    cont2.html(allcont);
                }
            }
        });
        var num = $(".num");//重新获取num的input
        //给joincar里面的li添加滑过时,添加class名
        var joincarli = $(".joincar li");
        joincarli.click(function(){
            var joincarindex = $(this).index();
            joincarli.removeClass("joincaractive").eq(joincarindex).addClass("joincaractive")
        })

        //当我点击加入购物车的时候,把其信息添加到cookie中
        var particularsjoincart = $(".particularsjoincart");
        particularsjoincart.click(function(){

            setCookie("maskprice",99,7,"/");
            setCookie("maskmessage","全球购【双重补水】佑天兰Utena  普丽莎 水盈透明质酸面膜（抽取式）（海外版）",7,"/");
            setCookie("maskstandard","规格:件",7,"/");
            setCookie("number",num.val(),7,"/");
            setCookie("maskimg",'../particularsimages/productbigimg1.jpg',7,"/")
        })


    })
})(jQuery)

window.onload = function(){
    //给大图片所在的div添加滑入时过滤镜显示效果
    var productbigimg =document.getElementsByClassName("productbigimg")[0];
    var filter =document.getElementsByClassName("filter")[0];
    var marx = parseInt(productbigimg.offsetWidth)-175;
    var mary = parseInt(productbigimg.offsetHeight)-175;
    var productbigimg = document.getElementsByClassName("productbigimg")[0];
    var bigproductimg = document.getElementsByClassName("bigproductimg")[0];
    var imgbigproductimg = bigproductimg.getElementsByTagName("img")[0];
    var product = document.getElementsByClassName("product")[0];
    productbigimg.onmouseenter=function(e){
        filter.style.display="block";
        filter.style.background="yellow";
        filter.opacity=0.6;
        bigproductimg.style.display="block";
        var event1 = e ||　window.event;
        //鼠标滑入时进行移动
        productbigimg.onmousemove = function(ev){
            //alert(1);
            var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
            var event = ev || window.event;
            var x = event.clientX-filter.clientWidth/2 - product.offsetLeft ;
            var y = event.clientY-filter.clientHeight/2-scrolltop-product.offsetTop ;
            if(x<0){
                x = 0;
            }
            if(x>marx){
                x = marx;
            }
            if(y<0){
                y = 0;
            }
            if(y>mary){
                y = mary;
            }
            filter.style.left = x+"px";
            filter.style.top = y+"px";
            imgbigproductimg.style.left = -x*(400/175)+"px";
            imgbigproductimg.style.top = -y*(400/175)+"px";
        }

    }
    productbigimg.onmouseleave = function(){
        filter.style.display="none";
        bigproductimg.style.display="none";
        productbigimg.onmousmove = null;
    }
}
