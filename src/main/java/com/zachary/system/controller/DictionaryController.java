package com.zachary.system.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zachary.system.model.Dictionary;
import com.zachary.system.model.GridView;
import com.zachary.system.service.IDictionaryService;

@Controller
@RequestMapping("/system/dic")
public class DictionaryController {
	@Resource
	private IDictionaryService dictionaryService;

	/**
	 * 页面跳转
	 * 
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping("/view/{id}")
	public String doView(@PathVariable String id, Model model) {
		if ("index".equals(id)) {
			return "/consumeRecord/" + id;
		}
		return "/consumeRecord/view/" + id;
	}

	/**
	 * 查询列表
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/page")
	@ResponseBody
	public GridView<Dictionary> page(@RequestParam Map<String, Object> param) {
		// int page = Integer.parseInt(param.get("page").toString());
		// int rows = Integer.parseInt(param.get("rows").toString());
		param.put("start", 0);
		param.put("rows", 50);
		GridView<Dictionary> gridView = null;
		try {
			gridView = new GridView<Dictionary>(dictionaryService.list(param), dictionaryService.count(param));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridView;
	}

	/**
	 * 新增记录
	 * 
	 * @param dictionary
	 * @return
	 */
	@RequestMapping("/service/add")
	@ResponseBody
	public Dictionary add(Dictionary dictionary) {
		try {
			if (dictionaryService.insert(dictionary)) {
				return dictionary;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 更新记录
	 * 
	 * @param dictionary
	 * @return
	 */
	@RequestMapping("/service/update")
	@ResponseBody
	public Dictionary update(Dictionary dictionary) {
		try {
			if (dictionaryService.update(dictionary)) {
				return dictionary;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 删除记录
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping("/service/remove")
	@ResponseBody
	public boolean remove(@RequestBody List<String> ids) {
		boolean flag = false;
		try {
			flag = dictionaryService.delete(ids);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 查询字典
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/listDic")
	@ResponseBody
	public List<Dictionary> listDic(@RequestParam Map<String, Object> param) {
		List<Dictionary> list = null;
		try {
			list = dictionaryService.list(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
}
