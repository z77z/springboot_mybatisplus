package io.z77z.entity;

import java.io.Serializable;
import java.util.List;

public class Jobs implements Serializable{

	private static final long serialVersionUID = 1L;
	/**
	 * 公司信息
	 */
	//公司全称
	private String companyFullName;
	//公司简称
	private String companyShortName;
	//公司Id
	private String companyId;
	//公司标签
	private List<String> companyLabelList;
	//公司所在城市
	private String city;
	//公司所在区
	private String district;
	//要求学历
	private String education;
	//融资阶段
	private String financeStage;
	/**
	 * 职位信息
	 */
	
	//一级分类
	private String firstType;
	//二级分类
	private String secondType;
	//发布时间
	private String formatCreateTime;
	//所属行业
	private String industryField;
	//工作性质
	private String jobNature;
	//职位Id
	private String positionId;
	//职位优势
	private String positionAdvantage;
	//职位名称
	private String positionName;
	//职位标签
	private List<String> positionLables;
	//薪资范围
	private String salary;
	//要求工作年限
	private String workYear;
	
	public String getCompanyFullName() {
		return companyFullName;
	}
	public void setCompanyFullName(String companyFullName) {
		this.companyFullName = companyFullName;
	}
	public String getCompanyShortName() {
		return companyShortName;
	}
	public void setCompanyShortName(String companyShortName) {
		this.companyShortName = companyShortName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public List<String> getCompanyLabelList() {
		return companyLabelList;
	}
	public void setCompanyLabelList(List<String> companyLabelList) {
		this.companyLabelList = companyLabelList;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getFinanceStage() {
		return financeStage;
	}
	public void setFinanceStage(String financeStage) {
		this.financeStage = financeStage;
	}
	public String getFirstType() {
		return firstType;
	}
	public void setFirstType(String firstType) {
		this.firstType = firstType;
	}
	public String getSecondType() {
		return secondType;
	}
	public void setSecondType(String secondType) {
		this.secondType = secondType;
	}
	public String getFormatCreateTime() {
		return formatCreateTime;
	}
	public void setFormatCreateTime(String formatCreateTime) {
		this.formatCreateTime = formatCreateTime;
	}
	public String getIndustryField() {
		return industryField;
	}
	public void setIndustryField(String industryField) {
		this.industryField = industryField;
	}
	public String getJobNature() {
		return jobNature;
	}
	public void setJobNature(String jobNature) {
		this.jobNature = jobNature;
	}
	public String getPositionId() {
		return positionId;
	}
	public void setPositionId(String positionId) {
		this.positionId = positionId;
	}
	public String getPositionAdvantage() {
		return positionAdvantage;
	}
	public void setPositionAdvantage(String positionAdvantage) {
		this.positionAdvantage = positionAdvantage;
	}
	public String getPositionName() {
		return positionName;
	}
	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	public List<String> getPositionLables() {
		return positionLables;
	}
	public void setPositionLables(List<String> positionLables) {
		this.positionLables = positionLables;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getWorkYear() {
		return workYear;
	}
	public void setWorkYear(String workYear) {
		this.workYear = workYear;
	}
	@Override
	public String toString() {
		return "Jobs [companyFullName=" + companyFullName + ", companyShortName=" + companyShortName + ", companyId="
				+ companyId + ", companyLabelList=" + companyLabelList + ", city=" + city + ", district=" + district
				+ ", education=" + education + ", financeStage=" + financeStage + ", firstType=" + firstType
				+ ", secondType=" + secondType + ", formatCreateTime=" + formatCreateTime + ", industryField="
				+ industryField + ", jobNature=" + jobNature + ", positionId=" + positionId + ", positionAdvantage="
				+ positionAdvantage + ", positionName=" + positionName + ", positionLables=" + positionLables
				+ ", salary=" + salary + ", workYear=" + workYear + "]";
	}
}
