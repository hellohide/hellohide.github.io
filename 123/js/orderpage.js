/**
 * Created by Administrator on 2016/9/28.
 */
(function($){
    $(function(){
        var writepostcode = $(".writepostcode");//邮编框
        var regpostcode = /\d{6}/;
        writepostcode.blur(function(){
            if(writepostcode.val().length!=0 && regpostcode.test(writepostcode.val())==false){
                alert("请输入正确邮编");
            }
        })

        //获取收货人姓名所在的标签
        var consignee = $(".consignee");
        var regconsignee = /^[\u4e00-\u9fa5]{2,4}$/;
        console.log(consignee);
        consignee.blur(function(){
            if(consignee.val().length!=0 && regconsignee.test(consignee.val())==false){
                alert("请输入正确的姓名");
            }
        })


        //获取手机号码的输入框
        var phonenum = $(".phonenum");
        var regphonenum = /^1[34578][0-9]{9}$/;
        phonenum.blur(function(){
            if(phonenum.val().length!=0 && regphonenum.test(phonenum.val())==false){
                alert("请输入正确的手机号");
            }
        })

        //获取座机号码的输入框
        var specialplane = $(".specialplane");
        var regspecialplane = /^6[0-9]{7}$/;
        specialplane.blur(function(){
            if(specialplane.val().length!=0 && regspecialplane.test(specialplane.val())==false){
                alert("请输入正确的座机号码");
            }
        })


        //订单页的购物车
        var productsetul = $(".productsetul");
        var goodsnum = $(".goodsnum");//共计商品的件数;
        var goodsprices = $(".goodsprices");//共计商品的价格;
        var goodscheck = $(".goodschcek");//获取商品前面的单选框
        var productsetul2li4 = $(".productsetul2li4");//新添产品的小计里面的价钱
        if(getCookie("maskimg")) {
            var str = "<ul class='productsetul2'>" + '<li class="productsetul2li1"><img src=' + getCookie("maskimg") + '>' + '<p class="productsetul2p1"><a href="javascript:;">' + getCookie("maskmessage") + '</a></p>' + '<div>' + getCookie("maskstandard") + '</div>' + '</li>' + '<li class="productsetul2li2">' + '￥' + getCookie("maskprice") + '</li>' + '<li class="productsetul2li3">' + getCookie("number") + '</li>' + '<li class="productsetul2li4">' + '￥' + parseInt(getCookie("maskprice")) * parseInt(getCookie("number")) + '</li></ul>'

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

        var goodsdefray1 = $(".goodsdefray1");//商品总额
        var goodsdefray2 = $(".goodsdefray2");//订单总额
        var goodsdefray3 = $(".goodsdefray3");//支付总额
        if(getCookie("number")){
            goodsdefray1.html(parseInt(getCookie("maskprice")) * parseInt(getCookie("number")));
            goodsdefray2.html(parseInt(getCookie("maskprice")) * parseInt(getCookie("number")));
            goodsdefray3.html(parseInt(getCookie("maskprice")) * parseInt(getCookie("number")));
        }else{
            goodsdefray1.html("0.00");
            goodsdefray2.html("0.00");
            goodsdefray3.html("0.00");
        }

        //返回购物车按钮
        var backshoppingcart = $(".backshoppingcart");
        backshoppingcart.click(function(){
            $(window)[0].location = "http://localhost:63342/jsproject-gou/html/shoppingcartpage.html";
        })

    })
})(jQuery)
