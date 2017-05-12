<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div style="width: 100%; height: 100%">
	<table id="menu_datagrid" class="easyui-datagrid" title=""
		data-options="rownumbers:true,
	              fitColumns:false,
	              striped:true,
				  url:pagePath,
				  pagination:true,
				  pageSize:10,
				  fit: true,
				  singleSelect:false,
				  toolbar:'#menu_gridToolbar',
				  onLoadSuccess:loadSuccess ">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
				<th data-options="field:'id',hidden:true">ID</th>
				<th data-options="field:'title',align:'center',width:300">名称</th>
				<th data-options="field:'code',align:'center',width:200">编码</th>
				<th data-options="field:'icon',align:'center',width:300">图标</th>
				<th data-options="field:'url',align:'center',width:350">路径</th>
				<th data-options="field:'action',width:300,align:'center',formatter:operation">操作</th>
			</tr>
		</thead>
	</table>
</div>
<div id="menu_gridToolbar">
	<a href="#" class="easyui-linkbutton" id="add" data-options="iconCls:'icon-add',plain:true,disabled:true" onclick="add();">新增</a> 
	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="del();">删除</a>
</div>