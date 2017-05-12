<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../common.jsp" flush="true" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/consumeType/script.js"></script>
</head>
<body class="easyui-layout">
	<div class="easyui-panel" data-options="region:'center'" style="height: 100%;">
		<div class="easyui-layout" data-options="fit: true">
			<div class="easyui-panel" data-options="region:'west',title:'消费类别',split:true" style="width: 200px">
				<%@include file="view/tree.jsp"%>
			</div>
			<div class="easyui-panel" data-options="region:'center',split:true">
				<div class="easyui-layout" data-options="fit: true">
					<div class="easyui-panel" data-options="region:'north',title:'查询',split:true" style="height: 76px">
						<%@include file="view/query.jsp"%>
					</div>
					<div class="easyui-panel" data-options="region:'center',title:'列表',split:true" style="height: 100%;">
						<%@include file="view/list.jsp"%>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="win"></div>
	<div id="subWin"></div>
</body>
</html>