package io.z77z.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;

import io.z77z.service.RedisService;

/**
 * <p>
 *  api控制器
 * </p>
 *
 * @author z77z
 * @since 2017-05-6
 */
@RestController
@RequestMapping("/api/test")
public class TestApiController {
	
	@Autowired
	RedisService redisService;
	
	@RequestMapping("/test1")
	public String view() {
		return JSON.toJSONString(redisService.getRedisInfo());
    }
}
