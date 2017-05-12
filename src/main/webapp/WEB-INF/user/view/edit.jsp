<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="user_edit_form" method="post">
	<input type="hidden" name="id" /> 
	<table align="center"
		style="border-collapse: separate; border-spacing: 15px 10px; margin-top: 10px;">
		<tr>
			<td><label>姓名:</label></td>
			<td><input id="name" name="name" class="easyui-validatebox"
				data-options="validType:'maxLength[18]',required:true,panelHeight:120" /></td>

			<td><label>性别:</label></td>
			<td><input name="sex" class="easyui-combobox"
				data-options="valueField: 'value',textField: 'text',data: [{text: '男',value: '0'},{text: '女',value: '1'}],required:true" />
			</td>
		</tr>
		<tr>
			<td><label>生日:</label></td>
			<td><input name="dob" id="dob" class="easyui-datebox" editable="false"
				data-options="required:true,onChange:calAge" /></td>

			<td><label>年龄:</label></td>
			<td><input name="age" id="age" class="easyui-numberbox"
				data-options="validType:'maxLength[3]'" readOnly="true"/></td>
		</tr>
		<tr>
			<td><label>电话:</label></td>
			<td><input name="tel" class="easyui-numberbox"
				data-options="validType:'maxLength[36]',required:true" /></td>
		</tr>
		<tr>
			<td><label>地址:</label></td>
			<td colspan='3'><textarea name="address"
					class="easyui-validatebox" style="width: 99.2%; height: 30px;"
					data-options="validType:'maxLength[100]',required:false" /></textarea></td>
		</tr>
		<tr>
			<td><label>备注:</label></td>
			<td colspan='3'><textarea name="remark"
					class="easyui-validatebox" style="width: 99.2%; height: 30px;"
					data-options="validType:'maxLength[100]',required:false" /></textarea></td>
		</tr>
	</table>
</form>
