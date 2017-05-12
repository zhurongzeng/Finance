<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="user_queryForm">
	<table style="margin: 5px auto; width: 450px;">
		<tr>
			<td><label for="name">姓名:</label></td>
			<td><input id="name" name="name" class="easyui-validatebox" /></td>

			<td><a id="btn" href="#" class="easyui-linkbutton"
				data-options="iconCls:'icon-search'" onclick="query();">查询</a></td>
			<td><a id="btn" href="#" class="easyui-linkbutton"
				data-options="iconCls:'icon-cancel'" onclick="reset();">重置</a></td>
		</tr>
	</table>
</form>
