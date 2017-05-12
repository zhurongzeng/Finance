<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>财务管理</title>
<jsp:include page="common.jsp" flush="true" />
</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
	<noscript>
		<div style="position: absolute; z-index: 100000; height: 2046px; top: 0px; left: 0px; width: 100%; background: white; text-align: center;">
			<img src="images/noscript.gif" alt='抱歉，请开启脚本支持！' />
		</div>
	</noscript>
	
	<!-- 头部 -->
	<div data-options="region:'north',split:false,border:false" class="head">
		<div class="head-logo">
			<span> 
				<img src="images/blocks.gif"  height="20" />  我的帐本
			</span> 
		</div>
		<div class="head-div">
			<span>欢迎Zachary
				<a href="#" id="editpass" onclick="changePas();">修改密码</a> <a href="#" id="loginOut">安全退出</a>
			</span><br/>
			<span> 
				<label id="time"></label>
			</span>
		</div>
	</div>

	<!-- 左侧菜单 -->
	<div id="west" data-options="iconCls:'icon-house',region:'west',split:true,title:'导航菜单'" style="width: 180px;">
		<div class="easyui-accordion" fit="true" border="false">
			<!--  导航内容 -->
		</div>
	</div>
	
	<!-- 中间内容区域 -->
	<div id="mainPanel" data-options="region:'center'" style="background: #eee; overflow-y: hidden">
		<div id="tabs" class="easyui-tabs" fit="true" border="false">
			<div title="首页" style="padding: 20px; overflow: hidden;" id="home">
				<h1>Welcome to jQuery UI!</h1>
			</div>
		</div>
	</div>
	
	<!-- 尾部 -->
	<div data-options="region:'south',split:false,border:false" class="footer">
		<div>By Zachary:798083517@qq.com</div>
	</div>
	
	<div id="win"></div> 
	
	<!-- 菜单项 -->
	<div id="mm" class="easyui-menu" style="width: 150px;">
		<div id="mm-tabclose">关闭</div>
		<div id="mm-tabcloseall">全部关闭</div>
		<div id="mm-tabcloseother">关闭其他</div>
		<div class="menu-sep"></div>
		<div id="mm-tabcloseright">关闭右侧</div>
		<div id="mm-tabcloseleft">关闭左侧</div>
		<div class="menu-sep"></div>
		<div id="mm-exit">退出</div>
	</div>
</body>
</html>