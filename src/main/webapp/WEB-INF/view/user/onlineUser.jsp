<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%
	String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>z77z后台管理系统 - 内容页</title>
<link href="<%=contextPath%>/static/css/content-base.css"
	rel="stylesheet" />
<link href="<%=contextPath%>/static/css/jqgrid/ui.jqgrid.css"
	rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>在线用户管理</h5>
				<div class="ibox-tools">
					<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a>
				</div>
			</div>
			<div class="ibox-content">
				<div class="form-group">
					<button id="btnDel" type="button" class="btn btn-danger "
						onclick="delData()">
						<i class="fa fa-remove"></i>&nbsp;&nbsp;<span class="bold">强制踢出</span>
					</button>
				</div>

				<div class="form-group">
					<div class="input-group">
						<input id="txtSearchKey" type="text" class="input form-control"
							placeholder="搜索关键字" /> <span class="input-group-btn">
							<button id="btnSearch" class="btn btn btn-primary" type="button">
								<i class="fa fa-search"></i> 搜索
							</button>
						</span>
					</div>
				</div>

				<div class="jqGrid_wrapper">
					<table id="table_list"></table>
					<div id="pager_list"></div>
				</div>
			</div>
		</div>
	</div>
	<script src="<%=contextPath%>/static/js/content/base.js"></script>
	<script src="<%=contextPath%>/static/js/content/list.js"></script>
	<script>
		function delData() {//强制踢出
			XPage.DelData("/user/kickout");
		}

		function searchData() {//搜索
			var json = {
				keywords : $("#txtSearchKey").val()
			};
			XPage.Search(json);
		}
		$(document).ready(function() {
			var config = {
				title : '在线用户列表',
				url : '/user/onlineUsers',
				colNames : [ '会话Id', '用户名', '主机地址', '最后访问时间' ],
				colModel : [{
					name : 'sessionId',
					index : 'sessionId',
					width : 100,
					key : true//是否是主建，如果为true，就会按这个字段删除
				}, {
					name : 'nickname',
					index : 'nickname',
					width : 80
				}, {
					name : 'host',
					index : 'host',
					width : 80
				}, {
					name : 'lastLoginTime',
					index : 'lastLoginTime',
					width : 80,
					formatter : formatDate,
				} ]
			};
			JucheapGrid.Load(config);
			$("#btnSearch").bind("click", searchData);
		});
	</script>

</body>
</html>

