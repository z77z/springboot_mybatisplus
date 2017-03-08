package io.z77z.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 角色管理Controller
 * 
 * @author 作者: z77z
 * @date 创建时间：2017年3月8日 下午1:32:02
 */
@Controller
public class RoleController {
	
	//跳转到role管理页面
	@RequestMapping(value="role")
	public String role() {
		return "role/role";
	}
	
	//获取角色分页对象
	@RequestMapping(value="GetListWithPager")
	@ResponseBody
	public String GetListWithPager() {
		
		
		return "role/role";
	}
}
