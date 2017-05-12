<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="consume_record_add_form" method="post">
	<table align="center" style="border-collapse: separate; border-spacing: 15px 10px; margin-top: 25px;">
		<tr>
			<td><label>标题:</label></td>
			<td><input id="title" name="title" class="easyui-validatebox" data-options="validType:'maxLength[16]',required:true" /></td>

			<td><label>消费日期:</label></td>
			<td><input name="consumeDate" id="consumeDate" class="easyui-datebox" editable="false" data-options="required:true" /></td>
		</tr>
		<tr>
			<td><label>备注:</label></td>
			<td colspan="3"><input name="remark" id="remark" class="easyui-textbox" style="width:100%" 
			data-options="validType:'maxLength[16]',required:false" /></td>
		</tr>
	</table>
</form>
