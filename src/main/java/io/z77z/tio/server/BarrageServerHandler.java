package io.z77z.tio.server;

import io.z77z.tio.handlers.HandshakeReqHandler;
import io.z77z.tio.handlers.P2PReqHandler;
import io.z77z.tio.server.WebsocketPacket.Opcode;
import io.z77z.util.GzipUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
	static {
		handlerMap.put(Type.COMMAND_HANDSHAKE_REQ, new HandshakeReqHandler());
		handlerMap.put(Type.P2P_REQ, new P2PReqHandler());
	}

	@Override
	public Object handler(BarragePacket packet,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) throws Exception {
		// 根据类型获取对应消息的handler处理类
		Byte type = packet.getType();
		BarrageHandlerIntf<?> handler = handlerMap.get(type);
		if (handler == null) {
			Logger.getLogger(getClass()).error("{" + channelContext + ", 找不到处理类，type:{" + type + "}");
			return null;
		}
		// 获取packet中的body，转换String类型,交给对应消息处理类
		String jsonStr = null;

		if (packet.getBody() != null) {
			jsonStr = new String(packet.getBody(), "utf-8");
		}
		handler.handler(packet, jsonStr, channelContext);
		return null;
	}

	/**
	 * 编码：把业务消息包编码为可以发送的ByteBuffer 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public ByteBuffer encode(BarragePacket packet,
			GroupContext<BarrageSessionContext, BarragePacket, Object> groupContext,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) {
		BarrageSessionContext barrageSessionContext = channelContext.getSessionContext();
		boolean isWebsocket = barrageSessionContext.isWebsocket();

		if (packet.getType() == Type.COMMAND_HANDSHAKE_RESP) {
			if (isWebsocket) {
				return HttpResponseEncoder.encode((HttpResponsePacket) packet, groupContext, channelContext);
			} else {
				ByteBuffer buffer = ByteBuffer.allocate(1);
				buffer.put(BarragePacket.HANDSHAKE_BYTE);
				return buffer;
			}
		}

		if (isWebsocket) {
			return WebsocketEncoder.encode(packet, groupContext, channelContext);
		}

		byte[] body = packet.getBody();
		int bodyLen = 0;
		boolean isCompress = false;
		if (body != null) {
			bodyLen = body.length;

			if (bodyLen > 200) {
				try {
					byte[] gzipedbody = GzipUtils.gZip(body);
					if (gzipedbody.length < body.length) {
						Logger.getLogger(getClass()).error("压缩前:{}, " + body.length + "压缩后:{}" + gzipedbody.length);
						body = gzipedbody;
						packet.setBody(gzipedbody);
						bodyLen = gzipedbody.length;
						isCompress = true;
					}
				} catch (IOException e) {
					Logger.getLogger(getClass()).error(e.getMessage(), e);
				}
			}
		}

		int allLen = BarragePacket.LEAST_HEADER_LENGHT + bodyLen;

		ByteBuffer buffer = ByteBuffer.allocate(allLen);
		buffer.order(groupContext.getByteOrder());

		buffer.put(BarragePacket.VERSION);
		buffer.put((byte) packet.getType());
		buffer.put(isCompress ? (byte) 1 : (byte) 0);
		buffer.putInt(packet.getSynSeq());
		buffer.putShort((short) bodyLen);

		if (body != null) {
			buffer.put(body);
		}
		return buffer;
	}

	/**
	 * 心跳
	 */
	private static BarragePacket heartbeatPacket = new BarragePacket(Type.HEART_BEAT_REQ);

	/**
	 * 握手包
	 */
	private static BarragePacket handshakePacket = new BarragePacket(Type.COMMAND_HANDSHAKE_REQ);

	/**
	 * 解码：把接收到的ByteBuffer，解码成应用可以识别的业务消息包 消息头：type + bodyLength 消息体：byte[]
	 */
	@Override
	public BarragePacket decode(ByteBuffer buffer,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) throws AioDecodeException {
		// 获取会话的信息保存类
		BarrageSessionContext barrageSessionContext = channelContext.getSessionContext();
		int initPosition = buffer.position();
		byte firstbyte = buffer.get(initPosition);

		if (!barrageSessionContext.isHandshaked()) // 如果还没有握手，则先进行握手操作
		{
			if (BarragePacket.HANDSHAKE_BYTE == firstbyte) {
				buffer.position(1 + initPosition);
				return handshakePacket;
			} else {
				HttpRequestPacket httpRequestPacket = HttpRequestDecoder.decode(buffer);
				if (httpRequestPacket == null) {
					return null;
				}

				httpRequestPacket.setType(Type.COMMAND_HANDSHAKE_REQ);
				barrageSessionContext.setWebsocket(true);
				return httpRequestPacket;
			}
		}

		boolean isWebsocket = barrageSessionContext.isWebsocket();

		if (isWebsocket) // 走的websocket协议
		{
			WebsocketPacket websocketPacket = WebsocketDecoder.decode(buffer, channelContext);
			if (websocketPacket == null) {
				return null;
			}
			Opcode opcode = websocketPacket.getWsOpcode();
			if (opcode == Opcode.BINARY) {
				byte[] wsBody = websocketPacket.getWsBody();
				if (wsBody == null || wsBody.length == 0) {
					throw new AioDecodeException("错误的websocket包，body为空");
				}

				BarragePacket barragePacket = new BarragePacket(Type.COMMAND_HANDSHAKE_RESP);

				if (wsBody.length > 1) {
					byte[] dst = new byte[wsBody.length - 1];
					System.arraycopy(wsBody, 1, dst, 0, dst.length);
					barragePacket.setBody(dst);
				}
				return barragePacket;
			} else if (opcode == Opcode.PING || opcode == Opcode.PONG) {
				return heartbeatPacket;
			} else if (opcode == Opcode.CLOSE) {
				BarragePacket barragePacket = new BarragePacket(Type.COMMAND_CLOSE_REQ);
				return barragePacket;
			} else if (opcode == Opcode.TEXT) {
				byte[] wsBody = websocketPacket.getWsBody();
				if (wsBody == null || wsBody.length == 0) {
					throw new AioDecodeException("错误的websocket包，body为空");
				}
				BarragePacket barragePacket = new BarragePacket(Type.P2P_REQ);
				if (wsBody.length > 1) {
					barragePacket.setBody(wsBody);
				}
				return barragePacket;
			} else {
				throw new AioDecodeException("错误的websocket包，错误的Opcode");
			}

		} else {
			if (BarragePacket.HEARTBEAT_BYTE == firstbyte) {
				buffer.position(1 + initPosition);
				return heartbeatPacket;
			}
		}
		return null;
	}
}
