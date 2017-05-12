package com.zachary.finance.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zachary.finance.dao.IConsumeDetailDao;
import com.zachary.finance.model.ConsumeDetail;
import com.zachary.finance.service.IConsumeDetailService;
import com.zachary.system.service.impl.BaseServiceImpl;

@Service("consumeDetailService")
public class ConsumeDetailServiceImpl extends BaseServiceImpl<ConsumeDetail> implements IConsumeDetailService {
	
	private IConsumeDetailDao consumeDetailDao;
	
	public IConsumeDetailDao getDao() {
		return consumeDetailDao;
	}

	@Autowired
	public void setDao(IConsumeDetailDao consumeDetailDao) {
		this.consumeDetailDao = consumeDetailDao;
	}

	@Override
	public Double calMoney(Map<String, Object> param) throws Exception {
		return getDao().calMoney(param);
	}

}
