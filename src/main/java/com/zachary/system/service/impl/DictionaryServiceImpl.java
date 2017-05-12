package com.zachary.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zachary.system.dao.IDictionaryDao;
import com.zachary.system.model.Dictionary;
import com.zachary.system.service.IDictionaryService;

@Service("dictionaryService")
public class DictionaryServiceImpl extends BaseServiceImpl<Dictionary> implements IDictionaryService {
	
	private IDictionaryDao dictionaryDao;

	public IDictionaryDao getDao() {
		return dictionaryDao;
	}

	@Autowired
	public void setDao(IDictionaryDao dictionaryDao) {
		this.dictionaryDao = dictionaryDao;
	}
}
