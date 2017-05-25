package io.z77z.tio.body;

public class P2PReqBody {
	// 消息内容，必填
	private String text;

	// 发消息给谁，在鉴权过程中，为了减少showcase的代码量，我们已经假设了loginname = userid
	private String toUserid;

	/**
	 * 
	 * @author: tanyaowu
	 */
	public P2PReqBody() {

	}

	/**
	 * @param args
	 *
	 * @author: tanyaowu
	 */
	public static void main(String[] args) {

	}

	/**
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @return the toUserid
	 */
	public String getToUserid() {
		return toUserid;
	}

	/**
	 * @param toUserid
	 *            the toUserid to set
	 */
	public void setToUserid(String toUserid) {
		this.toUserid = toUserid;
	}
}
