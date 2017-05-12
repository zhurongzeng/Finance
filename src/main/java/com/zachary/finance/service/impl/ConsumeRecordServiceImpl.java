package com.zachary.finance.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zachary.finance.dao.IConsumeRecordDao;
import com.zachary.finance.model.ConsumeRecord;
import com.zachary.finance.service.IConsumeRecordService;
import com.zachary.system.service.impl.BaseServiceImpl;

@Service("consumeRecordService")
public class ConsumeRecordServiceImpl extends BaseServiceImpl<ConsumeRecord> implements IConsumeRecordService {
	
	private IConsumeRecordDao consumeRecordDao;
	
	public IConsumeRecordDao getDao() {
		return consumeRecordDao;
	}

	@Autowired
	public void setDao(IConsumeRecordDao consumeRecordDao) {
		this.consumeRecordDao = consumeRecordDao;
	}
}
