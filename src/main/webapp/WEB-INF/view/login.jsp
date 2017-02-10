<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
            错误信息：<h4>${msg}</h4>
       <form action="/submitLogin" method="post">
           <p>账号：<input type="text" name="username" value="admin"/></p>
           <p>密码：<input type="text" name="password" value="123456"/></p>
           <p><input type="submit" value="登录"/></p>
       </form>
</body>
</html>