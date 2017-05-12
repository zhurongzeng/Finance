package com.zachary.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zachary.system.dao.IMenuDao;
import com.zachary.system.model.Menu;
import com.zachary.system.service.IMenuService;

@Service("menuService")
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements IMenuService {
	
	private IMenuDao menuDao;

	public IMenuDao getDao() {
		return menuDao;
	}

	@Autowired
	public void setDao(IMenuDao menuDao) {
		this.menuDao = menuDao;
	}
}
