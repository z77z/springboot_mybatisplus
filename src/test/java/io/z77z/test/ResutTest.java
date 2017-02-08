package io.z77z.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.Picture;
import io.z77z.service.PictureService;

@RunWith(SpringJUnit4ClassRunner.class)   //1.
@SpringBootTest(classes = Application.class, webEnvironment=WebEnvironment.RANDOM_PORT )   // 2.SpringBoot入口类,配置起server随机端口
public class ResutTest {
    
    @Autowired
    PictureService pictureService;
    
    @Test
    public void postTest(){
    	Picture picture = new Picture();
    	picture.setUrl("123123123");
    	System.out.println(pictureService.insert(picture));
    }
}


