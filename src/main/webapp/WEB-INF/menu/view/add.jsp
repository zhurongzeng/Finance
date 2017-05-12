<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="menu_add_form" method="post">
	<input type="hidden" name="parentId" id="parentId" />
	<table align="center" style="border-collapse: separate; border-spacing: 15px 10px; margin-top: 25px;">
		<tr>
			<td><label>菜单类型:</label></td>
			<td><input name="type" id="type" class="easyui-combobox" data-options="
				textField:'text',valueField:'id',data:[{id:'menu',text:'菜单项'},{id:'item',text:'菜单值'}],required:true,readonly:true" /></td>
		
			<td><label id="url_label">URL路径:</label></td>
			<td><input id="url" name="url" class="easyui-validatebox" data-options="validType:'maxLength[100]',required:true" /></td>
		</tr>
		<tr>
			<td><label>名称:</label></td>
			<td><input name="title" id="title" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:true" /></td>
		
			<td><label>编码:</label></td>
			<td><input id="code" name="code" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:true" /></td>
		</tr>
		<tr>
			<td><label>图标:</label></td>
			<td><input name="icon" id="icon" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:false" /></td>
			
			<td><label>排序号:</label></td>
			<td><input id="sortNo" name="sortNo" class="easyui-numberspinner" data-options="min:1,validType:'maxLength[10]',required:false,value:1" /></td>
		</tr>
		<tr>
			<td><label>备注:</label></td>
			<td colspan="3">
				<input name="remark" id="remark" class="easyui-textbox" style="width:100%" data-options="validType:'maxLength[16]',required:false" />
			</td>
		</tr>
	</table>
</form>