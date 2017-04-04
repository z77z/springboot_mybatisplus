<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<% String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath(); %>
 <head>
  <title>z77z后台管理|首页</title>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <link href="<%=contextPath%>/static/assets/css/dpl-min.css" rel="stylesheet" type="text/css" />
   <link href="<%=contextPath%>/static/assets/css/bui-min.css" rel="stylesheet" type="text/css" />
   <link href="<%=contextPath%>/static/assets/css/main.css" rel="stylesheet" type="text/css" />
 </head>
 <body>
	<div class="header">
		<div class="dl-title">
			<a href="http://z77z.oschina.io/" title="个人博客地址" target="_blank">
				<span class="lp-title-port">z77z</span><span class="dl-title-text">后台管理系统</span>
			</a>
		</div>
		<div class="dl-log">
			欢迎您，<span class="dl-log-user">王二</span> <span class="admin">（管理员）</span>
			<a href="logout" title="退出系统" class="dl-log-quit">[退出]</a>
		</div>
	</div>
	<div class="content">
		<div class="dl-main-nav">
			<ul id="J_Nav" class="nav-list ks-clear">
				<li class="nav-item dl-selected"><div
						class="nav-item-inner nav-storage">首页</div></li>
			</ul>
		</div>
		<ul id="J_NavContent" class="dl-tab-conten">
		</ul>
	</div>
	
  <script type="text/javascript" src="<%=contextPath%>/static/assets/js/jquery-1.8.1.min.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/static/lib/layer/1.9.3/layer.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/static/assets/js/bui-min.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/static/assets/js/config-min.js"></script>
  <script type="text/javascript" src="<%=contextPath%>/static/js/barrage.js"></script>
  <script>	
	//学生登录
	BUI.use('common/main',function(){
      var config = [{
          id:'system',
          menu:[{
              text:'系统管理',
              items:[
                {id:'yhgl',text:'用户管理',href:'/user/userPage'},
                {id:'qxgl',text:'权限管理',href:'/permission/permissionPage' },
				{id:'jsgl',text:'角色管理',href:'/role/rolePage' },
				{id:'csqxgl',text:'初始权限管理',href:'/permissionInit/permissionInitPage'},
				{id:'zxyhgl',text:'在线用户管理',href:'/user/onlineUserPage'},
				{id:'qxcsym',text:'权限测试页面',href:'/add'},
				{id:'rjk',text:'Redis监控',href:'/redis/redisMonitor'},
				{id:'djk',text:'Druid监控',href:'/druid'}
              ]
          	 }]
            }];
      new PageUtil.MainPage({
        modulesConfig : config
      });
    });
  </script>
 </body>
</html>