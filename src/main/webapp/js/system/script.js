var contextPath = "/" + window.location.pathname.split("/")[1];
function doLogin() {
	var username = $("#username").val();
	var password = $("#password").val();
	var code = $("#code").val();
	var remember = $("#remember").checked;
	if (username == null || username == '') {
		$("#errmsg").text("请填写用户名！");
		return;
	}
	if (password == null || password == '') {
		$("#errmsg").text("请填写密码！");
		return;
	}
	// if (code == null || code == '') {
	// $("#errmsg").text("请填写验证码！");
	// return;
	// }
	$.ajax({
		url : contextPath + '/login',
		data : {
			username : username,
			password : password,
			code : code,
			remember : remember
		},
		method : 'post',
		dataType : 'json',
		success : function(data) {
			if (data.flag == false) {
				$("#errmsg").text(data.msg);
			}else{
				top.location=contextPath + '/index';
			}
		}
	});
}