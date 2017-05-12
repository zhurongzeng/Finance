<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form id="consume_record_queryForm">
	<table style="margin: 5px auto; width: 100%;">
		<tr>
			<td style="text-align:right;">
				<label for="title">标题:</label>
				<input id="title" name="title" class="easyui-validatebox" />
				&nbsp;&nbsp;
			</td>
			<td style="text-align:left;">
				<label for="consumeDate">消费日期:</label>
				<input id="consumeDate" name="consumeDate" class="easyui-datebox" />
				&nbsp;&nbsp;&nbsp;
				<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="query();">查询</a>
				<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="reset();">重置</a>
			</td>
		</tr>
	</table>
</form>