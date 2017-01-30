package io.z77z;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.Picture;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.service.PictureService;
import io.z77z.util.CrawlerUtil;

/**
 * springboot
 * 
 * @author z77z
 *
 */
// 扫描指定包下面的mapper接口
@MapperScan("io.z77z.dao")

// 该 @SpringBootApplication 注解等价于以默认属性使用:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan

@SpringBootApplication
@EnableCaching//开启缓存功能
public class Application extends SpringBootServletInitializer implements CommandLineRunner {
	
	@Autowired
	BeautifulPicturesService beautifulPicturesService;
	
	@Autowired
	PictureService pictureService;
	//入口
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	//Java EE应用服务器配置，
	//如果要使用tomcat来加载jsp的话就必须继承SpringBootServletInitializer类并且重写其中configure方法
	@Override
	protected SpringApplicationBuilder configure (SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
	//springboot运行后此方法首先被调用
	//实现CommandLineRunner抽象类中的run方法
	@Override
	public void run(String... args) throws Exception {
		/*//返回值
		int result = 1;
		//访问页码
		Integer page = 1;
		//启动爬虫
		System.out.println("爬虫开始工作！");
		while(result==1){
			result = crawler(page.toString());
			page+=1;
			if(result==0){
				System.out.println("爬虫运行结束！！");
			}
		}*/
	}
	
	public int crawler(String page){ 
		//初始化返回值
		int result = 1;
		//网站首页地址
		String homeUrl = "http://www.87g.com/";
		//接口地址
		String url = "http://www.87g.com/index.php?m=content&c=content_ajax&a=picture_page&siteid=1&catid=35&page="+page;
		System.out.println("当前爬取第"+ page +"页数据");
		//访问接口，
		JSONObject resultjson = CrawlerUtil.getReturnJson(url);
		if(resultjson!=null){
			//获取其value值
			Collection<Object> jsonList = resultjson.values();
				for(Object obj : jsonList){
					BeautifulPictures beautifulPictures = JSON.parseObject(obj.toString(), BeautifulPictures.class);
					String Keywords = beautifulPictures.getKeywords();
					//按map条件查询。判断是否已经爬过，没有就入库
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("keywords", Keywords);
					int cont = beautifulPicturesService.selectByMap(map).size();
					if(cont==0){
						//入库
						beautifulPicturesService.insert(beautifulPictures);
						//访问链接获取document，并保存里面的图片
						List<Picture> listPicture = CrawlerUtil.getArticleInfo(homeUrl+beautifulPictures.getUrl(),beautifulPictures);
						for(Picture picture : listPicture){
							//入库
							pictureService.insert(picture);
						}
					}else{
						System.out.println(homeUrl+beautifulPictures.getUrl()+"页面数据已经爬过了！！");
					}
				}
		}else{
			System.out.println("爬取到"+page+"页时没有数据了！！");
			result = 0;
		}
		return result;
	}
}
