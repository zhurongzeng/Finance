package com.zachary.system.model;

import java.util.List;

public class TreeModel<T> {
	private String state;
	private String iconCls;
	private boolean checked;
	private String text;
	private String id;
	private String type;
	private List<TreeModel<T>> children;
	private T attributes;

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIconCls() {
		if ((this.iconCls == null) || (("".equals(this.iconCls)) && (null != this.type))) {
			if ("0".equals(this.type)) {
				this.iconCls = "icon-org";
			} else if ("1".equals(this.type)) {
				this.iconCls = "icon-dept";
			} else if ("2".equals(this.type)) {
				this.iconCls = "icon-group";
			}
		}
		return this.iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean getChecked() {
		return this.checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public T getAttributes() {
		return (T) this.attributes;
	}

	public void setAttributes(T attributes) {
		this.attributes = attributes;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<TreeModel<T>> getChildren() {
		return this.children;
	}

	public void setChildren(List<TreeModel<T>> children) {
		this.children = children;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
