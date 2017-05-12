package com.zachary.finance.service;

import java.util.Map;

import com.zachary.finance.model.ConsumeDetail;
import com.zachary.system.service.IBaseService;

public interface IConsumeDetailService extends IBaseService<ConsumeDetail> {
	/**
	 * 计算总钱数
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Double calMoney(Map<String, Object> param) throws Exception;
}
