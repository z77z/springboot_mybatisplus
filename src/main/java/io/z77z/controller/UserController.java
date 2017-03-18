package io.z77z.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.entity.CustomPage;
import io.z77z.entity.FrontPage;
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

	// 跳转到role管理页面
	@RequestMapping(value = "onlineUserPage")
	public String onlineUserPage() {
		return "user/onlineUser";
	}

	@RequestMapping(value = "onlineUsers")
	@ResponseBody
	public String OnlineUsers(FrontPage<UserOnlineBo> frontPage) {
		Page<UserOnlineBo> pageList = sysUserService.getPagePlus(frontPage);
		CustomPage<UserOnlineBo> customPage = new CustomPage<UserOnlineBo>(pageList);
		return JSON.toJSONString(customPage);
	}
	
	//强制踢出用户
	@RequestMapping(value = "kickout")
	@ResponseBody
	public String kickout(@RequestParam(value = "ids[]") String[] ids) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			for(String sessionId : ids ){
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
