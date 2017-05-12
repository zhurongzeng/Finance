<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="consume_type_queryForm">
	<table style="margin: 5px auto; width: 100%;">
		<tr>
			<td style="text-align:right;">
				<label for="name">名称:</label>
				<input id="name" name="name" class="easyui-validatebox" />
				&nbsp;&nbsp;
			</td>
			<td style="text-align:left;">
				<label for="code">编码:</label>
				<input id="code" name="code" class="easyui-validatebox" />
				&nbsp;&nbsp;&nbsp;
				<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query();">查询</a>
				<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="reset();">重置</a>
			</td>
		</tr>
	</table>
</form>
