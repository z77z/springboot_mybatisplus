package io.z77z;

import io.z77z.util.CrawlerUtil;

import java.io.IOException;

import com.alibaba.fastjson.JSONObject;

public class Toutiao {
	public static void main(String[] args) throws IOException {	
		//拉鉤網的查詢接口
		String api = "http://www.lagou.com/jobs/positionAjax.json";
		//查詢城市   不穿為搜索全部
		String city = "成都";
		//查詢關鍵字
		String kd = "java";
		//查詢第幾頁
		int pn = 2;
		//查詢總頁數
		int page = 1;
		//請求鏈接
		String URL = api+"?city="+city+"&kd="+kd+"&pn="+(pn++)+"&first=false";
		run(URL);
		
	}
	public static void run(String URL){
		//訪問接口
		JSONObject resultjson = CrawlerUtil.getReturnJson(URL);
		System.out.println(resultjson.get("content"));
	}
}
