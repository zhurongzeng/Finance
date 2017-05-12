<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的项目</title>
<script type="text/javascript"
	src="js/jquery-easyui-1.4.2/jquery.min.js"></script>
<script type="text/javascript"
	src="js/jquery-easyui-1.4.2/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="js/jquery-easyui-1.4.2/locale/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet"
	href="js/jquery-easyui-1.4.2/themes/default/easyui.css" />
<link rel="stylesheet" href="js/jquery-easyui-1.4.2/themes/icon.css">
<link rel="stylesheet" href="css/index.css">
<script type="text/javascript">
	$(function() {
		$("#center_tabs").tabs({
			//绑定选项卡鼠标右击事件
			onContextMenu : function(e, title, index) {
				//阻止默认的右键单击行为
				e.preventDefault();
				//选中选项卡
				$('#center_tabs').tabs('select', index);
				//显示菜单
				$('#menu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			}
		});
		closeTabs();
	})

	//新增选项卡
	function addTabs(tabName, href) {
		if ($('#center_tabs').tabs('exists', tabName)) {//如果已打开，则跳转到此选项卡
			$('#center_tabs').tabs('select', tabName);
		} else {//如果没有打开，则创建新选项卡
			if (href) {
				//注：使用iframe即可防止同一个页面出现js和css冲突的问题  
				var content = '<iframe scrolling="yes" frameborder="0"  src="'
						+ href + '" style="width:100%;height:100%;"></iframe>';
			} else {
				var content = '未实现';
			}
			$('#center_tabs').tabs('add', {
				title : tabName,
				content : content,
				closable : true
			});
		}
	}

	//关闭选项卡
	function closeTabs() {
		//全部关闭
		$('#menu-closeall').click(function() {
			var tablist = $('#center_tabs').tabs('tabs');
			for (var i = tablist.length - 1; i >= 1; i--) {
				$('#center_tabs').tabs('close', i);
			}
		});

		//关闭其他
		$('#menu-closeother').click(function() {
			var tablist = $('#center_tabs').tabs('tabs');
			var curtab = $('#center_tabs').tabs('getSelected');
			var index = $('#center_tabs').tabs('getTabIndex', curtab);
			for (var i = tablist.length - 1; i >= 1; i--) {
				if (i != index) {
					$('#center_tabs').tabs('close', i);
				}
			}
			$("#center_tabs").tabs("select", 1);
		});
	}
</script>
</head>
<body class="easyui-layout">
	<!-- 头部开始 -->
	<div id="main-head-div" data-options="region:'north',split:false"
		style="height: 60px;">
		<div id="head-div">
			<ul>
				<li id="head-li-left">当前用户：<%=(String) session.getAttribute("username")%></li>
			</ul>
		</div>
	</div>
	<!-- 头部结束 -->

	<!-- 左侧开始 -->
	<div data-options="region:'west',title:'菜单',split:true"
		style="width: 200px;">
		<div id="left_div1" class="easyui-accordion"
			style="height: 100%; text-align: center;">
			<div title="日常开支管理" data-options="iconCls:'',selected:true"
				style="overflow: auto; padding: 10px; text-align: center;">
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('Title1Content1','${pageContext.request.contextPath}/user/view/index');">content1</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('Title1Content2','${pageContext.request.contextPath}/dept/view/index');">content2</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('Title1Content3','${pageContext.request.contextPath}/user/view/index');">content3</a>
				</div>
			</div>
			<div title="统计报表" data-options="iconCls:''"
				style="overflow: auto; padding: 10px; text-align: center;">
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('视频播放','${pageContext.request.contextPath}/media/view/video');">视频播放</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('音乐播放','${pageContext.request.contextPath}/media/view/music');">音乐播放</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('Title2Content3','${pageContext.request.contextPath}/user/view/index');">content3</a>
				</div>
			</div>
			<div title="基础数据管理" data-options="iconCls:''"
				style="overflow: auto; padding: 10px; text-align: center;">
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('人员管理','${pageContext.request.contextPath}/user/view/index');">人员管理</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('帐号管理','${pageContext.request.contextPath}/userInfo/view/index');">帐号管理</a>
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0);"
						onclick="addTabs('消费类型管理','${pageContext.request.contextPath}/dept/view/index');">消费类型管理</a>
				</div>
			</div>
		</div>
	</div>
	<!-- 左侧结束 -->

	<!-- 中间开始 -->
	<div data-options="region:'center',title:''" style="padding: 0px;">
		<div id="center_tabs" class="easyui-tabs"
			data-options="border:false,fit:true">
			<div title="首页" id="center-div">
				<div id="center-bottom-div">
					<div id="center-bottom-left">
						<h2>欢迎</h2>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 中间结束 -->

	<!-- 尾部开始 -->
	<div data-options="region:'south',split:false">
		<div id="footer_div">
			<div class="foot-li">
				<a href="#">注销</a>
			</div>
			<div class="foot-li">
				<a href="#">修改密码</a>
			</div>
		</div>
	</div>
	<!-- 尾部结束 -->

	<!-- 右键菜单开始 -->
	<div id="menu" class="easyui-menu" style="width: 150px;">
		<div id="menu-closeother">关闭其他</div>
		<div id="menu-closeall">全部关闭</div>
	</div>
	<!-- 右键菜单结束 -->
</body>
</html>