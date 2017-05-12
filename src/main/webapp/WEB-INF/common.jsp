<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.5/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.5/jquery.easyui.min.js"></script>
<link rel="stylesheet" href="<%=path%>/js/jquery-easyui-1.4.5/themes/metro/easyui.css" />
<link rel="stylesheet" href="<%=path%>/js/jquery-easyui-1.4.5/themes/icon.css">
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.5/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=path%>/js/system/extend.js"></script>
<script type="text/javascript" src="<%=path%>/js/system/util.js"></script>
<script type="text/javascript" src="<%=path%>/js/system/index.js"></script>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/style.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/index.css" />
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />