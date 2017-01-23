package io.z77z;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.Picture;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.service.PictureService;
import io.z77z.util.CrawlerUtil;

/**
 * 
 * 爬虫类
 * @author z77z
 *
 */
public class CrawlerMain{
	
	public static int crawler(String page, BeautifulPicturesService beautifulPicturesService, PictureService pictureService){ 
		//初始化返回值
		int result = 1;
		//网站首页地址
		String homeUrl = "http://www.87g.com/";
		//接口地址
		String url = "http://www.87g.com/index.php?m=content&c=content_ajax&a=picture_page&siteid=1&catid=35&page="+page;
		//访问接口，获取其value值
		Collection<Object> jsonList = CrawlerUtil.getReturnJson(url).values();
		if(jsonList.size()>0){
			for(Object obj : jsonList){
				BeautifulPictures beautifulPictures = JSON.parseObject(obj.toString(), BeautifulPictures.class);
				String Keywords = beautifulPictures.getKeywords();
				//按map条件查询。判断是否已经爬过，没有就入库
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("keywords", Keywords);
				int cont = beautifulPicturesService.selectByMap(map).size();
				if(cont==0){
					//入库
					beautifulPictures.insert();
					//访问链接获取document，并保存里面的图片
					List<Picture> listPicture = CrawlerUtil.getArticleInfo(homeUrl+beautifulPictures.getUrl(),beautifulPictures);
					for(Picture picture : listPicture){
						//入库
						pictureService.insert(picture);
					}
				}
			}
		}else{
			result = 0;
		}
		return result;
	}
}
