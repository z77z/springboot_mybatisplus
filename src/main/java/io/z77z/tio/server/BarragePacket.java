package io.z77z.tio.server;

import org.tio.core.intf.Packet;

public class BarragePacket extends Packet{

	public static final String CHARSET = "utf-8";
	/**
	 * 心跳字节
	 */
	public static final byte HEARTBEAT_BYTE = -128;
	
	/**
	 * 握手字节
	 */
	public static final byte HANDSHAKE_BYTE = -127;

	/**
	 * 协议版本号
	 */
	public final static byte VERSION = 1;

	/**
	 * 消息体最多为多少
	 */
	public static final int MAX_LENGTH_OF_BODY = (int) (1024 * 1024 * 2.1); //只支持多少M数据

	/**
	 * 消息头最少为多少个字节
	 */
	public static final int LEAST_HEADER_LENGHT = 9;//1+1+2 + (2+4)
	public BarragePacket()
	{
		super();
	}
	public BarragePacket(byte type, byte[] body)
	{
		super();
		this.type = type;
		this.body = body;
	}
	public BarragePacket(byte type)
	{
		super();
		this.type = type;
	}
	
	public BarragePacket(byte[] body)
	{
		super();
		this.body = body;
	}

	/**
	 * 消息类型，其值在org.tio.examples.showcase.common.Type中定义
	 */
	private byte type;

	private byte[] body;

	/**
	 * @return the body
	 */
	public byte[] getBody()
	{
		return body;
	}

	/**
	 * @param body the body to set
	 */
	public void setBody(byte[] body)
	{
		this.body = body;
	}

	/**
	 * @return the type
	 */
	public byte getType()
	{
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(byte type)
	{
		this.type = type;
	}

	public String logstr()
	{
		return "" + type;
	}
}
