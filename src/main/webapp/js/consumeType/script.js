// =======相关访问路径声明=======start=========
var contextPath = "/" + window.location.pathname.split("/")[1];

var addWinPath = contextPath + '/consumeType/view/add';
var editWinPath = contextPath + '/consumeType/view/edit';
var viewWinPath = contextPath + '/consumeType/view/view';

var pagePath = contextPath + '/consumeType/service/page';
var addSavePath = contextPath + '/consumeType/service/add';
var editSavePath = contextPath + '/consumeType/service/update';
var removeSavePath = contextPath + '/consumeType/service/remove';
// =======相关访问路径声明=======end=========

/**
 * 新增
 */
function add() {
	$('#win').dialog({
		title : '新增',
		width : 550,
		height : 170,
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
 * 新增保存方法
 */
var addSave = function() {
	$("#addSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	var node = $("#consume_type_tree").tree("getSelected");
	if(node == null){
		$.messager.alert("提示","请选择分类！");
		return;
	}
	$('#consume_type_add_form').form('submit', {
		url : addSavePath+"?parentId="+node.id,
		onSubmit : function() {
			var isValid = $(this).form('validate');
			if (!isValid) {
				$("#addSaveBtn").linkbutton('enable');// 表单验证不通过，启用按钮
			}
			return isValid; // 返回false终止表单提交
		},
		success : function(data) {
			if (data) {
				$("#consume_type_tree").tree("reload");
				$("#consume_type_tree").tree("expandTo",node.target);
				$('#consume_type_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$("#addSaveBtn").linkbutton("enable");
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 编辑
 */
function edit(index) {
	$('#consume_type_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#consume_type_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '编辑',
		width : 550,
		height : 170,
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
 * 编辑保存方法
 */
var editSave = function() {
	$("#editSaveBtn").linkbutton('disable');// 禁用保存按钮，避免重复提交
	$('#consume_type_edit_form').form('submit', {
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
				$("#consume_type_tree").tree("reload");
				$('#consume_type_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功');
			} else {
				$("#editSaveBtn").linkbutton('enable');
				$.messager.alert('提示', '操作失败');
			}
		}
	});
}

/**
 * 删除
 */
function del() {
	var selections = $('#consume_type_datagrid').datagrid('getSelections');
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
				type : "POST", 
			    dataType:"json",
			    contentType:'application/json;charset=UTF-8',
				data : JSON.stringify(ids),
				success : function(data) {
					if (data) {
						$.messager.alert("提示", "删除成功");
						$("#consume_type_tree").tree("reload");
						$('#consume_type_datagrid').datagrid('reload');
					} else {
						$.messager.alert("提示", "删除失败");
						$('#consume_type_datagrid').datagrid('reload');
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
	$('#consume_type_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#consume_type_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '查看',
		modal : true,
		width : 550,
		height : 190,
		iconCls : 'icon-search',
		href : viewWinPath,
		onLoad : function() {
			$('span[name=name]').text(record.name);
			$('span[name=code]').text(record.code);
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
	var name = $("#name").val();
	var code = $("#code").val();
	var node = $("#consume_type_tree").tree("getSelected");
	var id;
	if(node != null){
		id = node.id;
	}else{
		id = "";
	}
	if ($('#consume_type_queryForm').form('validate')) {
		$('#consume_type_datagrid').datagrid('load', {
			id : id,
			name : name,
			code : code
		});
	}
}

/**
 * 重置查询条件
 */
function reset() {
	$('#consume_type_queryForm').form('reset');
}

function selectTree(node) {
	$('#consume_type_datagrid').datagrid('load', {
		id : node.id
	});
}

/**
 * 操作列格式化
 */
function operation(value, row, index) {
	var btn1 = '<a class="editcls1" style="line-height:50px;" href="javascript:void(0);" onclick="view(' + index + ')">查看</a>';
	var btn2 = '<a class="editcls2" href="javascript:void(0);" onclick="edit(' + index + ')">编辑</a>';
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