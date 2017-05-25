package io.z77z.tio.server;

import org.tio.core.ChannelContext;
//消息处理接口类
public interface BarrageHandlerIntf<T> {
	public Object handler(BarragePacket packet,String body ,ChannelContext<BarrageSessionContext, BarragePacket, Object> channelContext) throws Exception;
}
