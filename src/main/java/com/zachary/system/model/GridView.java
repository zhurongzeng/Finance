package com.zachary.system.model;

import java.util.ArrayList;
import java.util.List;

public class GridView<T> {

	/* 总条数 */
	private Long total = 0L;

	/* 查询结果 */
	private List<T> rows = new ArrayList<T>();

	public GridView(List<T> rows, Long total) {
		this.total = total;
		this.rows = rows;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}
}
