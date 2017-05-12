package com.zachary.finance.dao;

import java.util.Map;

import com.zachary.finance.model.ConsumeDetail;
import com.zachary.system.dao.IBaseDao;

public interface IConsumeDetailDao extends IBaseDao<ConsumeDetail> {
	/**
	 * 计算总钱数
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Double calMoney(Map<String, Object> param) throws Exception;
}