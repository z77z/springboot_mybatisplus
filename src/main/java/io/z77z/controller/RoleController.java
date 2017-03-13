package io.z77z.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.entity.CustomPage;
import io.z77z.entity.FrontPage;
import io.z77z.entity.SysRole;
import io.z77z.service.SysRoleService;

/**
 * 角色管理Controller
 * 
 * @author 作者: z77z
 * @date 创建时间：2017年3月8日 下午1:32:02
 */
@Controller
@RequestMapping(value="role")
public class RoleController {
	
	@Autowired
	SysRoleService sysRoleService;
	
	//跳转到role管理页面
	@RequestMapping(value="rolePage")
	public String role() {
		return "role/role";
	}
	
	//获取角色分页对象
	@RequestMapping(value="getRoleListWithPager")
	@ResponseBody
	public String getRoleListWithPager(FrontPage<SysRole> page) {
		Page<SysRole> pageList = sysRoleService.selectPage(page.getPagePlus());
		CustomPage<SysRole> customPage = new CustomPage<SysRole>(pageList);
		return JSON.toJSONString(customPage);
	}
}
