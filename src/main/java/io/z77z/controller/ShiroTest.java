package io.z77z.controller;

import javax.servlet.http.HttpServletRequest;

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
	public String login() {

		return "login";
	}

	@RequestMapping("/submitLogin")
	public String submitLogin(String username, String password,HttpServletRequest Request) {
		try {
			ShiroToken token = new ShiroToken(username, password);
			SecurityUtils.getSubject().login(token);

		} catch (Exception e) {
			System.out.println("mimacuowu");
			Request.setAttribute("msg", "mimacuowu");
		}
		return "redirect:/index";
	}
}
