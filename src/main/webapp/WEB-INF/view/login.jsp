<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<% String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath(); %>
<head>
	<meta http-equiv="content-type" content="text/html">
	<meta charset="UTF-8">
	<title>SpringBoot学习|登录</title>
	<link rel="stylesheet" href="<%=contextPath%>/static/css/animate.min.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/css/bootstrap.min.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/css/font-awesome.min.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/css/style.min.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/css/iconfont.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/js/validator-0.7.3/jquery.validator.css">
	<link rel="stylesheet" href="<%=contextPath%>/static/css/sweetalert/sweetalert.css">
	<script src="<%=contextPath%>/static/js/jquery-1.8.3.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/static/js/validator-0.7.3/jquery.validator.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/static/js/validator-0.7.3/local/zh_CN.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/static/js/host.js"></script>
	<script type="text/javascript" src="<%=contextPath%>/static/js/sweetalert/sweetalert.min.js"></script>
</head>
<body bgcolor="#FFFFFF">
	<div class="middle-box text-center loginscreen  ">
        <div >
            <div onclick="boke();" class="animated animated lightSpeedIn ">
                <i class="icon iconfont">&#xf0028;</i>
            </div>
            <form id="userForm" class=" animated rollIn" data-validator-option="{theme:'yellow_right_effect',stopOnError:true}">
                <div class="form-group">
                    <input type="text" class="form-control"  placeholder="用户名" data-rule="用户名:required" id = "username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="密码" data-rule="密码:required;password" id = "password">
                </div>
                <div class="form-group col-xs-6" style="padding-left: 0px;">
                	<img src="/getGifCode">
                </div>
                <div class="form-group col-xs-6">
                    <span><input type="text" class="form-control" placeholder="验证码" data-rule="验证码:required" id = "vcode"></span>
                </div>
                <div class="form-group" style="text-align : left">
					<label><input type="checkbox" id="rememberMe" style="width: 12px; height: 12px;margin-right: 5px;">记住我</label>
				</div>
                <button type="submit" class="btn btn-primary block full-width " onclick="login();">登 录</button>
            </form>
            <br/>
            <br/>
            <div class = "animated bounceInLeft" onclick="boke();">
                © 2017 All Rights Reserved. 邹海清|z77z的小码窝
            </div>
        </div>
    </div>
	<div class="part" style="z-index:-1;position:fixed;height:100%;width:100%;top:0;left:0"></div>
</body>
<script type="text/javascript">
	
	//跳转到个人博客
	function boke(){
		location.href = "http://z77z.oschina.io/";
	}

	function login() {
		var username = $("#username").val();
		var password = $("#password").val();
		var vcode = $("#vcode").val();
		var rememberMe =$('#rememberMe').is(':checked');
		$.ajax({
			type : "POST",
			data : {
				"username" : username,
				"password" : password,
				"vcode" : vcode,
				"rememberMe" : rememberMe
			},
			dataType : "json",
			url : "<%=contextPath%>/ajaxLogin",
			success : function(result) {
				
				if (result.status != 200) {
					swal("哦豁",result.message,"error");
				} else {
					swal({title:"太帅了",text:"登录成功，进入系统！",type:"success"}, 
						function () {
						location.href = "/index";
				    });
				}
			}
		});
	}
</script>
</html>