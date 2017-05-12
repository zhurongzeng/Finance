<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="consume_detail_form" method="post">
	<table align="center" style="border-collapse: separate; border-spacing: 15px 10px; margin:10px auto;">
		<tr>
			<td><label>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题:</label></td>
			<td colspan="3"><input id="title" name="title" class="easyui-textbox" style="width:100%;" readOnly="true"/></td>
		</tr>
		<tr>
			<td><label>消费金额:</label></td>
			<td><input name="consumeAmount" id="consumeAmount" class="easyui-numberbox" readOnly="true" /></td>
		
			<td><label>消费日期:</label></td>
			<td><input name="consumeDate" id="consumeDate" class="easyui-datebox" readOnly="true" /></td>
		</tr>
		<input type="hidden" id="id" name="id" />
	</table>
	<div id="detail" style="width: 100%; height:362px">
		<table id="consume_detail_datagrid" class="easyui-datagrid" title="消费明细" style="margin-top:10px;"
			data-options="rownumbers:true,
	              fitColumns:true,
	              striped:true,
				  url:consumeDetailPath,
				  queryParams:{
				  	  consumeId:'${consumeId}'
				  },
				  pagination:true,
				  pageSize:10,
				  fit: true,
				  singleSelect:true,
				  toolbar:'#consume_detail_gridToolbar',
				  onLoadSuccess:loadSuccess,
				  onBeforeEdit:onBeforeEdit, 
				  onEndEdit:onEndEdit,
		          onAfterEdit:onAfterEdit,
		          onCancelEdit:onCancelEdit ">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th data-options="field:'id',hidden:true">ID</th>
					<th data-options="field:'consumeTypeName',align:'center',width:70,editor:{type:'combotree',options:{url:consumeTypePath,editable:false,required:true}}">消费类别</th>
					<th data-options="field:'consumeMoney',align:'center',width:70,editor:{type:'numberbox',options:{required:true}}">消费金额</th>
					<th data-options="field:'remark',align:'center',width:100,editor:{type:'validatebox'}">备注</th>
					<th data-options="field:'action',width:50,align:'center',formatter:formatDetailOp">操作</th>
				</tr>
			</thead>
		</table>
	</div><!-- <%=request.getContextPath()%>/system/dic/page  -->
	<div id="consume_detail_gridToolbar">
		<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="addDetail();">新增</a>
	</div>
</form>
