<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Redis监控</title>
<link href="<%=contextPath%>/static/css/content-base.css"
	rel="stylesheet" />
</head>
<body class="gray-bg">
	<div class="wrapper wrapper-content">
		<div class="row">
			<div class="col-sm-6">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>Redis 内存实时占用情况：</h5>
					</div>
					<div class="ibox-content">
						<div id="container"></div>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>Redis key的实时数量：</h5>
					</div>
					<div class="ibox-content">
						<div id="keysChart"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-5">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>Redis INFO：</h5>
					</div>
					<div class="ibox-content">
						<table class="table table-condensed table-hover"
							style="word-break: break-all; word-wrap: break-all;">
							<tbody>
								<c:forEach var="info" items="${infoList}">
									<tr>
										<td title="${info.key}:${info.desctiption }">${info.key}</td>
										<td>${info.desctiption }</td>
										<td>${info.value}</td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="col-sm-7">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h5>Redis实时日志(共${logLen}条)：</h5>
						<div class="ibox-tools">
							<button type="button" onclick="empty();"
								class="btn btn-warning btn-xs">清空日志</button>
						</div>
					</div>
					<div class="ibox-content">
						<table class="table table-condensed table-hover">
							<tbody>
								<c:forEach var="log" items="${logList }">
									<tr>
										<td>${log.id }</td>
										<td>${log.executeTime }</td>
										<td>${log.usedTime }</td>
										<td><p style="width: 600px; word-wrap: break-word; word-break: normal;">${log.args }</p></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
<script src="<%=contextPath%>/static/js/jquery.js"></script>
<script src="<%=contextPath%>/static/js/redischarts/highcharts.js"></script>
<script src="<%=contextPath%>/static/js/redischarts/index.js"></script>
</html>

