package io.z77z.tio.server;

import org.tio.core.ChannelContext;

public interface BarrageHandlerIntf {
	public Object handler(BarragePacket packet,
			ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) throws Exception;
}
