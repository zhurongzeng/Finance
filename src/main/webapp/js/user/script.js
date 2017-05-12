// =======相关访问路径声明=======start=========
var contextPath = "/" + window.location.pathname.split("/")[1];

var addWinPath = contextPath + '/user/view/add';
var editWinPath = contextPath + '/user/view/edit';
var viewWinPath = contextPath + '/user/view/view';

var pagePath = contextPath + '/user/service/page';
var addSavePath = contextPath + '/user/service/add';
var editSavePath = contextPath + '/user/service/update';
var removeSavePath = contextPath + '/user/service/remove';

// =======相关访问路径声明=======end=========

/**
 * 新增人员
 */
function add() {
	$('#win').dialog({
		title : '新增',
		width : 1000,
		height : 750,
		modal : true,
		href : addWinPath,
		buttons : [ {
			text : '保存',
			id : 'addSaveBtn',
			handler : addSave
		}, {
			text : '关闭',
			handler : function() {
				$('#win').dialog("close");
			}
		} ]
	});
}

/**
 * 新增人员保存方法
 */
var addSave = function() {
	$("#addSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	$('#user_add_form').form('submit', {
		url : addSavePath,
		onSubmit : function() {
			var isValid = $(this).form('validate');
			if (!isValid) {
				$("#addSaveBtn").linkbutton('enable');// 表单验证不通过，启用按钮
			}
			return isValid; // 返回false终止表单提交
		},
		success : function(data) {
			if (data) {
				$('#user_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 编辑人员
 * 
 * @param record
 */
function edit(index) {
	$('#user_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#user_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '编辑',
		width : 600,
		height : 250,
		modal : true,
		href : editWinPath,
		onLoad : function() {
			$('#win').find('form').form('load', record);
		},
		buttons : [ {
			text : '保存',
			id : 'editSaveBtn',
			handler : editSave
		}, {
			text : '关闭',
			handler : function() {
				$('#win').dialog("close");
			}
		} ]
	});
}

/**
 * 编辑人员保存方法
 */
var editSave = function() {
	$("#editSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	$('#user_edit_form').form('submit', {
		url : editSavePath,
		onSubmit : function() {
			var isValid = $(this).form('validate');
			if (!isValid) {
				$("#editSaveBtn").linkbutton('enable');// 表单验证不通过，启用按钮
			}
			return isValid; // 返回false终止表单提交
		},
		success : function(data) {
			if (data) {
				$('#user_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 删除人员
 */
function del() {
	var selections = $('#user_datagrid').datagrid('getSelections');
	if (selections.length == 0) {
		$.messager.alert('提示', '请至少选择一条记录进行操作!');
		return;
	}
	var ids = [];
	for (var i = 0; i < selections.length; i++) {
		ids.push(selections[i].id);
	}
	$.messager.confirm('提示', '确认要删除吗?', function(flag) {
		if (flag) {
			$.ajax({
				url : removeSavePath,
				data : 'id=' + ids[0],
				method : 'post',
				dataType : 'json',
				success : function(data) {
					if (data) {
						$.messager.alert("提示", "删除成功");
						$('#user_datagrid').datagrid('reload');
					} else {
						$.messager.alert("提示", "删除失败");
						$('#user_datagrid').datagrid('reload');
					}
				}
			});
		}
	});
}

/**
 * 明细事件
 */
function view(index) {
	$('#user_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#user_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '查看',
		modal : true,
		width : 600,
		height : 300,
		iconCls : 'icon-search',
		href : viewWinPath,
		onLoad : function() {
			$('span[name=id]').text(record.id);
			$('span[name=name]').text(record.name);
			$('span[name=sex]').text(formatSex(record.sex));
			$('span[name=age]').text(record.age);
			$('span[name=tel]').text(record.tel);
			$('span[name=dob]').text(formatDate(record.dob));
			$('span[name=address]').text(record.address);
			$('span[name=remark]').text(record.remark);
		},
		buttons : [ {
			text : '关闭',
			handler : function() {
				$('#win').dialog('close');
			}
		} ]
	});
}

/**
 * 条件查询
 */
function query() {
	var name = $('#user_queryForm').find("#name").val();
	if ($('#user_queryForm').form('validate')) {
		$('#user_datagrid').datagrid('load', {
			name : name
		});
	}
}

/**
 * 重置查询条件
 */
function reset() {
	$('#user_queryForm').form('reset');
}

/**
 * 根据生日计算年龄
 */
function calAge(date) {
	var birth = new Date(date);
	var today = new Date();
	var age = today.getFullYear() - birth.getFullYear();
	if (today.getMonth() > birth.getMonth()) {
		$("#age").numberbox('setValue', age);
	}
	if (today.getMonth() == birth.getMonth()) {
		if (today.getDate() >= birth.getDate()) {
			$("#age").numberbox('setValue', age);
		} else {
			$("#age").numberbox('setValue', age - 1);
		}
	}
	if (today.getMonth() < birth.getMonth()) {
		$("#age").numberbox('setValue', age - 1);
	}
}

/**
 * 格式化显示地址
 */
function tooltip(value, row, index) {
	if (value == undefined || value == null || value == '') {
		return "";
	}
	return '<span class="note" title="' + value + '">' + value + '</span>';
}

/**
 * 操作列格式化
 */
function operation(value, row, index) {
	var btn1 = '<a class="editcls1" style="line-height:50px;" href="javascript:void(0);" onclick="view('
			+ index + ')">查看</a>';
	var btn2 = '<a class="editcls2" href="javascript:void(0);" onclick="edit('
			+ index + ')">编辑</a>';
	return btn1 + btn2;
}

/**
 * datagrid加载完成之后执行的操作
 */
function loadSuccess(data) {
	// 渲染tooltip提示气泡
	$(".note").tooltip({
		position : 'bottom',
		trackMouse : true,
		onShow : function() {
			$(this).tooltip('tip').css({
				boxShadow : '1px 1px 3px #292929'
			});
		}
	});
	// 渲染操作列按钮为linkbutton
	$('.editcls1').linkbutton({
		text : '查看',
		plain : true,
		iconCls : 'icon-search'
	});

	$('.editcls2').linkbutton({
		text : '编辑',
		plain : true,
		iconCls : 'icon-edit'
	});
}

/**
 * 新增消费记录
 */
function addConsume() {
	$('#subWin').dialog({
		title : '新增',
		width : 1000,
		height : 750,
		modal : true,
		href : addWinPath,
		buttons : [ {
			text : '保存',
			id : 'addSaveBtn',
			handler : addSave
		}, {
			text : '关闭',
			handler : function() {
				$('#subWin').dialog("close");
			}
		} ]
	});
}

