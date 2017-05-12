package com.zachary.finance.controller;

import java.util.ArrayList;
import java.util.HashMap;
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

import com.zachary.finance.model.ConsumeType;
import com.zachary.finance.service.IConsumeTypeService;
import com.zachary.system.model.GridView;
import com.zachary.system.model.TreeModel;

@Controller
@RequestMapping("/consumeType")
public class ConsumeTypeController {
	@Resource
	private IConsumeTypeService consumeTypeService;

	/**
	 * 页面跳转
	 * 
	 * @param id
	 * @param param
	 * @param model
	 * @return
	 */
	@RequestMapping("/view/{id}")
	public String doView(@PathVariable String id, @RequestParam Map<String, Object> param, Model model) {
		if ("index".equals(id)) {
			return "/consumeType/" + id;
		} else if ("consumeDetail".equals(id)) {
			model.addAttribute("consumeId", param.get("id").toString());
		}
		return "/consumeType/view/" + id;
	}

	/**
	 * 查询列表
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/page")
	@ResponseBody
	public GridView<ConsumeType> page(@RequestParam Map<String, Object> param) {
		int page = Integer.parseInt(param.get("page").toString());
		int rows = Integer.parseInt(param.get("rows").toString());
		param.put("start", (page - 1) * rows);
		param.put("rows", rows);
		GridView<ConsumeType> gridView = null;
		try {
			gridView = new GridView<ConsumeType>(consumeTypeService.list(param), consumeTypeService.count(param));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridView;
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
	public List<TreeModel<ConsumeType>> tree(@RequestParam Map<String, Object> param) {
		List<TreeModel<ConsumeType>> list = null;
		TreeModel<ConsumeType> tree = null;
		try {
			list = new ArrayList<TreeModel<ConsumeType>>();
			if (null == param.get("id")) {
				tree = new TreeModel<ConsumeType>();
				list.add(tree);
				tree.setId("XFLB");
				tree.setText("消费类别");
				tree.setState("closed");
				return list;
			} else {
				List<ConsumeType> typeList = consumeTypeService.list(param);
				for (ConsumeType type : typeList) {
					tree = new TreeModel<ConsumeType>();
					tree.setId(type.getId());
					tree.setText(type.getName());
					tree.setState("closed");
					list.add(tree);
				}
				return list;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/**
	 * 新增记录
	 * 
	 * @param consumeType
	 * @return
	 */
	@RequestMapping("/service/add")
	@ResponseBody
	public ConsumeType add(ConsumeType consumeType) {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("code", consumeType.getCode());
			param.put("id", consumeType.getParentId());
			List<ConsumeType> list = consumeTypeService.list(param);
			if (list.size() == 0) {
				consumeType.setCode(consumeType.getCode().toUpperCase());
				consumeType.setId(consumeType.getParentId() + consumeType.getCode());
				if (consumeTypeService.insert(consumeType)) {
					return consumeType;
				}
			}
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
	public ConsumeType update(ConsumeType consumeType) {
		try {
			if (consumeTypeService.update(consumeType)) {
				return consumeType;
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
			flag = consumeTypeService.delete(ids);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
}
