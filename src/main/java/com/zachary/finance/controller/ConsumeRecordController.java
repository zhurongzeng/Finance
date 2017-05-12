package com.zachary.finance.controller;

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

import com.zachary.finance.model.ConsumeRecord;
import com.zachary.finance.service.IConsumeRecordService;
import com.zachary.system.util.DateUtils;
import com.zachary.system.model.GridView;

@Controller
@RequestMapping("/consumeRecord")
public class ConsumeRecordController {
	@Resource
	private IConsumeRecordService consumeRecordService;

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
			return "/consumeRecord/" + id;
		} else if ("consumeDetail".equals(id)) {
			model.addAttribute("consumeId", param.get("id").toString());
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
	public GridView<ConsumeRecord> page(@RequestParam Map<String, Object> param) {
		int page = Integer.parseInt(param.get("page").toString());
		int rows = Integer.parseInt(param.get("rows").toString());
		param.put("start", (page - 1) * rows);
		param.put("rows", rows);
		GridView<ConsumeRecord> gridView = null;
		try {
			gridView = new GridView<ConsumeRecord>(consumeRecordService.list(param), consumeRecordService.count(param));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridView;
	}

	/**
	 * 新增记录
	 * 
	 * @param consumeRecord
	 * @return
	 */
	@RequestMapping("/service/add")
	@ResponseBody
	public ConsumeRecord add(ConsumeRecord consumeRecord) {
		try {
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("consumeDate", consumeRecord.getConsumeDate());
			List<ConsumeRecord> list = consumeRecordService.list(param);
			if (list.size() == 0) {
				consumeRecord.setCreatorId("admin");
				consumeRecord.setCreateTime(DateUtils.getDateTime());
				if (consumeRecordService.insert(consumeRecord)) {
					return consumeRecord;
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
	 * @param consumeRecord
	 * @return
	 */
	@RequestMapping("/service/update")
	@ResponseBody
	public ConsumeRecord update(ConsumeRecord consumeRecord) {
		try {
			if (consumeRecordService.update(consumeRecord)) {
				return consumeRecord;
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
			flag = consumeRecordService.delete(ids);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return flag;
	}
}
