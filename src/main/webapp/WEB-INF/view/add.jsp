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
具有添加权限   

<input type="button" id="updatePermission" value="更新链接权限" />
</body>
<script type="text/javascript">
$("#updatePermission").click(function(){
	$.post("/updatePermission", {}, function(result) {
		if (result == "true") {
			alert("权限更新成功！！");
		}
	});
});
</script>
</html>