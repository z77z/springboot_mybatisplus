package io.z77z.dao;

import java.util.List;

import io.z77z.entity.SysPermissionInit;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author z77z
 * @since 2017-02-16
 */
public interface SysPermissionInitMapper extends BaseMapper<SysPermissionInit> {

	List<SysPermissionInit> selectAll();

}