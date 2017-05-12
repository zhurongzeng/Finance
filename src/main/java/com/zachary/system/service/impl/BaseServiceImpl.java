package com.zachary.system.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.zach.finance.system.dao.IBaseDao;
import com.zach.finance.system.service.IBaseService;

public class BaseServiceImpl<T> implements IBaseService<T> {

	private IBaseDao<T> baseDao;

	public IBaseDao<T> getDao() {
		return baseDao;
	}

	@Autowired
	public void setDao(IBaseDao<T> baseDao) {
		this.baseDao = baseDao;
	}

	/**
	 * 插入记录
	 * 
	 * @param t
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean insert(T t) throws Exception {
		return getDao().insert(t) > 0;
	}

	/**
	 * 批量删除记录
	 * 
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean delete(List<String> ids) throws Exception {
		return getDao().delete(ids) > 0;
	}

	/**
	 * 更新记录
	 * 
	 * @param t
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean update(T t) throws Exception {
		return getDao().update(t) > 0;
	}

	/**
	 * 查询列表
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<T> list(Map<String, Object> param) throws Exception {
		return getDao().list(param);
	}

	/**
	 * 根据ID查询记录
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Override
	public T getById(String id) throws Exception {
		return getDao().getById(id);
	}

	/**
	 * 查询记录总数
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@Override
	public Long count(Map<String, Object> param) throws Exception {
		return getDao().count(param);
	}

	/**
	 * 根据ID删除记录
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean deleteById(String id) throws Exception {
		return getDao().deleteById(id) > 0;
	}
}
