define(["jquery", "template", "cookie"], function($,template){
  $(function () {
    //判断用户是否登录了，如果没有登录，就给他跳回到登录页
    
    //判断用户是否登录的依据，最好是通过向后台发送请求，问后台用户是否登录，这才是最严谨的判断登录的方式，当前项目中没有提供接口，所以不能这么做
    
    //我们就使用PHPSESSID来作为判断用户是否登录的依据即可
    //如果在cookie有PHPSESSID，那么就证明用户已经登录了
    //如果在cookie没有PHPSESSID，那么就证明用户没有登录了
    //当页面不是登录页面，执行下面的代码
    if(location.pathname != "/dashboard/login"){
      if(!$.cookie("PHPSESSID")){
        location.href = "/dashboard/login";
      };
      
      
      //将存储的cookie数据转换成jsonp，并获取
      var userinfo = JSON.parse($.cookie("userinfo"));
      $("#profile").html(template("profile_tpl", userinfo));



//            //点击退出键返回登录界面
      $("#exit").click(function () {
        $.ajax({
          type : "POST",
          url : "/api/logout",
          success : function (data) {
            if(data.code == 200) {
              alert("退出成功");
              location.href = "/dashboard/login"
            }
          }
        })
      })
    }
    
  })
})