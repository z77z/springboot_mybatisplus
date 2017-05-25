package io.z77z.tio.server;

import java.io.IOException;

import org.tio.server.AioServer;
import org.tio.server.ServerGroupContext;
import org.tio.server.intf.ServerAioHandler;
import org.tio.server.intf.ServerAioListener;


public class BarrageServerStarter {
	//handler, 包括编码、解码、消息处理
		public static ServerAioHandler<BarrageSessionContext, BarragePacket, Object> aioHandler = new BarrageServerHandler();
		
		//事件监听器，可以为null，但建议自己实现该接口，可以参考showcase了解些接口
		public static ServerAioListener<BarrageSessionContext, BarragePacket, Object> aioListener = new BarrageServerAioListener();
		
		//一组连接共用的上下文对象
		public static ServerGroupContext<BarrageSessionContext, BarragePacket, Object> serverGroupContext = new ServerGroupContext<>(aioHandler, aioListener);
		
		//aioServer对象
		public static AioServer<BarrageSessionContext, BarragePacket, Object> aioServer = new AioServer<>(serverGroupContext);
		
		//有时候需要绑定ip，不需要则null
		public static String serverIp = null;
		
		//监听的端口
		public static int serverPort = 5678;

		/**
		 * 启动程序入口
		 */
		public static void main(String[] args) throws IOException
		{
			aioServer.start(serverIp, serverPort);
		}
}
