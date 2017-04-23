package io.z77z.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.entity.CustomPage;
import io.z77z.entity.FrontPage;
import io.z77z.entity.SysRole;
import io.z77z.entity.SysUser;
import io.z77z.entity.UserOnlineBo;
import io.z77z.service.SysUserService;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author z77z
 * @since 2017-03-11
 */
@Controller
@RequestMapping(value = "user")
public class UserController {

	@Autowired
	SysUserService sysUserService;

	// 跳转到用户管理页面
	@RequestMapping(value = "userPage")
	public String userPage(String edit, Model modle) {
		// edit判断是否编辑成功
		modle.addAttribute("edit", edit);
		return "user/user";
	}

	// 跳轉到編輯頁面edit
	@RequestMapping(value = "editPage/{Id}")
	public String editPage(@PathVariable("Id") String Id, Model model) {
		if (Id.equals("add")) {
		} else {
			SysUser user = sysUserService.selectById(Id);
			model.addAttribute("user", user);
		}
		return "user/edit";
	}

	// 增加和修改
	@RequestMapping(value = "edit")
	public String edit(SysUser user,String isEffective, Model model) {
		if(isEffective==null||isEffective==""){
			user.setStatus("0");
		}else{
			user.setStatus("1");
		}
		if (sysUserService.insertOrUpdate(user)) {
			return "forward:userPage?edit=true";
		} else {
			return "forward:userPage?edit=false";
		}
	}

	// 用户列表分页json
	@RequestMapping(value = "getUserListWithPager")
	@ResponseBody
	public String getUserListWithPager(FrontPage<SysUser> page) {
		Wrapper<SysUser> wrapper = new EntityWrapper<SysUser>();
		String keyWords = page.getKeywords();
		if (keyWords != null && keyWords != "")
			wrapper.like("nickname", keyWords);
		Page<SysUser> pageList = sysUserService.selectPage(page.getPagePlus(), wrapper);
		CustomPage<SysUser> customPage = new CustomPage<SysUser>(pageList);
		return JSON.toJSONString(customPage);
	}

	// 刪除用户
	@RequestMapping(value = "delete")
	@ResponseBody
	public String delete(@RequestParam(value = "ids[]") String[] ids) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			sysUserService.deleteBatchIds(Arrays.asList(ids));
			resultMap.put("flag", true);
			resultMap.put("msg", "刪除成功！");
		} catch (Exception e) {
			resultMap.put("flag", false);
			resultMap.put("msg", e.getMessage());
		}
		return JSON.toJSONString(resultMap);
	}

	// 跳转到在线用户管理页面
	@RequestMapping(value = "onlineUserPage")
	public String onlineUserPage() {
		return "user/onlineUser";
	}

	// 在线用户列表json
	@RequestMapping(value = "onlineUsers")
	@ResponseBody
	public String OnlineUsers(FrontPage<UserOnlineBo> frontPage) {
		Page<UserOnlineBo> pageList = sysUserService.getPagePlus(frontPage);
		CustomPage<UserOnlineBo> customPage = new CustomPage<UserOnlineBo>(pageList);
		return JSON.toJSONString(customPage);
	}

	// 强制踢出用户
	@RequestMapping(value = "kickout")
	@ResponseBody
	public String kickout(@RequestParam(value = "ids[]") String[] ids) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			for (String sessionId : ids) {
				sysUserService.kickout(sessionId);
			}
			resultMap.put("flag", true);
			resultMap.put("msg", "强制踢出成功！");
		} catch (Exception e) {
			resultMap.put("flag", false);
			resultMap.put("msg", e.getMessage());
		}
		return JSON.toJSONString(resultMap);
	}
}
