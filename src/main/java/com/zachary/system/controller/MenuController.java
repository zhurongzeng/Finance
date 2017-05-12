package com.zachary.system.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zachary.system.model.GridView;
import com.zachary.system.model.Menu;
import com.zachary.system.model.TreeModel;
import com.zachary.system.service.IMenuService;

@Controller
@RequestMapping("/system/menu")
public class MenuController {
	@Resource
	private IMenuService menuService;

	/**
	 * 页面跳转
	 * 
	 * @param id
	 * @param param
	 * @param model
	 * @return
	 */
	@RequestMapping("/view/{id}")
	public String doView(@PathVariable String id) {
		if ("index".equals(id)) {
			return "/menu/" + id;
		}
		return "/menu/view/" + id;
	}

	/**
	 * 查询列表
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/page")
	@ResponseBody
	public GridView<Menu> page(@RequestParam Map<String, Object> param) {
		if (param.get("parentId") == null || "".equals(param.get("parentId"))) {
			param.put("type", "menu");
		}
		int page = Integer.parseInt(param.get("page").toString());
		int rows = Integer.parseInt(param.get("rows").toString());
		param.put("start", (page - 1) * rows);
		param.put("rows", rows);
		GridView<Menu> gridView = null;
		try {
			gridView = new GridView<Menu>(menuService.list(param), menuService.count(param));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridView;
	}

	@RequestMapping("/service/menuList")
	@ResponseBody
	public List<Menu> menuList() {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("type", "menu");
			// 查询第一级菜单
			List<Menu> menus = menuService.list(param);
			// 查询第二级菜单
			for (Menu menu : menus) {
				param.put("type", "item");
				param.put("parentId", menu.getId());
				List<Menu> values = menuService.list(param);
				menu.setChildren(values);
			}
			return menus;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 树节点查询
	 * 
	 * @param param
	 *            前台相关参数
	 * @return 当前页面记录
	 */
	@RequestMapping("/service/tree")
	@ResponseBody
	public List<TreeModel<Menu>> tree(@RequestParam Map<String, Object> param) {
		try {
			if (null == param.get("id")) {
				List<TreeModel<Menu>> list = new ArrayList<TreeModel<Menu>>();
				TreeModel<Menu> tree = new TreeModel<Menu>();
				list.add(tree);
				tree.setText("系统菜单");
				tree.setState("open");

				List<TreeModel<Menu>> children = new ArrayList<TreeModel<Menu>>();
				param.put("type", "menu");
				List<Menu> menuList = menuService.list(param);
				for (Menu menu : menuList) {
					TreeModel<Menu> subTree = new TreeModel<Menu>();
					subTree.setId(menu.getId());
					subTree.setText(menu.getTitle());
					subTree.setState("closed");
					children.add(subTree);
				}
				tree.setChildren(children);
				return list;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 新增记录
	 * 
	 * @param consumeDetails
	 * @return
	 */
	@RequestMapping("/service/add")
	@ResponseBody
	public Menu add(Menu menu) {
		try {
			menu.setId(menu.getParentId() + menu.getCode());
			menuService.insert(menu);
			return menu;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 更新记录
	 * 
	 * @param consumeType
	 * @return
	 */
	@RequestMapping("/service/update")
	@ResponseBody
	public Menu update(Menu menu) {
		try {
			if (menuService.update(menu)) {
				return menu;
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
			flag = menuService.delete(ids);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 判断编码是否合法
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/checkCode")
	@ResponseBody
	public List<Menu> checkCode(@RequestParam Map<String, Object> param) {
		try {
			return menuService.list(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
