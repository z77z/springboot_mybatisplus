package io.z77z.test;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.z77z.Application;
import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.CustomPage;
import io.z77z.entity.Picture;
import io.z77z.entity.SysPermissionInit;
import io.z77z.service.BeautifulPicturesService;
import io.z77z.service.PictureService;
import io.z77z.service.SysPermissionInitService;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
@RunWith(SpringJUnit4ClassRunner.class)   //1.
@SpringBootTest(classes = Application.class, webEnvironment=WebEnvironment.RANDOM_PORT )   // 2.SpringBoot入口类,配置起server随机端口
public class MybatisPlusTest {
    
    @Autowired
    BeautifulPicturesService beautifulPicturesService;
    
    @Autowired
    PictureService pictureService;
    
    @Autowired
	SysPermissionInitService sysPermissionInitService;
    
    //分页测试
    @Test
    public void pageTest(){
    	CustomPage<BeautifulPictures> customPage = new CustomPage<BeautifulPictures>();
    	customPage.setPage(1);
    	customPage.setPagesize(10);
    	customPage.setAsc(false);
    	customPage.setOrderByField("biaoqian");
    	Page<BeautifulPictures> pageList= beautifulPicturesService.selectPage(customPage.PagePlus());
		List<BeautifulPictures> list = pageList.getRecords();
		for(BeautifulPictures beautifulPicture : list){
			System.out.println(beautifulPicture.toString());
		}
		CustomPage<BeautifulPictures> customPage1 = new CustomPage<BeautifulPictures>(pageList);
		System.out.println(JSON.toJSONString(customPage1));
		
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
    
    @Test
    public void wrapperTest(){
    	EntityWrapper<SysPermissionInit> wrapper =new EntityWrapper<SysPermissionInit>();
    	wrapper.setEntity(new SysPermissionInit());
    	wrapper.setSqlSelect("*");
    	wrapper.where("name={0}", "'zhangsan'").and("id=1")
        .orNew("status={0}", "0").or("status=1")
        .notLike("nlike", "notvalue")
        .andNew("new=xx").like("hhh", "ddd")
        .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
        .groupBy("x1").groupBy("x2,x3")
        .having("x1=11").having("x3=433")
        .orderBy("dd").orderBy("d1,d2");
    	System.out.println(wrapper);
    }
}


