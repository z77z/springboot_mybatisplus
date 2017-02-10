package io.z77z.util;

import java.util.Date;

import org.apache.ibatis.reflection.MetaObject;

import com.baomidou.mybatisplus.mapper.IMetaObjectHandler;

/** mybatisplus自定义填充公共字段 ,即没有传的字段自动填充*/
public class MyMetaObjectHandler implements IMetaObjectHandler {

	@Override
	public void insertFill(MetaObject metaObject) {
		Object last_update_date = metaObject.getValue("picturesId");
		if (null == last_update_date) {
			metaObject.setValue("picturesId", "haiqian");
		}
	}
}
