package io.z77z.controller;

import io.z77z.shiro.ShiroToken;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * shiro权限控制测试Controller
 * 
 * @author 作者: z77z
 * @date 创建时间：2017年2月10日 下午1:32:02
 */
@Controller
public class ShiroTest {

	@RequestMapping("/index")
	public String index() {

		return "index";
	}

	@RequestMapping("/login")
	public String login(String msg,Model model) {
		model.addAttribute("msg", msg);
		return "login";
	}

	@RequestMapping("/submitLogin")
	public String submitLogin(String username, String password,Model model) {
		try {
			ShiroToken token = new ShiroToken(username, password);
			SecurityUtils.getSubject().login(token);

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return "redirect:/index";
	}
}
