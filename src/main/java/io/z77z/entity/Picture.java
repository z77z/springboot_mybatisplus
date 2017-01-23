package io.z77z.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import java.io.Serializable;


/**
 * <p>
 * 
 * </p>
 *
 * @author z77z
 * @since 2017-01-22
 */
public class Picture extends Model<Picture> {

    private static final long serialVersionUID = 1L;

    /**
     * 每张图片的地址
     */
	private String id;
	@TableField("pictures_id")
	private String picturesId;
	private String url;


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPicturesId() {
		return picturesId;
	}

	public void setPicturesId(String picturesId) {
		this.picturesId = picturesId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

}
