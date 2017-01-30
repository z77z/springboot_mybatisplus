package io.z77z.service;

import io.z77z.entity.BeautifulPictures;
import io.z77z.dao.BeautifulPicturesMapper;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *这个类在继承了ServiceImpl之后，会有相应的增删改查以及分页的相关方法
 *敏捷开发
 * @author z77z
 * @since 2017-01-21
 */
@Service
public class BeautifulPicturesService extends ServiceImpl<BeautifulPicturesMapper, BeautifulPictures> {
	
}
