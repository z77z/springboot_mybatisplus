package io.z77z.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;

import io.z77z.entity.Operate;
import io.z77z.entity.RedisInfoDetail;
import io.z77z.util.RedisUtil;
import redis.clients.util.Slowlog;

@Service
public class RedisService {
	
	@Autowired
	RedisUtil redisUtil;
	
	public List<RedisInfoDetail> getRedisInfo() {
		//获取redis服务器信息
		String info = redisUtil.getRedisInfo();
		List<RedisInfoDetail> ridList = new ArrayList<RedisInfoDetail>();
		String[] strs = info.split("\n");
		RedisInfoDetail rif = null;
		if (strs != null && strs.length > 0) {
			for (int i = 0; i < strs.length; i++) {
				rif = new RedisInfoDetail();
				String s = strs[i];
				String[] str = s.split(":");
				if (str != null && str.length > 1) {
					String key = str[0];
					String value = str[1];
					rif.setKey(key);
					rif.setValue(value);
					ridList.add(rif);
				}
			}
		}
		return ridList;
	}
	
	//获取redis日志列表
	public List<Operate> getLogs(long entries) {
        List<Slowlog> list = redisUtil.getLogs(entries);
		List<Operate> opList = null;
		Operate op  = null;
		boolean flag = false;
		if (list != null && list.size() > 0) {
			opList = new LinkedList<Operate>();
			for (Slowlog sl : list) {
				String args = JSON.toJSONString(sl.getArgs());
				if (args.equals("[\"PING\"]") || args.equals("[\"SLOWLOG\",\"get\"]") || args.equals("[\"DBSIZE\"]") || args.equals("[\"INFO\"]")) {
					continue;
				}	
				op = new Operate();
				flag = true;
				op.setId(sl.getId());
				op.setCreateTime(getDateStr());
				op.setExecuteTime(getDateStr(sl.getTimeStamp() * 1000));
				op.setUsedTime(sl.getExecutionTime()/1000.0 + "ms");
				op.setArgs(args);
				
				opList.add(op);
			}
		} 
		if (flag) 
			return opList;
		else 
			return null;
	}
	//获取日志总数
	public Long getLogLen() {
		return redisUtil.getLogsLen();
	}
	
	private String getDateStr() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dateFormat.format(new Date());
	}
	private String getDateStr(long timeStmp) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dateFormat.format(new Date(timeStmp));
	}

	
}
