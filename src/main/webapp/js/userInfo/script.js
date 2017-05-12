//=======对象引用声明=======start=========
var queryForm;
var grid;
var gridToolbar;
var addDialog;
var editDialog;
var viewDialog;
// =======对象引用声明=======end=========

// =======相关访问路径声明=======start=========
var contextPath = "/" + window.location.pathname.split("/")[1];

var addWinPath = contextPath + '/userInfo/view/add';
var editWinPath = contextPath + '/userInfo/view/edit';
var viewWinPath = contextPath + '/userInfo/view/view';

var pagePath = contextPath + '/userInfo/service/page';
var addSavePath = contextPath + '/userInfo/service/add';
var editSavePath = contextPath + '/userInfo/service/update';
var removeSavePath = contextPath + '/userInfo/service/remove';

// =======相关访问路径声明=======end=========

/**
 * 初始化选择对象
 */
$(function() {
	grid = $('#userInfo_datagrid');
	gridToolbar = $('#userInfo_gridToolbar');
	queryForm = $('#userInfo_queryForm');
});

/**
 * 新增帐号
 */
function add() {
	addDialog = $('<div/>').dialog({
		title : '新增',
		width : 600,
		height : 300,
		modal : true,
		href : addWinPath,
		buttons : [ {
			text : '保存',
			id : 'addSaveBtn',
			handler : addSave
		}, {
			text : '关闭',
			handler : function() {
				addDialog.dialog("close");
			}
		} ],
		onClose : function() {
			$(this).dialog('destroy');
		}
	});
}

/**
 * 新增帐号保存方法
 */
var addSave = function() {
	$("#addSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	$('#userInfo_add_form').form('submit', {
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
				grid.datagrid('reload');
				addDialog.dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 编辑帐号
 * 
 * @param record
 */
function edit(index) {
	grid.datagrid('selectRow', index);// 关键在这里
	var record = grid.datagrid('getSelected');
	editDialog = $('<div/>').dialog({
		title : '编辑',
		width : 600,
		height : 300,
		modal : true,
		href : editWinPath,
		onLoad : function() {
			editDialog.find('form').form('load', record);
		},
		buttons : [ {
			text : '保存',
			id : 'editSaveBtn',
			handler : editSave
		}, {
			text : '关闭',
			handler : function() {
				editDialog.dialog("close");
			}
		} ],
		onClose : function() {
			$(this).dialog('destroy');
		}
	});
}

/**
 * 编辑帐号保存方法
 */
var editSave = function() {
	$("#editSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	$('#userInfo_edit_form').form('submit', {
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
				grid.datagrid('reload');
				editDialog.dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 删除帐号
 */
function del() {
	var selections = grid.datagrid('getSelections');
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
				data : 'ids=' + ids,
				method : 'post',
				dataType : 'json',
				success : function(data) {
					if (data) {
						$.messager.alert("提示", "删除成功");
						grid.datagrid('reload');
					} else {
						$.messager.alert("提示", "删除失败");
						grid.datagrid('reload');
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
	grid.datagrid('selectRow', index);// 关键在这里
	var record = grid.datagrid('getSelected');
	viewDialog = $('<div/>').dialog({
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
				viewDialog.dialog('close');
			}
		} ],
		onClose : function() {
			$(this).dialog('destroy');
		}
	});
}

/**
 * 条件查询
 */
function query() {
	var username = queryForm.find("#username").val();
	var status = queryForm.find("#status").combobox("getValue");
	if (queryForm.form('validate')) {
		grid.datagrid('load', {
			username : username,
			status : status
		});
	}
}

/**
 * 重置查询条件
 */
function reset() {
	queryForm.form('reset');
}

/**
 * 格式化帐号状态
 */
function formatStatus(value, row, index) {
	if (value == null || value == '' || value == undefined) {
		return "";
	}
	if (value == 0) {
		return "已注销";
	} else if (value == 1) {
		return "使用中";
	} else {
		return "已锁定";
	}
}

/**
 * 操作列格式化
 */
function formatAction(value, row, index) {
	var btn1 = '<a class="editcls1" href="javascript:void(0);" onclick="view('
			+ index + ')">查看</a>';
	var btn2 = '<a class="editcls2" href="javascript:void(0);" onclick="edit('
			+ index + ')">编辑</a>';
	return btn1 + btn2;
}

/**
 * datagrid加载完成之后执行的操作
 */
function loadSuccess(data) {
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