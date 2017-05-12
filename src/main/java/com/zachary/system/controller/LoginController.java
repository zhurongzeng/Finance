package com.zachary.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
	/**
	 * 用于跳转页面
	 */
	@RequestMapping("/{id}")
	public String doView(@PathVariable String id) {
		if ("index".equals(id)) {
			return id;
		}
		return null;
	}
}
