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

import com.zachary.finance.model.ConsumeDetail;
import com.zachary.finance.model.ConsumeRecord;
import com.zachary.finance.service.IConsumeDetailService;
import com.zachary.finance.service.IConsumeRecordService;
import com.zachary.system.model.GridView;

@Controller
@RequestMapping("/consumeDetail")
public class ConsumeDetailController {
	@Resource
	private IConsumeDetailService consumeDetailService;

	@Resource
	private IConsumeRecordService consumeRecordService;

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
	public GridView<ConsumeDetail> page(@RequestParam Map<String, Object> param) {
		int page = Integer.parseInt(param.get("page").toString());
		int rows = Integer.parseInt(param.get("rows").toString());
		param.put("start", (page - 1) * rows);
		param.put("rows", rows);
		GridView<ConsumeDetail> gridView = null;
		try {
			gridView = new GridView<ConsumeDetail>(consumeDetailService.list(param), consumeDetailService.count(param));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridView;
	}

	/**
	 * 新增记录
	 * 
	 * @param consumeDetails
	 * @return
	 */
	@RequestMapping("/service/add")
	@ResponseBody
	public ConsumeDetail add(@RequestBody List<ConsumeDetail> consumeDetails) {
		try {
			if (consumeDetailService.insert(consumeDetails.get(0))) {
				ConsumeRecord record = new ConsumeRecord();
				Map<String, Object> param = new HashMap<String, Object>();
				param.put("consumeId", consumeDetails.get(0).getConsumeId());
				record.setId(consumeDetails.get(0).getConsumeId());
				record.setConsumeAmount(consumeDetailService.calMoney(param));
				consumeRecordService.update(record);
				return consumeDetails.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 更新记录
	 * 
	 * @param consumeDetails
	 * @return
	 */
	@RequestMapping("/service/update")
	@ResponseBody
	public ConsumeDetail update(@RequestBody List<ConsumeDetail> consumeDetails) {
		try {
			if (consumeDetailService.update(consumeDetails.get(0))) {
				ConsumeRecord record = new ConsumeRecord();
				Map<String, Object> param = new HashMap<String, Object>();
				param.put("consumeId", consumeDetails.get(0).getConsumeId());
				record.setId(consumeDetails.get(0).getConsumeId());
				record.setConsumeAmount(consumeDetailService.calMoney(param));
				consumeRecordService.update(record);
				return consumeDetails.get(0);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 删除记录
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/remove")
	@ResponseBody
	public boolean remove(@RequestParam Map<String, Object> param) {
		try {
			if (consumeDetailService.deleteById(param.get("id").toString())) {
				ConsumeRecord record = new ConsumeRecord();
				record.setId(param.get("consumeId").toString());
				record.setConsumeAmount(consumeDetailService.calMoney(param));
				consumeRecordService.update(record);
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 计算总钱数
	 * 
	 * @param param
	 * @return
	 */
	@RequestMapping("/service/calMoney")
	@ResponseBody
	public Double calMoney(@RequestParam Map<String, Object> param) {
		Double amount = 0.0;
		try {
			amount = consumeDetailService.calMoney(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return amount;
	}
}
