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
<script src="<%=contextPath%>/static/js/content/base.js"></script>
<script src="<%=contextPath%>/static/js/content/list.js"></script>
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
					<button id="btnAdd" type="button" class="btn btn-primary "
						onclick="addModel()">
						<i class="fa fa-plus"></i>&nbsp;添加
					</button>
					<button id="btnEdit" type="button" class="btn btn-info "
						onclick="editModel()">
						<i class="fa fa-pencil"></i> 编辑
					</button>
					<button id="btnDel" type="button" class="btn btn-danger "
						onclick="delData()">
						<i class="fa fa-remove"></i>&nbsp;&nbsp;<span class="bold">删除</span>
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
	<script>
		function addModel() {
			$("#btnAdd").button("loading");
			window.location.href = "/Role/Add";
		}

		function editModel() {//编辑
			var row = JucheapGrid.GetData();
			if (row != null) {
				$("#btnEdit").button("loading");
				window.location.href = "/Role/Edit/" + row.Id;
			} else {
				parent.layer.alert("请选择要编辑的数据");
			}
		}

		function delData() {//删除
			XPage.DelData("/Role/Delete");
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
				colNames : [ '会话Id', '用户名', '主机地址', '最后访问时间', '操作' ],
				colModel : [ {
					name : 'sessionId',
					index : 'sessionId',
					width : 100,
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
				}, {
					name : 'type',
					index : 'type',
					width : 100
				} ]
			};
			JucheapGrid.Load(config);
			$("#btnSearch").bind("click", searchData);
		});
		//时间戳格式化
		function formatDate(now) {
			now = new Date(now);
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
			return year + "-" + month + "-" + date + " " + hour + ":" + minute
					+ ":" + second;
		}
	</script>

</body>
</html>

