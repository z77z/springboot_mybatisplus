package io.z77z.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.BeautifulPictures;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.util.RedisCache;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class RedisCacheTest {
	@Autowired
	BeautifulPicturesService beautifulPicturesService;

	@Autowired
	StringRedisTemplate stringRedisTemplate;
	
	@Autowired
	RedisCache redisCache;
	
	@Test
	public void redisTest() throws Exception {

		//保存字符串
		stringRedisTemplate.opsForValue().set("aaa", "111");
		//读取字符串
		String aaa = stringRedisTemplate.opsForValue().get("aaa");
		System.out.println(aaa);
	}
	
	@Test
	public void CacheTest() {
		String id = "1";
		BeautifulPictures beautifulPicture = redisCache.getBeautifulPicturesList(id);
		System.out.println("第一次查询结果：");
		System.out.println(beautifulPicture);

		BeautifulPictures beautifulPicture1 = redisCache.getBeautifulPicturesList(id);
		System.out.println("第二次查询结果：");
		System.out.println(beautifulPicture1);
		
		redisCache.updateBeautifulPicture(id);
		
		BeautifulPictures beautifulPicture2 = redisCache.getBeautifulPicturesList(id);
		System.out.println("第三次查询结果：");
		System.out.println(beautifulPicture2);
	}
}
