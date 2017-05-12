package com.zachary.finance.model;

public class ConsumeDetail {
	private String id;

	private String consumeType;

	private String consumeTypeName;

	private Double consumeMoney;

	private String consumeId;

	private String remark;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getConsumeType() {
		return consumeType;
	}

	public void setConsumeType(String consumeType) {
		this.consumeType = consumeType == null ? null : consumeType.trim();
	}

	public String getConsumeTypeName() {
		return consumeTypeName;
	}

	public void setConsumeTypeName(String consumeTypeName) {
		this.consumeTypeName = consumeTypeName == null ? null : consumeTypeName.trim();
	}

	public Double getConsumeMoney() {
		return consumeMoney;
	}

	public void setConsumeMoney(Double consumeMoney) {
		this.consumeMoney = consumeMoney;
	}

	public String getConsumeId() {
		return consumeId;
	}

	public void setConsumeId(String consumeId) {
		this.consumeId = consumeId == null ? null : consumeId.trim();
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}
}