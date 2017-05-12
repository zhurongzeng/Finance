package com.zachary.finance.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zachary.finance.dao.IConsumeTypeDao;
import com.zachary.finance.model.ConsumeType;
import com.zachary.finance.service.IConsumeTypeService;
import com.zachary.system.service.impl.BaseServiceImpl;

@Service("consumeTypeService")
public class ConsumeTypeServiceImpl extends BaseServiceImpl<ConsumeType> implements IConsumeTypeService {

	private IConsumeTypeDao consumeTypeDao;

	public IConsumeTypeDao getDao() {
		return consumeTypeDao;
	}

	@Autowired
	public void setDao(IConsumeTypeDao consumeTypeDao) {
		this.consumeTypeDao = consumeTypeDao;
	}
}
