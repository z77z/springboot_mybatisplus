package io.z77z.test;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.types.RedisClientInfo;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import redis.clients.jedis.Client;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import io.z77z.Application;
import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.RedisInfoDetail;
import io.z77z.service.BeautifulPicturesService;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)

public class RedisTest {

	@Autowired
	StringRedisTemplate stringRedisTemplate;
	
	@Autowired
	BeautifulPicturesService beautifulPicturesService;
	
	@Autowired
	RedisTemplate redisTemplate;
	
	@Autowired
	JedisPool jedisPool;
	
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

	// 按时间计数 
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
	
	// 使用hashs存储获取对象
	@Test
	public void test5(){
		BeautifulPictures beautifulPictures = beautifulPicturesService.selectById(1);
		HashOperations<String, Object, BeautifulPictures> hash = redisTemplate.opsForHash();
		hash.put("test5",beautifulPictures.getId(),beautifulPictures);
		System.out.println(hash.get("test5", beautifulPictures.getId()));
	}
	
	//使用lists存储读取 有序
	@Test
	public void test6(){
		ListOperations<String, String> list = stringRedisTemplate.opsForList();
		list.leftPush("test6", "1");
		list.leftPush("test6", "2");
		list.leftPush("test6", "3");
		list.leftPush("test6", "4");
		list.leftPush("test6", "5");
		list.leftPush("test6", "6");
		list.leftPush("test6", "7");
		//保持链表只有3位
		list.trim("test6", 0, 2);
		System.out.println(list.range("test6", 0, list.size("test6")-1));
	}
	
	//使用set存储读取  无序 去重  求差集，交集，并集
	@Test
	public void test7(){
		SetOperations<String, String> set = stringRedisTemplate.opsForSet();
		set.add("test7_1", "2", "1","2","3","4","4","3");
		set.add("test7_2", "2", "6","2","3","7","6","5");
		System.out.println("全部成员"+set.members("test7_1"));
		System.out.println("差集"+set.difference("test7_1", "test7_2"));
		System.out.println("交集"+set.intersect("test7_1", "test7_2"));
		System.out.println("并集"+set.union("test7_1", "test7_2"));
	}
	
	//Sorted Set 存取数据 排序   保存时多一个权重参数score，相当于按照此参数来排序
	@Test
	public void test8(){
		ZSetOperations<String, String> zSet = stringRedisTemplate.opsForZSet();
		zSet.add("test8", "use1", 9);
		zSet.add("test8", "use2", 1);
		zSet.add("test8", "use3", 5);
		zSet.add("test8", "use4", 9);
		//对应的score值增加
		//zSet.incrementScore("test8", "use1", 1);
		System.out.println(zSet.reverseRange("test8", 0, zSet.size("test8")-1));
	}
	
	//获取redis监控信息
	@Test
	public void test9(){
		List<RedisClientInfo> infoList = stringRedisTemplate.getClientList();
		for(RedisClientInfo info : infoList){
			System.out.println(info);
		}
		Jedis jedis = jedisPool.getResource();
		//TODO 获取redis服务器信息
		Client client = jedis.getClient();
		client.info();
		String info = client.getBulkReply();
		System.out.println(info);
		List<RedisInfoDetail> ridList = new ArrayList<RedisInfoDetail>();
		String[] strs = info.split("\n");
		RedisInfoDetail rif = null;
		if(strs != null && strs.length > 0){
			for (int i = 0; i < strs.length; i++) {
				rif = new RedisInfoDetail();
				String s = strs[i];
				String[] str = s.split(":");
				if(str != null && str.length > 1 ) {
					String key = str[0];
					String value = str[1];
					rif.setKey(key);
					rif.setValue(value);
					ridList.add(rif);
				}
			}
		}
		for(RedisInfoDetail redisInfoDetail : ridList){
			System.out.println(redisInfoDetail);
		}
		
	}
	
}
