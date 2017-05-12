// =======相关访问路径声明=======start=========
var contextPath = "/" + window.location.pathname.split("/")[1];

var addWinPath = contextPath + '/consumeRecord/view/add';
var editWinPath = contextPath + '/consumeRecord/view/edit';
var viewWinPath = contextPath + '/consumeRecord/view/view';

var pagePath = contextPath + '/consumeRecord/service/page';
var addSavePath = contextPath + '/consumeRecord/service/add';
var editSavePath = contextPath + '/consumeRecord/service/update';
var removeSavePath = contextPath + '/consumeRecord/service/remove';

var consumeDetailWinPath = contextPath + '/consumeRecord/view/consumeDetail';
var consumeDetailPath = contextPath + '/consumeDetail/service/page';
var removeDetailPath = contextPath + '/consumeDetail/service/remove';
var calMoneyPath = contextPath + '/consumeDetail/service/calMoney';
var consumeTypePath = contextPath + '/consumeType/service/tree';
// =======相关访问路径声明=======end=========

/**
 * 新增
 */
function add() {
	$('#win').dialog({
		title : '新增',
		width : 550,
		height : 200,
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
	$('#consume_record_add_form').form('submit', {
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
				$('#consume_record_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功','info');
			} else {
				$("#addSaveBtn").linkbutton('enable');
				$.messager.alert('提示', '操作失败','error');
			}
		}
	});
}

/**
 * 编辑
 * 
 * @param record
 */
function edit(index) {
	$('#consume_record_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#consume_record_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '编辑',
		width : 550,
		height : 200,
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
	$('#consume_record_edit_form').form('submit', {
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
				$('#consume_record_datagrid').datagrid('reload');
				$('#win').dialog('close');
				$.messager.alert('提示', '操作成功','info');
			} else {
				$("#editSaveBtn").linkbutton('enable');
				$.messager.alert('提示', '操作失败','error');
			}
		}
	});
}

/**
 * 删除
 */
function del() {
	var selections = $('#consume_record_datagrid').datagrid('getSelections');
	if (selections.length == 0) {
		$.messager.alert('提示', '请至少选择一条记录进行操作!','error');
		return;
	}
	var ids = [];
	for (var i = 0; i < selections.length; i++) {
		if(selections[i].consumeAmount > 0){
			$.messager.alert('提示', '存在已有消费明细的消费记录，删除失败!','error');
			return;
		}
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
						$.messager.alert("提示", "删除成功",'info');
						$('#consume_record_datagrid').datagrid('reload');
					} else {
						$.messager.alert("提示", "删除失败",'error');
						$('#consume_record_datagrid').datagrid('reload');
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
	$('#consume_record_datagrid').datagrid('selectRow', index);// 关键在这里
	var record = $('#consume_record_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '查看',
		modal : true,
		width : 550,
		height : 220,
		iconCls : 'icon-search',
		href : viewWinPath,
		onLoad : function() {
			$('span[name=title]').text(record.title);
			$('span[name=consumeAmount]').text(record.consumeAmount);
			$('span[name=consumeDate]').text(record.consumeDate);
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
	var consumeDate = $("#consumeDate").datebox('getValue');
	if ($('#consume_record_queryForm').form('validate')) {
		$('#consume_record_datagrid').datagrid('load', {
			title : title,
			consumeDate : consumeDate
		});
	}
}

/**
 * 重置查询条件
 */
function reset() {
	$('#consume_record_queryForm').form('reset');
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
	var btn1 = '<a class="editcls1" style="line-height:50px;" href="javascript:void(0);" onclick="view(' + index + ')">查看</a>';
	var btn2 = '<a class="editcls2" href="javascript:void(0);" onclick="edit(' + index + ')">编辑</a>';
	var btn3 = '<a class="editcls3" href="javascript:void(0);" onclick="consumeDetail(' + index + ')">编辑明细</a>';
	return btn1 + btn2 + btn3;
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
	
	$('.editcls3').linkbutton({
		text : '编辑明细',
		plain : true,
		iconCls : 'icon-detail'
	});
}
/********************************************************消费明细相关操作**********************************************************/
/**
 * 打开消费明细
 */
function consumeDetail(index) {
	$('#consume_record_datagrid').datagrid('selectRow', index);
	var record = $('#consume_record_datagrid').datagrid('getSelected');
	$('#win').dialog({
		title : '明细',
		width : 800,
		height : 535,
		closable : false,
		modal : true,
		href : consumeDetailWinPath+"?id="+record.id,
		onLoad : function() {
			$('#win').find('form').form('load', record);
		},
		buttons : [{
			text : '关闭',
			handler : function() {
				$('#win').dialog("close");
				$('#consume_record_datagrid').datagrid('reload');
			}
		} ]
	});
}

/**
 * 添加明细
 */
function addDetail(){
	var row = $('#consume_detail_datagrid').datagrid('getSelected');
	if (row){
		var index = $('#consume_detail_datagrid').datagrid('getRowIndex', row);
	} else {
		index = 0;
	}
	$('#consume_detail_datagrid').datagrid('insertRow', {
		index: index,
		row:{ }
	});
	$('#consume_detail_datagrid').datagrid('selectRow',index);
	$('#consume_detail_datagrid').datagrid('beginEdit',index);
}

/**
 *  格式化明细列表操作列
 *  
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function formatDetailOp(value, row, index) {
	if (row.editing) {
		var s = '<a href="javascript:void(0)" onclick="saveDetail(this)">保存</a> ';
		var c = '<a href="javascript:void(0)" onclick="cancelEdit(this)">取消</a>';
		return s + c;
	} else {
		var e = '<a href="javascript:void(0)" onclick="editDetail(this)">编辑</a> ';
		var d = '<a href="javascript:void(0)" onclick="deleteDetail(this)">删除</a>';
		return e + d;
	}
}

/**
 * 获取行号
 * 
 * @param target
 * @returns
 */
function getRowIndex(target) {
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}

/**
 * 编辑明细
 * 
 * @param target
 */
function editDetail(target) {
	$('#consume_detail_datagrid').datagrid('selectRow', getRowIndex(target));
	$('#consume_detail_datagrid').datagrid('beginEdit', getRowIndex(target));
}

/**
 * 删除明细
 * 
 * @param target
 */
function deleteDetail(target) {
	$.messager.confirm('提示', '确认要删除吗?', function(flag) {
		if (flag) {
			$('#consume_detail_datagrid').datagrid('selectRow', getRowIndex(target));
			var record = $('#consume_detail_datagrid').datagrid('getSelected');
			var consumeId = $("#id").val();
			$.ajax({
				url : removeDetailPath,
				type : "POST", 
				data : {
					id:record.id,
					consumeId:consumeId
				},
				success : function(data) {
					if (data) {
						$.messager.alert("提示", "删除成功",'info');
						$("#consumeAmount").numberbox('setValue',calMoney(consumeId));
					} else {
						$.messager.alert("提示", "删除失败",'error');
					}
				}
			});
			$('#consume_detail_datagrid').datagrid('deleteRow', getRowIndex(target));
			$('#consume_detail_datagrid').datagrid('unselectAll');
		}
	});
}

/**
 * 保存明细
 * 
 * @param target
 */
function saveDetail(target) {
	$('#consume_detail_datagrid').datagrid('selectRow', getRowIndex(target));
	var ed = $("#consume_detail_datagrid").datagrid('getEditor', {
		index : getRowIndex(target),
		field : 'consumeTypeName'
	});
	var newType = $(ed.target).combotree("getText");
	$('#consume_detail_datagrid').datagrid('endEdit', getRowIndex(target));
	var record = $('#consume_detail_datagrid').datagrid('getSelected');
	var rows = $('#consume_detail_datagrid').datagrid('getRows');
	for(var i=0; i<rows.length;i++){
		if(rows[i].id == null || rows[i].id == record.id){
			continue;
		}
		if(rows[i].consumeType == record.consumeType){
			$('#consume_detail_datagrid').datagrid('reload');
			$.messager.alert("提示", "已存在类型为'" + newType + "'的消费明细,保存失败!", 'error');
			return;
		}
	}
	
	var consumeId = $("#id").val();
	var consumeAmount = $("#consumeAmount").numberbox('getValue');
	var detail;
	var saveDetailPath;
	if(record.id != null && record.id != ''){
		saveDetailPath = contextPath + '/consumeDetail/service/update';
		detail = [{
			id:record.id,
			consumeType:record.consumeType,
			consumeMoney:record.consumeMoney,
			remark:record.remark,
			consumeId:consumeId
		}];
	}else{
		saveDetailPath = contextPath + '/consumeDetail/service/add';
		detail = [{
			consumeType:record.consumeType,
			consumeMoney:record.consumeMoney,
			remark:record.remark,
			consumeId:consumeId
		}];
	}
	$.ajax({
		url : saveDetailPath,
		type : "POST",
		contentType : 'application/json;charset=utf-8', // 设置请求头信息
		dataType : "json",
		data : JSON.stringify(detail),
		success : function(data) {
			if (data) {
				$.messager.alert("提示", "保存成功",'info');
				$("#consumeAmount").numberbox('setValue',calMoney(consumeId));
				$('#consume_detail_datagrid').datagrid('reload');
			} else {
				$.messager.alert("提示", "保存失败",'error');
			}
		}
	});
}

/**
 * 取消编辑
 * 
 * @param target
 */
function cancelEdit(target) {
	$('#consume_detail_datagrid').datagrid('selectRow', getRowIndex(target));
	var record = $('#consume_detail_datagrid').datagrid('getSelected');
	if (record.id != null && record.id != '') {
		$('#consume_detail_datagrid').datagrid('cancelEdit', getRowIndex(target));
	} else {// 如果是新加的行，取消编辑后同时删除该行
		$('#consume_detail_datagrid').datagrid('deleteRow', getRowIndex(target));
	}
}

function onBeforeEdit(index, row) {
	row.editing = true;
	$(this).datagrid('refreshRow', index);
}

function onEndEdit(index, row) {
	var ed = $(this).datagrid('getEditor', {
		index : index,
		field : 'consumeTypeName'
	});
	var consumeType = $(ed.target).combotree('getValue');
	if (consumeType != ed.oldHtml) {
		row.consumeType = consumeType;
	}
}

function onAfterEdit(index, row) {
	row.editing = false;
	$(this).datagrid('refreshRow', index);
}

function onCancelEdit(index, row) {
	row.editing = false;
	$(this).datagrid('refreshRow', index);
}

/**
 * 金额变动时，计算金额总数
 * 
 * @param consumeId
 * @returns {Number}
 */
function calMoney(consumeId){
	var money;
	$.ajax({
		url : calMoneyPath,
		type : "POST",
		async:false,
		data : {
			consumeId:consumeId
		},
		success : function(data) {
			if(data){
				money = data;
			}else{
				money = 0;
			}
		}
	});
	return money;
}