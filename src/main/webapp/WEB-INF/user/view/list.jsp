<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<style>
#record .datagrid-btable tr {
	height: 20px;
}
</style>
<div id="record" style="width: 100%; height: 100%">
	<table id="consume_record_datagrid" class="easyui-datagrid" title=""
		data-options="rownumbers:true,
	              fitColumns:false,
	              striped:true,
				  url:pagePath,
				  pagination:true,
				  pageSize:10,
				  fit: true,
				  singleSelect:false,
				  toolbar:'#consume_record_gridToolbar',
				  onLoadSuccess:loadSuccess ">
		<thead>
			<tr>
				<th data-options="field:'ck',checkbox:true"></th>
				<th data-options="field:'id',hidden:true">ID</th>
				<th data-options="field:'title',align:'center',width:200">标题</th>
				<th data-options="field:'consumeDate',align:'center',width:125">消费日期</th>
				<th data-options="field:'consumeAmount',align:'center',width:125">消费金额</th>
				<th data-options="field:'remark',align:'center',width:150">备注</th>
				<th data-options="field:'creatorName',align:'center',width:125">创建人</th>
				<th data-options="field:'createTime',align:'center',width:150">创建时间</th>
				<th
					data-options="field:'action',width:225,align:'center',formatter:operation">操作</th>
			</tr>
		</thead>
	</table>
</div>
<div id="consume_record_gridToolbar">
	<a href="#" class="easyui-linkbutton"
		data-options="iconCls:'icon-add',plain:true" onclick="add();">新增</a> <a
		href="#" class="easyui-linkbutton"
		data-options="iconCls:'icon-remove',plain:true" onclick="del();">删除</a>
</div>