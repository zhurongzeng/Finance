<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="user_add_form" method="post">
	<table align="center"
		style="border-collapse: separate; border-spacing: 15px 10px; margin-top: 10px;">
		<tr>
			<td><label>姓名:</label></td>
			<td><input id="name" name="name" class="easyui-textbox"
				data-options="validType:'maxLength[18]',required:true,panelHeight:120" /></td>

			<td><label>性别:</label></td>
			<td><input name="sex" class="easyui-combobox" editable="false"
				data-options="valueField: 'value',textField: 'text',data: [{text: '男',value: '0'},{text: '女',value: '1'}],required:true" />
			</td>
		</tr>
		<tr>
			<td><label>生日:</label></td>
			<td><input name="dob" id="dob" class="easyui-datebox"
				editable="false" data-options="onChange:calAge" /></td>

			<td><label>电话:</label></td>
			<td><input name="tel" class="easyui-textbox"
				data-options="validType:'maxLength[36]',required:true" /></td>
		</tr>
		<tr>
			<td><label>备注:</label></td>
			<td colspan='3'><textarea name="remark"
					class="easyui-validatebox" style="width: 99.2%; height: 70px;"
					data-options="validType:'maxLength[100]',required:false" /></textarea></td>
		</tr>
	</table>
	<div style="height: 500px;">
		<table id="consume_datagrid" class="easyui-datagrid" title=""
			style="height: 100%;"
			data-options="rownumbers:true,
		                fitColumns:true,
		                striped:true,
					    url:pagePath,
					    pagination:true,
					    pageSize:10,
					    fit: true,
					    singleSelect:false,
					    toolbar:'#consume_gridToolbar',
					    onLoadSuccess:loadSuccess ">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th data-options="field:'name',align:'center',width:100">姓名</th>
					<th data-options="field:'sex',align:'center',formatter:formatSex,width:100">性别</th>
					<th data-options="field:'dob',align:'center',formatter:formatDate,width:100">生日</th>
					<th data-options="field:'tel',align:'center',width:100">联系电话</th>
						
					<th data-options="field:'action',hidden:true,width:80,align:'center',formatter:operation">操作</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="consume_gridToolbar">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="addConsume();">新增</a>
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="deleteConsume();">删除</a>
	</div>
</form>
