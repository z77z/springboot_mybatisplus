package io.z77z;

import java.io.IOException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Toutiao {
	public static void main(String[] args) throws IOException {
		Connection connect = Jsoup.connect("https://www.lagou.com/zhaopin/Java/2/");
		Document document = connect.get();
		Element article = document.getElementById("s_position_list");
		Elements lis = article.getElementsByTag("li");
		for (Element e : lis) {
			System.out.println("``````````````````````````````````````");
			System.out.println("職位："+e.getElementsByTag("h2").html());
			System.out.println("公司地址："+e.getElementsByTag("em").html());
			System.out.println("公司名："+e.getElementsByTag("a").get(1).html());
			System.out.println("工資："+e.getElementsByTag("span").get(2).html());
			System.out.println("公司福利："+e.getElementsByClass("li_b_r").html());
			System.out.println("公司定位：："+e.getElementsByClass("industry").html());
			System.out.println("職位信息鏈接："+e.getElementsByTag("a").get(0).attr("href"));
			System.out.println("公司信息鏈接："+e.getElementsByTag("a").get(1).attr("href"));
		}
	}
}
