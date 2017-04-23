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
<link href="<%=contextPath%>/static/lib/bootstrap-Switch/bootstrapSwitch.css"
	rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>编辑用户信息</h5>
				<div class="ibox-tools">
					<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a>
				</div>
			</div>
			<div class="ibox-content">
				<form action="/user/edit" class="form-horizontal" method="post">
					<input hidden="true" id="id" name="id" type="text"
						value="${user.id}" />
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="LoginName">用户名称</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" id="nickname" name="nickname"
								placeholder="用户名称" type="text" value="${user.nickname}"
								data-val="true" data-val-maxlength="角色名称长度不能超过20个字符"
								data-val-maxlength-max="20" data-val-required="角色名称不能为空" /> <span
								data-valmsg-for="nickname" data-valmsg-replace="true"
								class="field-validation-valid"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="RealName">邮箱</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-maxlength="邮箱长度不能超过36个字符" data-val-maxlength-max="36"
								data-val-minlength="邮箱长度不能少于5个字符" data-val-minlength-min="5"
								data-val-regex="请输入正确的邮箱地址"
								data-val-regex-pattern="^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$"
								data-val-required="邮箱不能为空" id="email" name="email"
								placeholder="邮箱" type="text" value="${user.email}" /> <span
								class="field-validation-valid" data-valmsg-for="email"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="RealName">是否有效</label>：</label>
						<div class="col-sm-8">
							<div class="switch switch-mini" checked="true" data-on-label="有效" data-off-label="无效" >
							    <input type="checkbox" name="isEffective" id="isEffective"/>
							</div> 
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
	<script src="<%=contextPath%>/static/lib/bootstrap-Switch/bootstrapSwitch.js"></script>
	<script type="text/javascript">
	//返回
	$("#back").bind("click",function() {
		window.location.href="/user/userPage";
	});
	//初始化是否有效开关
	
	</script>
</body>
</html>

