package io.z77z.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import io.z77z.entity.Operate;
import io.z77z.entity.RedisInfoDetail;
import io.z77z.service.RedisService;
import redis.clients.jedis.Client;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * redis监控页面Controller
 * 
 * @author 作者: z77z
 * @date 创建时间：2017年2月10日 下午1:32:02
 */
@Controller
public class RedisController {
	
	@Autowired
	RedisService redisService;
	
	//跳转到监控页面
	@RequestMapping(value="redisMonitor")
	public String redisMonitor(Model model) {
		//获取redis的info
		List<RedisInfoDetail> ridList = redisService.getRedisInfo();
		//获取redis的日志记录
		List<Operate> logList = redisService.getLogs(100);
		//获取日志总数
		model.addAttribute("infoList", ridList);
		model.addAttribute("logList", logList);
		return "redisMonitor";
	}
}
