<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="<%=basePath%>/static/js/jquery-1.11.3.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/static/js/t_io/bytebuffer-min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/static/js/t_io/protobuf-min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/static/js/t_io/talen.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/t_io/im.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/static/js/t_io/action.js"></script>

<title>Insert title here</title>
</head>
<body>
	<!--<input type='hidden' name='' id='server' value='t-io.org'/> 127.0.0.1 -->
	<input type='hidden' name='' id='server' value='t-io.org' />
	<input type='hidden' name='' id='port' value='9321'
		style='width: 50px;' />
	<input type='hidden' name='' id='group' value='g' style='' />
	<input type='hidden' name='' id='count' value='1' style='' />
	<!-- <input type='button' value='连接并进入群组' onclick='connectionBtnClicked();'> -->


	<input type="button" onclick="send();" value="发送消息" />
</body>
<script type="text/javascript">
	//创建一个Socket实例
	var socket = new WebSocket('ws://localhost:5678');

	// 打开Socket 
	socket.onopen = function(event) {

		// 发送一个初始化消息
		socket.send('I am the client and I\'m listening!');

		// 监听消息
		socket.onmessage = function(event) {
			console.log('Client received a message', event);
		};

		// 监听Socket的关闭
		socket.onclose = function(event) {
			console.log('Client notified socket has closed', event);
		};

		// 关闭Socket.... 
		//socket.close() 
	};

	$("#updatePermission").click(function() {
		socket.send("123")
	});
	function name() {
		
	}
</script>
</html>