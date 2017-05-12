// =======相关访问路径声明=======start=========
var contextPath = "/" + window.location.pathname.split("/")[1];

var addWinPath = contextPath + '/system/menu/view/add';
var editWinPath = contextPath + '/system/menu/view/edit';
var viewWinPath = contextPath + '/system/menu/view/view';

var pagePath = contextPath + '/system/menu/service/page';
var addSavePath = contextPath + '/system/menu/service/add';
var editSavePath = contextPath + '/system/menu/service/update';
var removeSavePath = contextPath + '/system/menu/service/remove';
var checkCodePath = contextPath + '/system/menu/service/checkCode';
// =======相关访问路径声明=======end=========

/**
 * 新增
 */
function add() {
	$('#win').dialog({
		title : '新增',
		width : 550,
		height : 270,
		modal : true,
		href : addWinPath,
		onLoad : function(){
			var node = $("#menu_tree").tree("getSelected");
			if(node == null){
				$("#type").combobox('setValue','menu');
				$("#parentId").val("");
				$("#url").validatebox({required: false});
				$("#url").val("");
				$("#url_label").hide();
				$("#url").hide();
			}else{
				if(node.id == null){
					$("#type").combobox('setValue','menu');
					$("#parentId").val("");
					$("#url").validatebox({required: false});
					$("#url").val("");
					$("#url_label").hide();
					$("#url").hide();
				}else{
					$("#type").combobox('setValue','item');
					$("#parentId").val(node.id);
				}
			}
		},
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
	var node = $("#menu_tree").tree("getSelected");
	var code = $("#code").val();
	if(checkCode(code)){
		$('#menu_add_form').form('submit', {
			url : addSavePath,
			onSubmit : function() {
				var isValid = $(this).form('validate');
				if (!isValid) {
					$("#addSaveBtn").linkbutton('enable');// 表单验证不通过，启用按钮
				}
				return isValid; // 返回false终止表单提交
			},
			success : function(data) {
				$("#addSaveBtn").linkbutton("enable");
				if (data) {
					data = JSON.parse(data);
					if (data.type == 'menu') {
						$("#menu_tree").tree("reload");
					}
					$('#menu_datagrid').datagrid('reload');
					$('#win').dialog('close');
					$.messager.alert('提示', '操作成功');
				} else {
					$.messager.alert('提示', '操作失败');
				}
			}
		});
	}else{
		$("#addSaveBtn").linkbutton('enable');
		$.messager.alert('提示', '已存在的编码，请修改！');
	}
}

/**
 * 编辑
 */
function edit(index) {
	$('#menu_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#menu_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '编辑',
		width : 550,
		height : 270,
		modal : true,
		href : editWinPath,
		onLoad : function() {
			var node = $("#menu_tree").tree("getSelected");
			if (node == null) {
				$("#url").validatebox({required : false});
				$("#url_label").hide();
				$("#url").hide();
			} else {
				if (node.id == null) {
					$("#url").validatebox({required : false});
					$("#url_label").hide();
					$("#url").hide();
				}
			}
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
	var code = $("#code").val();
	if(checkCode(code)){
		$('#menu_edit_form').form('submit', {
			url : editSavePath,
			onSubmit : function() {
				var isValid = $(this).form('validate');
				if (!isValid) {
					$("#editSaveBtn").linkbutton('enable');// 表单验证不通过，启用按钮
				}
				return isValid; // 返回false终止表单提交
			},
			success : function(data) {
				$("#editSaveBtn").linkbutton('enable');
				if (data) {
					data = JSON.parse(data);
					if (data.type == 'menu') {
						$("#menu_tree").tree("reload");
					}
					$('#menu_datagrid').datagrid('reload');
					$('#win').dialog('close');
					$.messager.alert('提示', '操作成功');
				} else {
					$.messager.alert('提示', '操作失败');
				}
			}
		});
	}else{
		$("#editSaveBtn").linkbutton('enable');
		$.messager.alert('提示', '已存在的编码，请修改！');
	}
}

/**
 * 删除
 */
function del() {
	var selections = $('#menu_datagrid').datagrid('getSelections');
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
						$("#menu_tree").tree("reload");
						$('#menu_datagrid').datagrid('reload');
					} else {
						$.messager.alert("提示", "删除失败");
						$('#menu_datagrid').datagrid('reload');
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
	$('#menu_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#menu_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '查看',
		modal : true,
		width : 550,
		height : 270,
		iconCls : 'icon-search',
		href : viewWinPath,
		onLoad : function() {
			var type;
			if(record.title == 'menu'){
				type = '菜单项';
			}else{
				type = '菜单值';
			}
			$('span[name=type]').text(type);
			$('span[name=url]').text(record.url);
			$('span[name=title]').text(record.title);
			$('span[name=code]').text(record.code);
			$('span[name=icon]').text(record.icon);
			$('span[name=sortNo]').text(record.sortNo);
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
	var title = $("#title").val();
	var code = $("#code").val();
	var node = $("#menu_tree").tree("getSelected");
	var parentId;
	if(node != null){
		parentId = node.id;
	}else{
		parentId = "";
	}
	if ($('#menu_queryForm').form('validate')) {
		$('#menu_datagrid').datagrid('load', {
			parentId : parentId,
			title : title,
			code : code
		});
	}
}

/**
 * 重置查询条件
 */
function reset() {
	$('#menu_queryForm').form('reset');
}

/**
 * 选中树节点时触发
 * 
 * @param node
 */
function selectMenu(node) {
	if(node != null){
		$("#add").linkbutton("enable");
	}
	$('#menu_datagrid').datagrid('load', {
		parentId : node.id
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

/**
 * 检查编码是否重复
 * 
 * @param code
 */
function checkCode(code) {
	var flag = false;
	$.ajax({
		url : checkCodePath,
		type : "POST",
		async : false,
		data : {
			code : code
		},
		success : function(data) {
			if (data.length > 0) {
				flag = false;
			} else {
				flag = true;
			}
		}
	});
	return flag;
}