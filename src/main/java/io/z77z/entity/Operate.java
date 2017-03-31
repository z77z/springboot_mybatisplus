package io.z77z.entity;

public class Operate {
	private long id;
	private String createTime;
	private String executeTime;
	private String usedTime;
	private String args;
	
	public Operate() {}
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getExecuteTime() {
		return executeTime;
	}

	public void setExecuteTime(String executeTime) {
		this.executeTime = executeTime;
	}

	public String getUsedTime() {
		return usedTime;
	}

	public void setUsedTime(String usedTime) {
		this.usedTime = usedTime;
	}


	public String getArgs() {
		return args;
	}


	public void setArgs(String args) {
		this.args = args;
	}

	

}
