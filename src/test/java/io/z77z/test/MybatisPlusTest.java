package io.z77z.test;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.Picture;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.service.PictureService;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.plugins.Page;
import com.jayway.restassured.RestAssured;
@RunWith(SpringJUnit4ClassRunner.class)   //1.
@SpringBootTest(classes = Application.class, webEnvironment=WebEnvironment.RANDOM_PORT )   // 2.SpringBoot入口类,配置起server随机端口
public class MybatisPlusTest {

	@Value("${local.server.port}")   //3获取springboot容器中配置文件中的值
    int port;

    @Before
    public void doBefore(){
        RestAssured.port = port;//4: 告诉restAssured使用哪个端口来访问
    }
    
    @Autowired
    BeautifulPicturesService beautifulPicturesService;
    
    @Test
    public void pageTest(){
    	Page<BeautifulPictures> page = new Page<BeautifulPictures>(2,10);
    	Page<BeautifulPictures> pageList= beautifulPicturesService.selectPage(page);
		List<BeautifulPictures> list = pageList.getRecords();
		for(BeautifulPictures beautifulPicture : list){
			System.out.println(beautifulPicture.toString());
		}
    }
}


