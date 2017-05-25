package io.z77z.tio.handlers;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.tio.core.Aio;
import org.tio.core.ChannelContext;

import io.z77z.tio.body.HandshakeBody;
import io.z77z.tio.server.BarrageHandlerIntf;
import io.z77z.tio.server.BarragePacket;
import io.z77z.tio.server.BarrageSessionContext;
import io.z77z.tio.server.HttpRequestPacket;
import io.z77z.tio.server.HttpResponsePacket;
import io.z77z.tio.server.HttpResponseStatus;
import io.z77z.tio.server.Type;
import io.z77z.util.BASE64Util;
import io.z77z.util.SHA1Util;

public class HandshakeReqHandler implements BarrageHandlerIntf<HandshakeBody> {

	private BarragePacket handshakeRespPacket = new BarragePacket(Type.COMMAND_HANDSHAKE_RESP);
	
	@Override
	public Object handler(
			BarragePacket packet,
			String body,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext)
			throws Exception {
		BarrageSessionContext barrageSessionContext = channelContext.getSessionContext();
		barrageSessionContext.setHandshaked(true);

		boolean isWebsocket = barrageSessionContext.isWebsocket();
		if (isWebsocket)
		{
			HttpRequestPacket httpRequestPacket = (HttpRequestPacket) packet;
			HttpResponsePacket httpResponsePacket = updateWebSocketProtocol(httpRequestPacket);
			if (httpResponsePacket != null)
			{
				httpResponsePacket.setType(Type.COMMAND_HANDSHAKE_RESP);
				Aio.send(channelContext, httpResponsePacket);
			} else
			{
				Aio.remove(channelContext, "不是websocket协议");
			}
		} else
		{
			Aio.send(channelContext, handshakeRespPacket);
		}
		return null;
	}
	
	public HttpResponsePacket updateWebSocketProtocol(HttpRequestPacket httpRequestPacket)
	{
		Map<String, String> headers = httpRequestPacket.getHeaders();

		String Sec_WebSocket_Key = headers.get("Sec-WebSocket-Key");

		if (StringUtils.isNotBlank(Sec_WebSocket_Key))
		{
			String Sec_WebSocket_Key_Magic = Sec_WebSocket_Key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
			byte[] key_array = SHA1Util.SHA1(Sec_WebSocket_Key_Magic);
			String acceptKey = BASE64Util.byteArrayToBase64(key_array);
			HttpResponsePacket httpResponsePacket = new HttpResponsePacket();

			HttpResponseStatus httpResponseStatus = HttpResponseStatus.C101;
			httpResponsePacket.setHttpResponseStatus(httpResponseStatus);

			Map<String, String> respHeaders = new HashMap<>();
			respHeaders.put("Connection", "Upgrade");
			respHeaders.put("Upgrade", "WebSocket");
			respHeaders.put("Sec-WebSocket-Accept", acceptKey);
			httpResponsePacket.setHeaders(respHeaders);
			return httpResponsePacket;
		}
		return null;
	}

}
