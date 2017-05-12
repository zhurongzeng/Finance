<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>系统登录</title>
<link rel="stylesheet" href="css/login.css" />
<script type="text/javascript"
	src="js/jquery-easyui-1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="js/system/script.js"></script>
<script type="text/javascript">
	$(function() {
		$(".screenbg ul li").each(function() {
			$(this).css("opacity", "0");
		});
		$(".screenbg ul li:first").css("opacity", "1");
		var index = 0;
		var t;
		var li = $(".screenbg ul li");
		var number = li.size();
		function change(index) {
			li.css("visibility", "visible");
			li.eq(index).siblings().animate({
				opacity : 0
			}, 3000);
			li.eq(index).animate({
				opacity : 1
			}, 3000);
		}
		function show() {
			index = index + 1;
			if (index <= number - 1) {
				change(index);
			} else {
				index = 0;
				change(index);
			}
		}
		t = setInterval(show, 8000);
		//根据窗口宽度生成图片宽度
		var width = $(window).width();
		$(".screenbg ul img").css("width", width + "px");
	});
</script>
</head>
<body>
	<div class="login-box">
		<h1>系统登录</h1>
		<form id="login_form" method="post">
			<div class="name">
				<label>用户名：</label> <input type="text" name="username" id="username"
					tabindex="1" autocomplete="off" />
			</div>
			<div class="password">
				<label>密 码：</label> <input type="password" name="password"
					maxlength="16" id="password" tabindex="2" />
			</div>
			<div class="code">
				<label>验证码：</label> <input type="text" name="code" maxlength="4"
					id="code" tabindex="3" />
				<div class="codeImg">
					<img src="images/captcha.jpeg.jpg" />
				</div>
			</div>
			<div class="remember" style="padding-left:80px;">
				<input type="checkbox" id="remember" tabindex="4" /> <label>记住密码</label>
				<font color="red"><label id="errmsg"
					style="width: 160px;margin-left: 20px;"></label></font>
			</div>
			<div class="login">
				<button type="button" tabindex="5" onclick="doLogin()">登录</button>
			</div>
		</form>
	</div>

	<div class="bottom">
		©2016 家庭财务管理系统
	</div>

	<div class="screenbg">
		<ul>
			<li style="opacity: 0; visibility: visible;"><a
				href="javascript:;"><img src="images/0.jpg"
					style="width: 1349px;" /></a></li>
			<li style="opacity: 1; visibility: visible;"><a
				href="javascript:;"><img src="images/1.jpg"
					style="width: 1349px;" /></a></li>
			<li style="opacity: 0; visibility: visible;"><a
				href="javascript:;"><img src="images/2.jpg"
					style="width: 1349px;" /></a></li>
		</ul>
	</div>
</body>
</html>