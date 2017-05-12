$(function() {
	initLeftMenu();
	tabClose();
	tabCloseEvent();
	showTime();
});
/**
 * 初始化左侧菜单栏
 */
var contextPath = "/" + window.location.pathname.split("/")[1];
function initLeftMenu() {
	$.ajax({
		url:contextPath + '/system/menu/service/menuList',
		type : "POST", 
		success : function(data) {
			if (data) {
				$(".easyui-accordion").accordion('panels');// 注意要加上这个，否则菜单显示不出来
				
				$.each(data, function(i, m) { 
					var menulist = "";
					menulist += '<ul>';
					$.each(m.children, function(j, n) {
						menulist += "<li><div><a target='" + n.code + "' href='" + n.url + "'>" 
								+ "<span class='" + n.icon + "'></span>" + n.title + "</a></div></li>";
					});
					menulist += '</ul>';
					$('.easyui-accordion').accordion('add', {
						title : m.title,
						content : menulist,
						iconCls : m.icon
					});
				});
				
				$('.easyui-accordion li a').click(function() {
					var menuid = $(this).attr("target");
					var tabTitle = $(this).text();
					var url = $(this).attr("href");
					addTab(menuid,tabTitle, url);
					$('.easyui-accordion li div').removeClass("selected");
					$(this).parent().addClass("selected");
				}).hover(function() {
					$(this).parent().addClass("hover");
				}, function() {
					$(this).parent().removeClass("hover");
				});
				
				$(".easyui-accordion").accordion();
			} 
		}
	});
}

/**
 * 创建标签页
 * 
 * @param subtitle
 * @param url
 */
function addTab(menuid, title, url) {
	if (!$('#tabs').tabs('exists', title)) {
		$('#tabs').tabs('add', {
			title : title,
			content : createFrame(menuid,url),
			closable : true,
			width : $('#mainPanel').width() - 10,
			height : $('#mainPanel').height() - 26
		});
	} else {
		$('#tabs').tabs('select', title);
	}
	tabClose();
}

/**
 * 创建Frame
 * 
 * @param url
 * @returns {String}
 */
function createFrame(menuid, url) {
	var s = '<iframe name="' + menuid + '" scrolling="auto" frameborder="0" src="' + url + '" style="width:100%;height:100%;"></iframe>';
	return s;
}

/**
 * 双击关闭选项卡
 */
function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children("span").text();
		$('#tabs').tabs('close', subtitle);
	})

	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		var subtitle = $(this).children("span").text();
		$('#mm').data("currtab", subtitle);
		return false;
	});
}

/**
 * 绑定右键菜单事件
 */
function tabCloseEvent() {
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != currtab_title)
				$('#tabs').tabs('close', t);
		});
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			msgShow('系统提示', '后边没有啦~~', 'error');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			msgShow('系统提示', '前边没有啦~~', 'error');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	})
}

/**
 * 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
 */
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function showTime() {
	var now = new Date();
	var year = now.getFullYear(); // getFullYear getYear
	var month = now.getMonth();
	var date = now.getDate();
	var day = now.getDay();
	var hour = now.getHours();
	var minu = now.getMinutes();
	var sec = now.getSeconds();
	var week;
	month = month + 1;
	if (month < 10)
		month = "0" + month;
	if (date < 10)
		date = "0" + date;
	if (hour < 10)
		hour = "0" + hour;
	if (minu < 10)
		minu = "0" + minu;
	if (sec < 10)
		sec = "0" + sec;
	var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	week = arr_week[day];
	var time = "";
	time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu
			+ ":" + sec + " " + week;
	$("#time").html(time);
	var timer = setTimeout("showTime()", 1000);
}

function changePas(){
	$('#win').window({    
	    width:600,    
	    height:400,    
	    modal:true,
	    href:'changePassword.html'
	});  
}