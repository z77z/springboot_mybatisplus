<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript"
	src="<%=basePath%>/static/js/jquery-1.11.3.js"></script>
<title>登录</title>
</head>
<body>
	错误信息：
	<h4 id="erro"></h4>
	<form>
		<p>
			账号：<input type="text" name="username" id="username" value="admin" />
		</p>
		<p>
			密码：<input type="text" name="password" id="password" value="123" />
		</p>
		<P><input type="checkbox" name="rememberMe"  id="rememberMe" />记住我</P>
		<p>
			<input type="button" id="ajaxLogin" value="登录" />
		</p>
	</form>
</body>
<script>
$(function(){
	$("#ajaxLogin").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		var rememberMe =$('#rememberMe').is(':checked');
		$.post("/ajaxLogin", {
			"username" : username,
			"password" : password,
			"rememberMe" : rememberMe
		}, function(result) {
			if (result.status == 200) {
				location.href = "/index";
			} else {
				$("#erro").html(result.message);
			}
		});
	});
});
</script>
</html>