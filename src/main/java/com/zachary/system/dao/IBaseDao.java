package com.zachary.system.dao;

import java.util.List;
import java.util.Map;

public interface IBaseDao<T> {
	/**
	 * 插入记录
	 * 
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int insert(T t) throws Exception;

	/**
	 * 批量删除记录
	 * 
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int delete(List<String> ids) throws Exception;

	/**
	 * 根据ID删除记录
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public int deleteById(String id) throws Exception;

	/**
	 * 更新记录
	 * 
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int update(T t) throws Exception;

	/**
	 * 查询列表
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public List<T> list(Map<String, Object> param) throws Exception;

	/**
	 * 根据ID查询记录
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public T getById(String id) throws Exception;

	/**
	 * 查询记录总数
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public Long count(Map<String, Object> param) throws Exception;
}
