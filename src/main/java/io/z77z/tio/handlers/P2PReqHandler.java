package io.z77z.tio.handlers;

import org.tio.core.Aio;
import org.tio.core.ChannelContext;
import org.tio.json.Json;

import io.z77z.tio.body.P2PReqBody;
import io.z77z.tio.server.BarrageHandlerIntf;
import io.z77z.tio.server.BarragePacket;
import io.z77z.tio.server.BarrageSessionContext;
import io.z77z.tio.server.Type;

public class P2PReqHandler implements BarrageHandlerIntf<P2PReqBody>{

	@Override
	public Object handler(
			BarragePacket packet,
			String jsonStr,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext)
			throws Exception {
		System.out.println(jsonStr);
		BarragePacket barragePacket = new BarragePacket(Type.P2P_REQ);
		barragePacket.setBody(("收到了你的消息，你的消息是:" + jsonStr).getBytes(BarragePacket.CHARSET));
		Aio.send(channelContext, barragePacket);
		return null;
	}

}
