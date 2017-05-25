package io.z77z.tio.handlers;

import org.tio.core.ChannelContext;
import org.tio.json.Json;

import io.z77z.tio.body.P2PReqBody;
import io.z77z.tio.server.BarrageHandlerIntf;
import io.z77z.tio.server.BarragePacket;
import io.z77z.tio.server.BarrageSessionContext;

public class P2PReqHandler implements BarrageHandlerIntf<P2PReqBody>{

	@Override
	public Object handler(
			BarragePacket packet,
			String jsonStr,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext)
			throws Exception {
		System.out.println(Json.toBean(jsonStr, P2PReqBody.class));
		return null;
	}

}
