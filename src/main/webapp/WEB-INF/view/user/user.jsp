<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<% String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath(); %>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>z77z后台管理系统 - 内容页</title>
<link href="<%=contextPath%>/static/css/content-base.css" rel="stylesheet" />
<link href="<%=contextPath%>/static/css/jqgrid/ui.jqgrid.css" rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>用户管理</h5>
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



	<script src="<%=contextPath%>/static/js/content/base.js"></script>


	<script src="<%=contextPath%>/static/js/content/list.js"></script>

	<script>
		function addModel() {
			$("#btnAdd").button("loading");
			window.location.href = "/user/editPage/add";
		}

		function editModel() {//编辑
			var row = JucheapGrid.GetData();
			if (row != null) {
				$("#btnEdit").button("loading");
				window.location.href = "/user/editPage/" + row.id;
			} else {
				parent.layer.alert("请选择要编辑的数据");
			}
		}

		function delData() {//删除
			XPage.DelData("/user/delete");
		}

		function searchData() {//搜索
			var json = {
				keywords : $("#txtSearchKey").val()
			};
			XPage.Search(json);
		}
		$(document).ready(function() {
			var config = {
				title : '用户列表',
				url : '/user/getUserListWithPager',
				colNames : [ '主键', '用户名称', '邮箱', '创建时间', '是否有效'],
				colModel : [ {
					name : 'id',
					index : 'id',
					width : 100,
					key : true,
					hidden : true
				}, {
					name : 'nickname',
					index : 'nickname',
					width : 100,
				}, {
					name : 'email',
					index : 'email',
					width : 100,
				}, {
					name : 'createTime',
					index : 'createTime',
					formatter : formatDate,
					width : 100,
				}, {
					name : 'status',
					index : 'status',
					formatter : formatStatus,
					width : 100,
				} ]
			};
			JucheapGrid.Load(config);
			$("#btnSearch").bind("click", searchData);
		});
		
		if('${edit}'=='false'){
			parent.layer.msg('保存失败，请重试！', { icon: 5, anim:6 ,offset: 't'});  
		}
		if('${edit}'=='true'){
			parent.layer.msg('保存成功！', { icon: 6, anim:6 ,offset: 't'});  
		}
	</script>
</body>
</html>

