/**
 * Created by Administrator on 2016/9/27.
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

        console.log(getCookie("maskimg"));
        var productsetul = $(".productsetul");
        var goodsnum = $(".goodsnum");//共计商品的件数;
        var goodsprices = $(".goodsprices");//共计商品的价格;
        var goodscheck = $(".goodschcek");//获取商品前面的单选框
        var productsetul2li3a1 = $(".productsetul2li3a1");//获得减号按钮
        var productsetul2li3a2 = $(".productsetul2li3a2");//获得加好按钮
        var goodsnumber = $(".goodsnumber");//新添加产品的数量所在的input框
        var productsetul2li4 = $(".productsetul2li4");//新添产品的小计里面的价钱


        if(getCookie("maskimg")) {
            var str = "<ul class='productsetul2'>" + '<li class="productsetul2li1"><input class="goodscheck" type="checkbox" checked="checked"/><img src=' + getCookie("maskimg") + '>' + '<p class="productsetul2p1"><a href="javascript:;">' + getCookie("maskmessage") + '</a></p>' + '<div>' + getCookie("maskstandard") + '</div>' + '</li>' + '<li class="productsetul2li2">' + '￥' + getCookie("maskprice") + '</li>' + '<li class="productsetul2li3"><a class="productsetul2li3a1" href="javascript:;">-</a><input class="goodsnumber" type="text" value=' + getCookie("number") + '><a class="productsetul2li3a2" href="javascript:;">+</a></li>' + '<li class="productsetul2li4">' + '￥' + parseInt(getCookie("maskprice")) * parseInt(getCookie("number")) + '</li>' + '<li class="productsetul2li5">删除</li></ul>'

            productsetul.html(str);
            goodscheck = $(".goodscheck");//商品前面的单选框;
            productsetul2li3a1 = $(".productsetul2li3a1");//获得减号按钮
            productsetul2li3a2 = $(".productsetul2li3a2");//获得加好按钮
            goodsnumber = $(".goodsnumber");//新添加产品的数量所在的input框
            goodsnum = $(".goodsnum");//共计商品的件数;
            goodsprices = $(".goodsprices");//共计商品的价格;
            productsetul2li4 = $(".productsetul2li4");//新添产品的小计里面的价钱
            goodsnum.html(getCookie("number"));
            goodsprices.html(parseInt(getCookie("maskprice")) * parseInt(getCookie("number")))
        }
        //给减号按钮添加事件
        var allnum = parseInt(getCookie("number"));
        productsetul2li3a1.click(function(){
            if(allnum>0){
                allnum--;
                goodsnumber.val(allnum);
                goodsnum.html(allnum);
                goodsprices.html(parseInt(getCookie("maskprice")) * parseInt(allnum));
                productsetul2li4.html(parseInt(getCookie("maskprice")) * parseInt(allnum))
            }else{
                goodsnumber.val("0");
                goodsnum.html("0");
                goodsprices.html("0.00");
                productsetul2li4.html("0.00")
            }

        })
        productsetul2li3a2.click(function(){
            if(allnum>=0){
                allnum++;
                goodsnumber.val(allnum);
                goodsnum.html(allnum);
                goodsprices.html(parseInt(getCookie("maskprice")) * parseInt(allnum));
                productsetul2li4.html(parseInt(getCookie("maskprice")) * parseInt(allnum))
            }else{
                goodsnumber.val("0");
                goodsnum.html("0");
                goodsprices.html("0.00");
                productsetul2li4.html("0.00")
            }

        })

        var goodscontent = 0
        var goodscheckbtn = true;
        goodscheck.click(function(){
            goodscontent++;
            if(goodscheckbtn){
                goodsnum.html('0');
                goodsprices.html("0.00");
                goodscheckbtn = !goodscheckbtn;
            }else{
                goodsnum.html(allnum);
                goodsprices.html(parseInt(getCookie("maskprice")) * parseInt(allnum));
                goodscheckbtn = !goodscheckbtn;
            }
        })

        //获取全选框
        var checkbox = $(".checkbox");
        var checkboxbtn = true;
        checkbox.click(function(){
            if(checkboxbtn){
                goodsnum.html('0');
                goodsprices.html("0.00");
                checkboxbtn = !checkboxbtn;
                goodscheck.attr("checked",false);
                goodscheckbtn = false;
            }else{
                goodsnum.html(allnum);
                goodsprices.html(parseInt(getCookie("maskprice")) * parseInt(allnum));
                checkboxbtn = !checkboxbtn;
                goodscheck.prop("checked",true);
                goodscheckbtn = true;
            }
        })

        //删除按钮
        var productsetul2li5 = $('.productsetul2li5');
        productsetul2li5.click(function(){
            productsetul.remove();
            setCookie("maskprice",0,-1,"/");
            setCookie("maskmessage","",-1,"/");
            setCookie("maskstandard","",-1,"/");
            setCookie("number",'',-1,"/");
            setCookie("maskimg",'',-1,"/")
        })

        //给去结算按钮添加点击跳转功能
        var settleaccountsLbut = $(".settleaccountsLbut");
        settleaccountsLbut.click(function(){
            $(window)[0].location = "http://localhost:63342/jsproject-gou/html/orderpage.html";
        })

    })
})(jQuery)

