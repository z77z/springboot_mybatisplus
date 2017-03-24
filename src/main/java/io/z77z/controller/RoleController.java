package io.z77z.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	//跳轉到編輯頁面edit
	@RequestMapping(value="edit/{Id}")
	public String edit(@PathVariable("Id") String Id,Model model) {
		SysRole role = sysRoleService.selectById(Id);
		model.addAttribute("role", role);
		return "role/edit";
	}
	
	
	//刪除
	@RequestMapping(value="delete")
	@ResponseBody
	public String delete(@RequestParam(value = "ids[]") String[] ids) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			sysRoleService.deleteBatchIds(Arrays.asList(ids));
			resultMap.put("flag", true);
			resultMap.put("msg", "刪除成功！");
		} catch (Exception e) {
			resultMap.put("flag", false);
			resultMap.put("msg", e.getMessage());
		}
		return JSON.toJSONString(resultMap);
	}
}
