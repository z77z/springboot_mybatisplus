package io.z77z.tio.server;

import java.nio.ByteBuffer;

import org.tio.core.ChannelContext;
import org.tio.core.GroupContext;
import org.tio.core.exception.AioDecodeException;
import org.tio.server.intf.ServerAioHandler;

public class BarrageServerHandler implements ServerAioHandler<Object, BarragePacket, Object> {

	
	private static Map<Byte, AbsShowcaseBsHandler<?>> handlerMap = new HashMap<>();
	static
	{
		handlerMap.put(Type.GROUP_MSG_REQ, new GroupMsgReqHandler());
		handlerMap.put(Type.HEART_BEAT_REQ, new HeartbeatReqHandler());
		handlerMap.put(Type.JOIN_GROUP_REQ, new JoinGroupReqHandler());
		handlerMap.put(Type.LOGIN_REQ, new LoginReqHandler());
		handlerMap.put(Type.P2P_REQ, new P2PReqHandler());
	}
	
	@Override
	public Object handler(BarragePacket packet, ChannelContext<Object, BarragePacket, Object> channelContext)
			throws Exception {
		return null;
	}

	/**
	 * 编码：把业务消息包编码为可以发送的ByteBuffer 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public ByteBuffer encode(BarragePacket packet, GroupContext<Object, BarragePacket, Object> groupContext,
			ChannelContext<Object, BarragePacket, Object> channelContext) {
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
	 * 解码：把接收到的ByteBuffer，解码成应用可以识别的业务消息包 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public BarragePacket decode(ByteBuffer buffer, ChannelContext<Object, BarragePacket, Object> channelContext)
			throws AioDecodeException {
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
