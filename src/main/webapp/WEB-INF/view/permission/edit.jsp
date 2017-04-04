<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>編輯</title>
<link href="<%=contextPath%>/static/css/content-base.css"
	rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>编辑权限信息</h5>
				<div class="ibox-tools">
					<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a>
				</div>
			</div>
			<div class="ibox-content">
				<form action="/permission/edit" class="form-horizontal" method="post">
					<input hidden="true" id="id" name="id" type="text"
						value="${permission.id}" />
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="LoginName">url地址</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" id="url" name="url"
								placeholder="url地址" type="text" value="${permission.url}"
								data-val="true" data-val-maxlength="url地址长度不能超过50个字符"
								data-val-maxlength-max="50" data-val-required="url地址不能为空" /> <span
								data-valmsg-for="url" data-valmsg-replace="true"
								class="field-validation-valid"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="RealName">url描述</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" id="name" name="name"
								placeholder="url描述" type="text" value="${permission.name}"
								data-val="true" data-val-maxlength="url描述长度不能超过20个字符"
								data-val-maxlength-max="20" data-val-required="url描述不能为空" /> <span
								data-valmsg-for="name" data-valmsg-replace="true"
								class="field-validation-valid"></span>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-3 col-sm-8">
							<button class="btn btn-info" type="submit" id="btnSave">保存</button>
							<button class="btn btn-white" type="button" id="back"
								data-type="url">返回</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<script src="<%=contextPath%>/static/js/content/base.js"></script>
	<script src="<%=contextPath%>/static/js/content/action.js"></script>
	<script src="<%=contextPath%>/static/js/content/jqueryValidator.js"></script>
	<script type="text/javascript">
	$("#back").bind("click", function() {
		window.location.href="/permission/permissionPage";
	});
	</script>
</body>
</html>

