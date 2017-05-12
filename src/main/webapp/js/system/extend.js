$.extend($.fn.validatebox.defaults.rules, {
	// 最小长度
	minLength : {
		validator : function(value, param) {
			return value.length >= param[0];
		},
		message : '请最少输入{0}个字符.'
	},
	// 最大长度
	maxLength : {
		validator : function(value, param) {
			return value.length <= param[0];
		},
		message : '请最多输入{0}个字符.'
	},
	// 验证密码和重新输入密码一致
	equals : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '两次密码输入不一致.'
	}
});

$.extend($.fn.tree.methods, {
	getLevel : function(jq, target) {
		var l = $(target).parentsUntil("ul.tree", "ul");
		return l.length + 1;
	}
});
