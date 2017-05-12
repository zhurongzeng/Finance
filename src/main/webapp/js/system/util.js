/**
 * 格式化日期(yyyy-MM-dd)
 */
function formatDate(date) {
	if (date == undefined || date == null || date == '') {
		return "";
	}
	var date = new Date(date);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return year + '-' + (month < 10 ? ('0' + month) : month) + '-'
			+ (day < 10 ? ('0' + day) : day);
}

/**
 * 格式化日期时间(yyyy-MM-dd HH:mm:ss)
 */
function formatDateTime(date) {
	if (date == undefined || date == null || date == '') {
		return "";
	}
	var date = new Date(date);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var day = date.getDate();
	return year
			+ '-'
			+ (month < 10 ? ('0' + month) : month)
			+ '-'
			+ (day < 10 ? ('0' + day) : day + ' '
					+ (hour < 10 ? ('0' + hour) : hour) + ':'
					+ (minute < 10 ? ('0' + minute) : minute) + ':'
					+ (second < 10 ? ('0' + second) : second));
}

/**
 * 性别格式化
 */
function formatSex(value) {
	if (value == undefined || value == null || value == '') {
		return "";
	}
	if (value == 0) {
		return '男';
	} else if (value == 1) {
		return '女';
	} else {
		return '其他';
	}
}
