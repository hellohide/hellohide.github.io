/**
 * Created by Administrator on 2016/9/27.
 */
(function($){
    $(function(){
        var landingtex = $(".landingtex");
        var landingpsd = $(".landingpsd");
        var freeregister = $(".freeregister");//登陆页面的免费注册按钮
        var directregister = $(".directregister");//注册页面的直接登录按钮
        var registerright = $(".registerright");//注册页面
        var landingright = $(".landingright");//登陆页面
        //点击注册页面的直接登录,让注册页面消失.让登录页面显示
        directregister.click(function(){
            registerright.css({display:"none"});
            landingright.css({display:"block"})
        })
        freeregister.click(function(){
            registerright.css({display:"block"});
            landingright.css({display:"none"});

        })
        //给一个全局的按钮确定,前面信息是否填写
        var bbtn = false;
        //注册页面
        var registertex = $(".registertex");
        var hintregistertex = $(".hintregistertex");//输入手机号下面的提示信息
        var reg1 = /^1[34578]{1}[0-9]{9}$/;
        //console.dir(registertex.val().length);
        registertex.blur(function(){
            if(registertex.val().length!=0){
                if(reg1.test(registertex.val())){
                    setCookie("手机号",registertex.val() , 7, "/");
                    hintregistertex.html("可以使用");
                    hintregistertex.css({color:"#009900"});
                    bbtn = true;
                }else if(reg1.test(registertex.val())==false){
                    hintregistertex.html("请输入正确的手机号");
                    hintregistertex.css({color:"#ff2400"});
                    bbtn = false;
                }
            }else{
                hintregistertex.html("请输入手机号");
                hintregistertex.css({color:"#ff2400"});
                bbtn = false;
            }

        })
        var arginregisterpsd = $(".arginregisterpsd");//再次输入密码的input框
        var hintarginregisterpsd = $(".hintarginregisterpsd");//再次输入密码的下面提示信息
        var registerpsd = $(".registerpsd");//注册页面的密码input框
        var hintregisterpsd = $(".hintregisterpsd");//注册页面的密码框输入时的提示内容
        var reg2 = /^[a-zA-Z][0-9a-zA-Z]{5,19}$/
        registerpsd.blur(function(){
            if(registerpsd.val().length!=0){
                if(reg2.test(registerpsd.val())){
                    bbtn = true;
                    setCookie("密码",registerpsd.val() , 7, "/");
                    hintregisterpsd.html("");
                }else if(reg1.test(registerpsd.val())==false){
                    hintregisterpsd.html("请输入密码格式,字母开头,6-20位");
                    hintregisterpsd.css({color:"#ff2400"});
                    bbtn = false;
                }
            }else{
                hintregisterpsd.html("请输入密码");
                hintregisterpsd.css({color:"#ff2400"});
                bbtn = false;
            }
        })
        arginregisterpsd.blur(function(){
            if(arginregisterpsd.val().length!=0){
                if(arginregisterpsd.val()!=registerpsd.val()){
                    hintarginregisterpsd.html("两次密码输入不一致");
                    hintarginregisterpsd.css({color:"#ff2400"});
                    bbtn = false;
                }else{
                    hintarginregisterpsd.html("");
                    bbtn = true;
                }
            }else{
                hintarginregisterpsd.html("请再次输入密码");
                bbtn = false;
            }
        })

        //给验证码框随机生成验证码
        var hintregisterverificationcode = $(".hintregisterverificationcode");//验证码信息提示框
        var verificationcode1 = $(".verificationcode1");//验证码显示的框
        var arrcode = [1,2,3,4,5,6,7,8,9,0];
        var newarrcode = [];
        var changeone1 = $(".changeone1");//更换验证码按钮
        changeone1.click(function(){
            newarrcode = [];
            for(var i = 0;i<4;i++){
                var index = Math.ceil(Math.random()*4);
                newarrcode.push(arrcode[index]);
            }
            verificationcode1.html(newarrcode.join(""));
        })
        //判断验证码input框的输出内容是否是随机生成的验证码
        var registerverificationcode = $(".registerverificationcode");
        registerverificationcode.blur(function(){
            if(registerverificationcode.val().length!=0){
                if(registerverificationcode.val()!=verificationcode1.html()){
                    hintregisterverificationcode.html("请输入正确验证码");
                    hintregisterverificationcode.css({color:"#ff2400"});
                    bbtn = false;
                }else{
                    hintregisterverificationcode.html("");
                    bbtn = true;
                }
            }else{
                hintregisterverificationcode.html("请输入验证码");
                bbtn = false;
            }
        })

        var notcodetimer = null
        var notecode = $(".notecode");//短信验证码的输入框
        var getnotecode = $(".getnotecode");//获取手机验证码的框
        var j=60;
        getnotecode.click(function(){
            clearInterval(notcodetimer);
            notcodetimer =  setInterval(function(){
                    j--;
                    getnotecode.html("验证码有效还剩"+j+"秒");
                if(j<0){
                    clearInterval(notcodetimer);
                    getnotecode.html("获取验证码");
                }
            },1000)
        })

        //获取同意条款前面的单选框
        var check = $(".check");
        var checkbtn = true;
        var registerbtn = $(".registerbtn");//立即注册按钮
        check.click(function(){
            if(checkbtn){
                registerbtn.css({background:"#ccc"});
                checkbtn=!checkbtn;
            }else{
                registerbtn.css({background:"#ff2400"});
                checkbtn=!checkbtn;

            }
        })

        //获取立即注册按钮
        var registerbtn = $(".registerbtn");
        var registertimer = null;
        var a = 60;
        registerbtn.click(function(){
            if(bbtn){
                alert("注册成功");
            }else{
                alert("信息填写不完整或不正确,请检查");
            }

        })

        //登录界面
        var landingtex = $(".landingtex");//登录界面的账户名

        console.log(landingtex);
        landingtex.blur(function(){
            if(landingtex.val()!=getCookie("手机号")){
                alert("您还没有注册");
            }
        })

        var landingpsd = $(".landingpsd");//登陆界面的密码
        landingpsd.blur(function(){
            if(landingpsd.val()!=getCookie("密码")){
                alert("您还没有注册此密码");
            }
        })

        //换张验证码按钮
        var changeone = $(".changeone");
        var verificationcode = $(".verificationcode");//验证码显示框
        var arrlanding = [0,1,2,3,4,5,6,7,8,9];
        var newarrlanding = [];
        changeone.click(function(){
            newarrlanding = [];
            for(var z=0;z<4;z++){
                oindex = Math.ceil(Math.random()*4);
                newarrlanding.push(arrlanding[oindex]);
            }
            verificationcode.html(newarrlanding.join(""));
        })
        //判断输入的验证码是否为获取到的验证码
        var landingverificationcode = $(".landingverificationcode");
        landingverificationcode.blur(function(){
            if(landingverificationcode.val().length!=0) {
                if (landingverificationcode.val() != verificationcode.html()) {
                    alert("验证码输入不正确");
                }
            }else{
                alert("请输入验证码");
            }
        })

        //给登录按钮添加时间
        var landingbtn = $(".landingbtn");
        landingbtn.click(function(){
            if(landingtex.val()!==getCookie("手机号")||landingpsd.val()!=getCookie("密码")||landingverificationcode.val() != verificationcode.html()){
                alert("信息填写不正确")
            }else{
                $(window)[0].location="http://localhost:63342/jsproject-gou/html/gouindex.html";

            }

        })

        landingtex.val(getCookie("手机号"))



    })
})(jQuery)