package io.z77z.entity;

import java.util.List;

import com.baomidou.mybatisplus.plugins.Page;

/**
 * 
 * 由此对象将page对象转换成json对象，传到前台处理
 * @author z77z
 * 由于jqgrid框架定义的page对象里面的字段和mybatisplus的不一样
 * 所以这个由这个中间对象来转换
 * @param <T>
 */
public class CustomPage<T>{
	
	//当前页数
	private int page;
	
	//每页显示数量
	private int pagesize;
	
	//总条数
	private int records;
	
	//数据列表
	private List<T> rows;
	
	//总页数
	private int total;
	
	//排序字段
	private String orderByField;
	
	//是否升序
	private boolean isAsc;
 	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPagesize() {
		return pagesize;
	}

	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}

	public int getRecords() {
		return records;
	}

	public void setRecords(int records) {
		this.records = records;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public String getOrderByField() {
		return orderByField;
	}

	public void setOrderByField(String orderByField) {
		this.orderByField = orderByField;
	}

	public boolean isAsc() {
		return isAsc;
	}

	public void setAsc(boolean isAsc) {
		this.isAsc = isAsc;
	}

	public CustomPage(){}
	
	public CustomPage(Page<T> page){
		this.page = page.getCurrent();
		this.pagesize = page.getSize();
		this.records = page.getTotal();
		this.rows = page.getRecords();
		this.total = page.getPages();
		this.orderByField = page.getOrderByField();
		this.isAsc = page.isAsc();
	}
}
