package io.z77z.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;

import io.z77z.entity.BeautifulPictures;
import io.z77z.service.BeautifulPicturesService;



/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author z77z
 * @since 2017-01-21
 */
@Controller
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	BeautifulPicturesService beautifulPicturesService;
	
	@RequestMapping("/test1")  
    public String view(Model model,Page<BeautifulPictures> page) {
		Page<BeautifulPictures> pageList= beautifulPicturesService.selectPage(page);
		model.addAttribute("user",JSON.toJSONString(pageList.getRecords()));
        return "index";
    }
}
