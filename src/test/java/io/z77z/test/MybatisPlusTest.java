package io.z77z.test;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.Picture;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.service.PictureService;

import com.baomidou.mybatisplus.plugins.Page;
@RunWith(SpringJUnit4ClassRunner.class)   //1.
@SpringBootTest(classes = Application.class, webEnvironment=WebEnvironment.RANDOM_PORT )   // 2.SpringBoot入口类,配置起server随机端口
public class MybatisPlusTest {
    
    @Autowired
    BeautifulPicturesService beautifulPicturesService;
    
    @Autowired
    PictureService pictureService;
    
    //分页测试
    @Test
    public void pageTest(){
    	Page<BeautifulPictures> page = new Page<BeautifulPictures>(2,10);
    	Page<BeautifulPictures> pageList= beautifulPicturesService.selectPage(page);
		List<BeautifulPictures> list = pageList.getRecords();
		for(BeautifulPictures beautifulPicture : list){
			System.out.println(beautifulPicture.toString());
		}
    }
    
    //公共字段自动填充
    //1.在mybatisplus的配置文件中公共字段生成类的bean
    //2.实现IMetaObjectHandler类
    @Test
    public void publicTest(){
    	Picture picture = new Picture();
    	picture.setUrl("321321");
    	picture.setId("bbb8cc55aeff4fd88411c15e15bb9c02");
    	System.out.println(pictureService.updateById(picture));
    }
}


