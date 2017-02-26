package io.z77z.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import io.z77z.shiro.ShiroService;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * shiro权限控制测试Controller
 * 
 * @author 作者: z77z
 * @date 创建时间：2017年2月10日 下午1:32:02
 */
@Controller
public class LoginController {
	
	@Autowired
	ShiroService shiroService;

	@RequestMapping(value="index")
	public String index() {
		return "index";
	}

	@RequestMapping(value="login")
	public String login() {
		return "login";
	}


	@RequestMapping(value="add")
	public String add() {
		return "add";
	}
	
	@RequestMapping(value="403")
	public String noPermissions() {
		return "403";
	}
	
	@RequestMapping(value="updatePermission")
	@ResponseBody
	public String updatePermission() {
		shiroService.updatePermission();
		return "true";
	}
	
	
	/**
	 * ajax登录请求
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value="ajaxLogin",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> submitLogin(String username, String password,Boolean rememberMe,Model model) {
		Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
		try {
			UsernamePasswordToken token = new UsernamePasswordToken(username, password,rememberMe);
			SecurityUtils.getSubject().login(token);
			resultMap.put("status", 200);
			resultMap.put("message", "登录成功");

		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", e.getMessage());
		}
		return resultMap;
	}
	
	/**
	 * 退出
	 * @return
	 */
	@RequestMapping(value="logout",method =RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> logout(){
		Map<String, Object> resultMap = new LinkedHashMap<String, Object>();
		try {
			//退出
			SecurityUtils.getSubject().logout();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return resultMap;
	}
}
