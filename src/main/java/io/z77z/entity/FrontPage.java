package io.z77z.entity;

import com.baomidou.mybatisplus.plugins.Page;

/**
 * 用来接收页面传过来的查询字段   对象
 * @author z77z
 * 
 */
public class FrontPage<T> {
	//是否是查询
	private boolean _search;
	
	//时间戳（毫秒）
	private String nd;
	
	//每页显示条数
	private int rows;
	
	//当前页数
	private int page;
	
	//排序的字段
	private String sidx;
	
	//排序方式 asc升序  desc降序
	private String sord;
	
	//搜索条件
	private String keywords;

	public boolean is_search() {
		return _search;
	}

	public void set_search(boolean _search) {
		this._search = _search;
	}

	public String getNd() {
		return nd;
	}

	public void setNd(String nd) {
		this.nd = nd;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}
	
	//获取mybatisPlus封装的Page对象
	public Page<T> getPagePlus(){
		Page<T> pagePlus = new Page<T>();
		pagePlus.setCurrent(this.page);
		pagePlus.setSize(this.rows);
		pagePlus.setAsc(this.sord.equals("asc"));
		pagePlus.setOrderByField(this.sidx);
		return pagePlus;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
}
