package io.z77z.tio.server;

import io.z77z.tio.handlers.HandshakeReqHandler;
import io.z77z.tio.handlers.P2PReqHandler;
import io.z77z.tio.server.WebsocketPacket.Opcode;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.tio.core.ChannelContext;
import org.tio.core.GroupContext;
import org.tio.core.exception.AioDecodeException;
import org.tio.server.intf.ServerAioHandler;

public class BarrageServerHandler implements ServerAioHandler<BarrageSessionContext, BarragePacket, Object> {

	
	private static Map<Byte, BarrageHandlerIntf<?>> handlerMap = new HashMap<>();
	static
	{
		handlerMap.put(Type.COMMAND_HANDSHAKE_REQ, new HandshakeReqHandler());
		handlerMap.put(Type.P2P_REQ, new P2PReqHandler());
	}
	
	@Override
	public Object handler(BarragePacket packet, ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext)
			throws Exception {
		//根据类型获取对应消息的handler处理类
		Byte type = packet.getType();
		BarrageHandlerIntf<?> handler = handlerMap.get(type);
		if (handler == null)
		{
			Logger.getLogger(getClass()).error("{"+channelContext+", 找不到处理类，type:{"+type+"}");
			return null;
		}
		//获取packet中的body，转换String类型,交给对应消息处理类
		String jsonStr = null;
		
		if (packet.getBody() != null)
		{
			jsonStr = new String(packet.getBody(), "utf-8");
		}
		handler.handler(packet, jsonStr , channelContext);
		return null;
	}

	/**
	 * 编码：把业务消息包编码为可以发送的ByteBuffer 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public ByteBuffer encode(BarragePacket packet, GroupContext<BarrageSessionContext, BarragePacket, Object> groupContext,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) {
		byte[] body = packet.getBody();
		int bodyLen = 0;
		if (body != null) {
			bodyLen = body.length;
		}

		// 总长度是消息头的长度+消息体的长度
		int allLen = BarragePacket.HEADER_LENGHT + bodyLen;

		ByteBuffer buffer = ByteBuffer.allocate(allLen);
		buffer.order(groupContext.getByteOrder());

		// 写入消息类型
		buffer.put(packet.getType());
		// 写入消息体长度
		buffer.putInt(bodyLen);

		// 写入消息体
		if (body != null) {
			buffer.put(body);
		}
		return buffer;
	}

	/**
	 * 握手包
	 */
	private static BarragePacket handshakePacket = new BarragePacket(Type.COMMAND_HANDSHAKE_REQ);
	
	/**
	 * 解码：把接收到的ByteBuffer，解码成应用可以识别的业务消息包 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public BarragePacket decode(ByteBuffer buffer, ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext)
			throws AioDecodeException {
		//获取会话的信息保存类
		BarrageSessionContext  barrageSessionContext = channelContext.getSessionContext();
		int initPosition = buffer.position();
		byte firstbyte = buffer.get(initPosition);

		if (!barrageSessionContext.isHandshaked())  //如果还没有握手，则先进行握手操作
		{
			if (Type.COMMAND_HANDSHAKE_REQ == firstbyte)
			{
				buffer.position(1 + initPosition);
				return handshakePacket;
			} else
			{
				HttpRequestPacket httpRequestPacket = HttpRequestDecoder.decode(buffer);
				if (httpRequestPacket == null)
				{
					return null;
				}

				httpRequestPacket.setType(Type.COMMAND_HANDSHAKE_REQ);
				barrageSessionContext.setWebsocket(true);
				return httpRequestPacket;
			}
		}

		boolean isWebsocket = barrageSessionContext.isWebsocket();

		if (isWebsocket)  //走的websocket协议
		{
			WebsocketPacket websocketPacket = WebsocketDecoder.decode(buffer, channelContext);
			if (websocketPacket == null)
			{
				return null;
			}

		} else
		{
		}
		
		
		
		
		
		
		int readableLength = buffer.limit() - buffer.position();
		if (readableLength < BarragePacket.HEADER_LENGHT) {
			return null;
		}

		// 消息类型
		byte type = buffer.get();

		int bodyLength = buffer.getInt();

		if (bodyLength < 0) {
			throw new AioDecodeException(
					"bodyLength [" + bodyLength + "] is not right, remote:" + channelContext.getClientNode());
		}

		int neededLength = BarragePacket.HEADER_LENGHT + bodyLength;
		int test = readableLength - neededLength;
		if (test < 0) // 不够消息体长度(剩下的buffe组不了消息体)
		{
			return null;
		} else {
			BarragePacket packet = new BarragePacket();
			packet.setType(type);
			if (bodyLength > 0) {
				byte[] dst = new byte[bodyLength];
				buffer.get(dst);
				packet.setBody(dst);
			}
			return packet;
		}
	}
}
