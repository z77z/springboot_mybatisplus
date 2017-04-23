package io.z77z.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.FieldStrategy;

import java.io.Serializable;


/**
 * <p>
 * 
 * </p>
 *
 * @author z77z
 * @since 2017-02-13
 */
@TableName("sys_user")
public class SysUser extends Model<SysUser> {

    private static final long serialVersionUID = 1L;

	private String id;
    /**
     * 用户昵称
     */
	private String nickname;
    /**
     * 邮箱|登录帐号
     */
	private String email;
    /**
     * 密码
     */
	private String pswd;
    /**
     * 最后登录时间
     */
	@TableField("last_login_time")
	private Date lastLoginTime;
    /**
     * 1:有效，0:禁止登录
     */
	private String status;
	/**
     * 最后修改人Id
     */
	@TableField(value="last_update_name_id",validate=FieldStrategy.IGNORED)
	private String lastUpdateNameId;
	/**
     * 创建人Id
     */
	@TableField(value="create_name_id")
	private String createNameId;
	/**
     * 最后修改时间
     */
	@TableField(value="last_update_time",validate=FieldStrategy.IGNORED)
	private Date lastUpdateTime;
	/**
     * 创建时间
     */
	@TableField(value="create_time")
	private Date createTime;
	
	public SysUser(){}
	
	public SysUser(SysUser user) {
		super();
		this.id = user.getId();
		this.nickname = user.getNickname();
		this.email = user.getEmail();
		this.pswd = user.getPswd();
		this.createTime = user.getCreateTime();
		this.lastLoginTime = user.getLastLoginTime();
		this.status = user.getStatus();
		this.createNameId = user.getCreateNameId();
		this.lastUpdateNameId = user.getLastUpdateNameId();
		this.lastUpdateTime = user.getLastUpdateTime();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPswd() {
		return pswd;
	}

	public void setPswd(String pswd) {
		this.pswd = pswd;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLastUpdateNameId() {
		return lastUpdateNameId;
	}

	public void setLastUpdateNameId(String lastUpdateNameId) {
		this.lastUpdateNameId = lastUpdateNameId;
	}

	public String getCreateNameId() {
		return createNameId;
	}

	public void setCreateNameId(String createNameId) {
		this.createNameId = createNameId;
	}

	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}
}
