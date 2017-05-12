<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div style="width: 100%; height: 100%">
	<table id="consume_type_datagrid" class="easyui-datagrid" title=""
		data-options="rownumbers:true,
	              fitColumns:false,
	              striped:true,
				  url:pagePath,
				  pagination:true,
				  pageSize:10,
				  fit: true,
				  singleSelect:false,
				  toolbar:'#consume_type_gridToolbar',
				  onLoadSuccess:loadSuccess ">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
				<th data-options="field:'id',hidden:true">ID</th>
				<th data-options="field:'name',align:'center',width:350">名称</th>
				<th data-options="field:'code',align:'center',width:350">编码</th>
				<th data-options="field:'remark',align:'center',width:400">备注</th>
				<th data-options="field:'action',width:350,align:'center',formatter:operation">操作</th>
			</tr>
		</thead>
	</table>
</div>
<div id="consume_type_gridToolbar">
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="add();">新增</a> 
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="del();">删除</a>
</div>