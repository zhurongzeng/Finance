<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="consume_type_add_form" method="post">
	<table align="center" style="border-collapse: separate; border-spacing: 15px 10px; margin-top: 25px;">
		<tr>
			<td><label>编码:</label></td>
			<td><input id="code" name="code" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:true" /></td>

			<td><label>名称:</label></td>
			<td><input name="name" id="name" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:true" /></td>
		</tr>
	</table>
</form>
