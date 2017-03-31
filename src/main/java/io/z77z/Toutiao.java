package io.z77z;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import io.z77z.entity.Jobs;
import io.z77z.util.CrawlerUtil;

public class Toutiao {
	public static void main(String[] args) {
		// 查詢關鍵字
		String kd = "java";
		// 查詢第幾頁
		int pn = 2;
		run(pn,kd);
	}

	public static void run(int pn,String kd) {
		// 訪問接口
//		JSONObject resultjson = CrawlerUtil.getReturnJson(URL);
//		System.out.println(resultjson.get("content"));
		String json = CrawlerUtil.sendPost("https://www.lagou.com/jobs/positionAjax.json?", "pn="+pn+"&kd="+kd);
		JSONObject content = (JSONObject) JSONObject.parseObject(json).get("content");
		JSONObject positionResult = (JSONObject)content.get("positionResult");
		Integer totalCount = (Integer)positionResult.get("totalCount");
		System.out.println(totalCount);
		JSONArray jsonArray = (JSONArray)positionResult.get("result");
		for(Object Object : jsonArray){
			Jobs jobs = JSON.parseObject(Object.toString(), Jobs.class);
			System.out.println(jobs);
		}
	}
}
