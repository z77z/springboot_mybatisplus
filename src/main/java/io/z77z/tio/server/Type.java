package io.z77z.tio.server;

public interface Type {

	/**
	 * 登录消息请求
	 */
	byte LOGIN_REQ = 1;
	/**
	 * 登录消息响应
	 */
	byte LOGIN_RESP = 2;

	/**
	 * 进入群组消息请求
	 */
	byte JOIN_GROUP_REQ = 3;
	/**
	 * 进入群组消息响应
	 */
	byte JOIN_GROUP_RESP = 4;

	/**
	 * 点对点消息请求
	 */
	byte P2P_REQ = 5;
	/**
	 * 点对点消息响应
	 */
	byte P2P_RESP = 6;

	/**
	 * 群聊消息请求
	 */
	byte GROUP_MSG_REQ = 7;
	/**
	 * 群聊消息响应
	 */
	byte GROUP_MSG_RESP = 8;
	/**
	 * 握手请求
	 */
	byte COMMAND_HANDSHAKE_REQ = 9;
	/**
	 * 握手响应
	 */
	byte COMMAND_HANDSHAKE_RESP = 10;
	/**
	 * 关闭请求
	 */
	byte COMMAND_CLOSE_REQ = 11;
	/**
	 * 心跳
	 */
	byte HEART_BEAT_REQ = 99;

}
