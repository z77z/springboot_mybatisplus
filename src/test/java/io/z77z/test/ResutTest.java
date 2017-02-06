package io.z77z.test;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.Picture;
import io.z77z.service.PictureService;

import com.jayway.restassured.RestAssured;
@RunWith(SpringJUnit4ClassRunner.class)   //1.
@SpringBootTest(classes = Application.class, webEnvironment=WebEnvironment.RANDOM_PORT )   // 2.SpringBoot入口类,配置起server随机端口
public class ResutTest {

	@Value("${local.server.port}")   //3获取springboot容器中配置文件中的值
    int port;

    @Before
    public void doBefore(){
        RestAssured.port = port;//4: 告诉restAssured使用哪个端口来访问
    }
    
    @Autowired
    PictureService pictureService;
    
    @Test
    public void postTest(){
    	Picture picture = new Picture();
    	picture.setUrl("123123123");
    	for(int i = 0 ; i<100 ; i++){
    		System.out.println(pictureService.insert(picture));
    	}
    }
}


