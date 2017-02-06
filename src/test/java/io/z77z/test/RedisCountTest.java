package io.z77z.test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)

public class RedisCountTest {

	@Autowired
	StringRedisTemplate stringRedisTemplate;
	
	// 简单计数
	@Test
	public void test1() {
		try {
			ValueOperations<String, String> opsForValue = stringRedisTemplate.opsForValue();
			System.out.println(opsForValue.get("test1"));
			for (int i = 0; i < 100; i++) {
				opsForValue.increment("test1", 1);
			}
			System.out.println(opsForValue.get("test1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 按时间计数 将时间
	@Test
	public void test2() {
		String key = "test2_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		try {
			ValueOperations<String, String> opsForValue = stringRedisTemplate.opsForValue();
			System.out.println(opsForValue.get(key));
			for (int i = 0; i < 100; i++) {
				opsForValue.increment(key, 1);
			}
			System.out.println(opsForValue.get(key));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 模糊K值查询
	@Test
	public void test3() {
		try {
			ValueOperations<String, String> opsForValue = stringRedisTemplate.opsForValue();
			Set<String> keys = stringRedisTemplate.keys("test*");
			for (String a : keys) {
				System.out.println(a + ":" + opsForValue.get(a));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 设置key值的有效时间
	@Test
	public void test4() {
		try {
			ValueOperations<String, String> opsForValue = stringRedisTemplate.opsForValue();
			opsForValue.set("test4", "test4");
			System.out.println(opsForValue.get("test4"));
			// TimeUnit.SECONDS:解释定时参数的单位
			// MICROSECONDS 微秒 一百万分之一秒（就是毫秒/1000）
			// MILLISECONDS 毫秒 千分之一秒
			// NANOSECONDS 毫微秒 十亿分之一秒（就是微秒/1000）
			// SECONDS 秒
			// MINUTES 分钟
			// HOURS 小时
			// DAYS 天
			if(stringRedisTemplate.expire("test4", 5, TimeUnit.SECONDS)){
				System.out.println("设置过期时间成功,等待。。。。");
				Thread.sleep(5001);
			}
			System.out.println(opsForValue.get("test4"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
