package io.z77z.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.entity.BeautifulPictures;
import io.z77z.service.BeautifulPicturesService;
/**
 * 缓存注解，测试缓存注解
 * @author z77z
 * 实际开发中缓存注解是加在servlet接口方法上的
 */
@Component
public class RedisCache {
	
	@Autowired
	BeautifulPicturesService beautifulPicturesService;
	
	//查询
	@Cacheable(value = "beautifulPictures")
	public BeautifulPictures getBeautifulPicturesList(String id) {
		return beautifulPicturesService.selectById(id);
	}
	
	public BeautifulPictures getBeautifulPicturesList1(String id) {
		return beautifulPicturesService.selectById(id);
	}
	
	//修改
	@CachePut(value = "beautifulPictures")
	public void updateBeautifulPicture(String id) {
		BeautifulPictures beautifulPictures = new BeautifulPictures();
		beautifulPictures.setTitle("Title被我修改了一下，哈哈");
		beautifulPictures.setId(id);
		beautifulPicturesService.updateById(beautifulPictures);
	}
}
