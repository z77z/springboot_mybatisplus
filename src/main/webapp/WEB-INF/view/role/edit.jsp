<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath(); %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>編輯</title>
    <link href="<%=contextPath%>/static/css/content-base.css" rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>添加用户</h5>
				<div class="ibox-tools">
					<a class="collapse-link"> <i class="fa fa-chevron-up"></i>
					</a>
				</div>
			</div>
			<div class="ibox-content">
				<form action="/User/Add" class="form-horizontal" method="post">
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="LoginName">登录账号</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-maxlength="登录账号长度不能超过20个字符" data-val-maxlength-max="20"
								data-val-minlength="登录账号长度不能少于4个字符" data-val-minlength-min="4"
								data-val-regex="登录账号必须是字母、数字或者下划线的组合"
								data-val-regex-pattern="^[^_][a-zA-Z0-9_]*$"
								data-val-remote="登录账号已存在" data-val-remote-url="/User/IsExists"
								data-val-remote-additionalfields="*.LoginName"
								data-val-required="登录账号不能为空" id="LoginName" name="LoginName"
								placeholder="登录账号名" type="text" value="" /> <span
								class="field-validation-valid" data-valmsg-for="LoginName"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="RealName">真实姓名</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-maxlength="真实姓名长度不能超过20个字符" data-val-maxlength-max="20"
								data-val-minlength="真实姓名长度不能少于2个字符" data-val-minlength-min="2"
								data-val-required="真实姓名不能为空" id="RealName" name="RealName"
								placeholder="真实姓名" type="text" value="" /> <span
								class="field-validation-valid" data-valmsg-for="RealName"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label for="Email">邮箱</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-maxlength="邮箱长度不能超过36个字符" data-val-maxlength-max="36"
								data-val-minlength="邮箱长度不能少于5个字符" data-val-minlength-min="5"
								data-val-regex="请输入正确的邮箱地址"
								data-val-regex-pattern="^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$"
								data-val-required="邮箱不能为空" id="Email" name="Email"
								placeholder="邮箱" type="text" value="" /> <span
								class="field-validation-valid" data-valmsg-for="Email"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="Password">登录密码</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-maxlength="登录密码长度不能超过12个字符" data-val-maxlength-max="12"
								data-val-minlength="登录密码长度不能少于6个字符" data-val-minlength-min="6"
								data-val-required="登录密码不能为空" id="Password" name="Password"
								placeholder="登录密码" type="text" value="" /> <span
								class="field-validation-valid" data-valmsg-for="Password"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label"><label
							for="ConfirmPwd">确认密码</label>：</label>
						<div class="col-sm-8">
							<input class="form-control" data-val="true"
								data-val-equalto="两次输入不一致" data-val-equalto-other="*.Password"
								data-val-maxlength="确认密码长度不能超过12个字符" data-val-maxlength-max="12"
								data-val-minlength="确认密码长度不能少于6个字符" data-val-minlength-min="6"
								data-val-required="确认密码不能为空" id="ConfirmPwd" name="ConfirmPwd"
								placeholder="请再次输入登录密码" type="text" value="" /> <span
								class="field-validation-valid" data-valmsg-for="ConfirmPwd"
								data-valmsg-replace="true"></span>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-offset-3 col-sm-8">
							<button class="btn btn-info" type="submit" id="btnSave">保存</button>
							<button class="btn btn-white" type="button" id="btnBack"
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
</body>
</html>

