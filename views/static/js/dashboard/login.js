define(["jquery","cookie"],function ($) {
  $(function () {
    //当用户输入用户名和密码后，点击或者回车键的时候，成功则登录首页

//1,获取表单 注册提交事件
    $("form").submit(function () {
      //获取用户输入用户名 和 密码
      var userName = $("#tc_name").val();
      var pass = $("#tc_pass").val();
      
      //在此之前先进行判断，如果用户名密码和用户名为空，则提示用户填写，不可提交
      if(userName.trim() == ""){
        alert("请输入用户名");
        return false;
      }
      if(pass.trim() == ""){
        alert("请输入密码");
        return false;
      }
      
      
      
      
      //得到用户名密码发送ajax请求
      $.ajax({
        type : "post",
        url : "/api/login",
        data : {
          tc_name : userName,
          tc_pass : pass
        },
        success : function (data) {
//                        console.log(data);
          //请求到数据，进行判断
          if(data.code == 200) {
            
            //把data返回的数据存储到cookie里面
            $.cookie("userinfo",JSON.stringify(data.result),{expires:365,path:"/"})
            
            
            //让用户跳转首页
            location.href = "/"
          }
        }
      })
      
      
      //阻止表单的默认提交事件
      // e.preventDefault();
      return false;
    })
  })
})


