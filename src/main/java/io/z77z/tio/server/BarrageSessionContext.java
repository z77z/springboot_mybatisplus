package io.z77z.tio.server;

//一般生产项目中，都需要定义一个这样的SessionContext，用于保存连接的会话数据
public class BarrageSessionContext {
	
	/**
	 * 会话的token
	 */
	private String token = null;
	
	
	/**
	 * 会话的userId
	 */
	private String userid = null;
	
	/**
	 * 是否已经握过手
	 */
	private boolean isHandshaked = false;
	
	/**
	 * 是否是走了websocket协议
	 */
	private boolean isWebsocket = false;
	
	/**
	 * 
	 * @author: tanyaowu
	 */
	public BarrageSessionContext() {
	}

	/**
	 * @param args
	 * @author: tanyaowu
	 */
	public static void main(String[] args) {

	}

	/**
	 * @return the token
	 */
	public String getToken() {
		return token;
	}

	/**
	 * @param token
	 *            the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}

	/**
	 * @return the userid
	 */
	public String getUserid() {
		return userid;
	}

	/**
	 * @param userid
	 *            the userid to set
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	/**
	 * @return the isWebsocket
	 */
	public boolean isWebsocket()
	{
		return isWebsocket;
	}

	/**
	 * @param isWebsocket the isWebsocket to set
	 */
	public void setWebsocket(boolean isWebsocket)
	{
		this.isWebsocket = isWebsocket;
	}

	/**
	 * @return the isHandshaked
	 */
	public boolean isHandshaked()
	{
		return isHandshaked;
	}

	/**
	 * @param isHandshaked the isHandshaked to set
	 */
	public void setHandshaked(boolean isHandshaked)
	{
		this.isHandshaked = isHandshaked;
	}
}
