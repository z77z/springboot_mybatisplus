package io.z77z.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.alibaba.fastjson.JSONObject;

import io.z77z.entity.BeautifulPictures;
import io.z77z.entity.Picture;

public class CrawlerUtil {
	// 访问接口，返回json封装的数据格式
	public static JSONObject getReturnJson(String url) {
		try {
			URL httpUrl = new URL(url);
			BufferedReader in = new BufferedReader(new InputStreamReader(httpUrl.openStream(), "UTF-8"));
			String line = null;
			String content = "";
			while ((line = in.readLine()) != null) {
				content += line;
			}
			in.close();
			char[] a = content.toCharArray();
			if(a[0]=='['&&a[1]==']'){
				return null;
			}else{
				System.out.println("获取接口数据成功！接口地址："+httpUrl);
				return JSONObject.parseObject(content);
			}
			
		} catch (Exception e) {
			System.err.println("接口访问失败:" + url);
			e.printStackTrace();
		}
		return null;
	}
	
	public static void saveToFile(String destUrl,String saveUrl) {
		FileOutputStream fos = null;
		BufferedInputStream bis = null;
		HttpURLConnection httpUrl = null;
		URL url = null;
		String uuid = UUID.randomUUID().toString();
		String fileAddress = uuid;// 存储本地文件地址
		int BUFFER_SIZE = 1024;
		byte[] buf = new byte[BUFFER_SIZE];
		int size = 0;
		try {
			url = new URL(destUrl);
			httpUrl = (HttpURLConnection) url.openConnection();
			httpUrl.connect();
			String Type = httpUrl.getHeaderField("Content-Type");
			if (Type.equals("image/gif")) {
				fileAddress += ".gif";
			} else if (Type.equals("image/png")) {
				fileAddress += ".png";
			} else if (Type.equals("image/jpeg")) {
				fileAddress += ".jpg";
			} else {
				System.err.println("未知图片格式");
				return;
			}
			bis = new BufferedInputStream(httpUrl.getInputStream());
			fos = new FileOutputStream(fileAddress);
			while ((size = bis.read(buf)) != -1) {
				fos.write(buf, 0, size);
			}
			fos.flush();
			System.out.println("图片保存成功！地址：" + fileAddress);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassCastException e) {
			e.printStackTrace();
		} finally {
			try {
				fos.close();
				bis.close();
				httpUrl.disconnect();
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NullPointerException e) {
				e.printStackTrace();
			}
		}
	}
}
