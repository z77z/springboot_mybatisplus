package io.z77z.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.z77z.entity.BeautifulPictures;
import io.z77z.service.BeautifulPicturesService;
/**
 * 缓存注解
 * @author 7z
 *
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
	
	//修改
	@CachePut(value = "beautifulPictures")
	public void updateBeautifulPicture(String id) {
		BeautifulPictures beautifulPictures = new BeautifulPictures();
		beautifulPictures.setTitle("Title被我修改了一下，哈哈");
		beautifulPictures.setId(id);
		beautifulPicturesService.updateById(beautifulPictures);
	}
}
