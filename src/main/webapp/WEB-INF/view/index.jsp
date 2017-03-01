<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="<%=basePath%>/static/js/jquery-1.11.3.js"></script>
<title>Insert title here</title>
</head>
<body>
	helloJsp
	<hr>${user}
	<input type="button" id="logout" value="退出登录" />
	<input type="button" id="updatePermission" value="更新链接权限" />
	<input type="button" id="add" value="访问权限页面" />
</body>
<script type="text/javascript">
	$("#logout").click(function(){
		location.href="/logout";
	});
	$("#updatePermission").click(function(){
		$.post("/updatePermission", {}, function(result) {
			if (result == "true") {
				alert("权限更新成功！！");
			}
		});
	});
	$("#add").click(function(){
		location.href="/add";
	});
</script>
</html>