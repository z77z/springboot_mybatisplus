var ByteBuffer = window.dcodeIO.ByteBuffer;

var websockets = [];
var reconnInterval = 10000;    //重连间隔
var dtfPageSize = 5000;
var myUserid = null;   //我的用户id
// var reconnLock = false;      //避免重复连接
// var needconn = true;      //是否需要重连

var lastInteractionTime = 0;//上一次交互时间
var heartbeatTimeout = 60 * 1000;
var heartbeatSendInterval = heartbeatTimeout / 2;

var stat = {
	received : 0  //收到次数
	,sent:0       //发送次数
	,connCount:0  //连成功次数
	,reconnCount:0 //重连次数
};

protobuf.load("im.proto", function(err, root) {
	if (err) {
		throw err;
	}
	loadClass(root);
});

function loadClass(root) {
	Client = root.lookup("org.tio.examples.im.common.packets.Client");
	LoginReqBody = root.lookup("org.tio.examples.im.common.packets.LoginReqBody");
	LoginRespBody = root.lookup("org.tio.examples.im.common.packets.LoginRespBody");
	User = root.lookup("org.tio.examples.im.common.packets.User");
	
	AuthReqBody = root.lookup("org.tio.examples.im.common.packets.AuthReqBody");
	AuthRespBody = root.lookup("org.tio.examples.im.common.packets.AuthRespBody");
	
	JoinGroupReqBody = root.lookup("org.tio.examples.im.common.packets.JoinGroupReqBody");
	JoinGroupResult = root.lookup("org.tio.examples.im.common.packets.JoinGroupResult");
	JoinGroupRespBody = root.lookup("org.tio.examples.im.common.packets.JoinGroupRespBody");
	JoinGroupNotifyRespBody = root.lookup("org.tio.examples.im.common.packets.JoinGroupNotifyRespBody");
	ExitGroupNotifyRespBody = root.lookup("org.tio.examples.im.common.packets.ExitGroupNotifyRespBody");
	
	ChatReqBody = root.lookup("org.tio.examples.im.common.packets.ChatReqBody");
	ChatRespBody = root.lookup("org.tio.examples.im.common.packets.ChatRespBody");
	
	ChatType = root.lookup("org.tio.examples.im.common.packets.ChatType");
	DeviceType = root.lookup("org.tio.examples.im.common.packets.DeviceType");
	Command = root.lookup("org.tio.examples.im.common.packets.Command");
	
	ClientPageReqBody = root.lookup("org.tio.examples.im.common.packets.ClientPageReqBody");
	ClientPageRespBody = root.lookup("org.tio.examples.im.common.packets.ClientPageRespBody");

	console.log(Command.values.COMMAND_AUTH_REQ);  //3
	console.log(Command.valuesById[4]);   //COMMAND_AUTH_RESP
	console.dir(Command);
}



function initWs(url) {
	
	try {
		var ws = new WebSocket(url);
		
		ws.binaryType = 'blob'; // 'blob';//
		initWsEvent(ws, url);
		return ws;
	} catch (e) {
		console.log(e);
		reconn(url, null, e);
	}
}

function initWsEvent(ws, url){
	ws.onopen = function(event) {
		var ws = event.srcElement;
		
		stat.connCount++;
		console.log(ws);
		websockets.push(ws);
		
		console.log(event);
		
		lastInteractionTime = new Date().getTime();
		
		var command = 14;
		var bodyData = {
			deviceId : "deviceId--888888888888"
			,seq : 1
			,deviceType : 1
			,deviceInfo : "chrome"
			,token :"token"
		};
		sendPacket(ws, command, AuthReqBody, bodyData);
	};

	ws.onmessage = function(event) {
		console.log("收到消息", event);
		var ws = event.srcElement;
		stat.received++;
		var arrayBuffer = event.data;
//		console.log("arrayBuffer.byteLength:"+arrayBuffer.byteLength);
		
		var byteBuffer = ByteBuffer.wrap(arrayBuffer);
		var command =  Command.valuesById[byteBuffer.readByte()];

//		console.log(byteBuffer);
		console.log("收到消息", command, byteBuffer);
		
		arrayBuffer = byteBuffer.toArrayBuffer();
		byteBuffer = ByteBuffer.wrap(arrayBuffer);
		
		var uint8Array = new Uint8Array(arrayBuffer);
		handler[command].call(handler[command], uint8Array, event, ws);
		
		lastInteractionTime = new Date().getTime();
	};

	ws.onclose = function(event) {
		var ws = event.srcElement;		
		websockets.remove(ws);
		reconn(url, event, null);
	};

	ws.onerror = function(event){
		var ws = event.srcElement;
		console.log("error", event);
		//reconn(url, event, null)
	};
}
function reconn(url, event, e) {
// 	if (!needconn) {
// 		console.log("已经不需要重连了", event, e);
// 		return;
// 	}
	
// 	if (reconnLock) {
// 		console.log("没有拿到重连权限", event, e);
// 		return;
// 	}
	
// 	reconnLock = true;
	stat.reconnCount++;

	setTimeout(function() {
				console.log("开始第次" + stat.reconnCount + "重连:" + url, event, e);
				initWs(url);
// 				reconnLock = false;
			}, reconnInterval);
}


/**
 * 发送packet
 * 
 * @param {} ws
 * @param {} command
 * @param {} BodyClass
 * @param {} bodyData
 */
function sendPacket(ws, command, BodyClass, bodyData) {
    var bodyObj = null;
    if (bodyData) {
    	bodyObj = BodyClass.create(bodyData);
    }
    
    var bodyBuffer = null;
    if (bodyObj) {
    	bodyBuffer = BodyClass.encode(bodyObj).finish();
    }
	
	sendBuffer(ws, command, bodyBuffer);
}

/**
 * 发送buffer
 * @param {} ws
 * @param {} command
 * @param {} bodyBuffer
 */
function sendBuffer(ws, command, bodyBuffer){
	var bodyLength = 0;
	if (bodyBuffer) {
		bodyLength = bodyBuffer.length;
	}

	var allBuffer = ByteBuffer.allocate(1 + bodyLength);
	allBuffer.writeByte(command);

	if (bodyBuffer) {
		allBuffer.append(bodyBuffer);
	}
	ws.send(allBuffer.buffer);
	console.log("已经发送", Command.valuesById[command], allBuffer);
	lastInteractionTime = new Date().getTime();
}

/**
 * 发送心跳
 */
function ping()
{
	var nowTime = new Date().getTime();
	var iv = nowTime - lastInteractionTime; // 已经多久没发消息了
	if ((heartbeatSendInterval + iv) >= heartbeatTimeout) {
		var command = Command.values.COMMAND_HEARTBEAT_REQ;
		for(var i = 0; i < websockets.length; i++){
			var ws = websockets[i];
			sendBuffer(ws, command, null);
		}
	}
}
setInterval("ping()", heartbeatSendInterval);





/**
 * 消息处理者
 * @type 
 */
var handler = {};

//收到鉴权响应收到，下一步：登录
handler.COMMAND_AUTH_RESP = function(uint8Array, event, ws){
	var respBody = AuthRespBody.decode(uint8Array);
	
	var command = Command.values.COMMAND_LOGIN_REQ;
	var bodyData = {
		loginname : "谭耀武",
		password : "123456"
	};
	sendPacket(ws, command, LoginReqBody, bodyData);
};

//收到登录响应，下一步：进入群组
handler.COMMAND_LOGIN_RESP = function(uint8Array, event, ws){
	var respBody = LoginRespBody.decode(uint8Array);
	console.log(respBody);
	console.log(respBody.user.id.toNumber());
	myUserid = respBody.user.id.toNumber();
	chat.myUserid = myUserid;
	
	var groupele = document.getElementById("group");
	var command = Command.values.COMMAND_JOIN_GROUP_REQ;
	var bodyData = {
		group : groupele.value
	};
	sendPacket(ws, command, JoinGroupReqBody, bodyData);
};

//收到进群组响应，下一步：获取在线用户列表
handler.COMMAND_JOIN_GROUP_RESP = function(uint8Array, event, ws){
	var respBody = JoinGroupRespBody.decode(uint8Array);
	
	var command = Command.values.COMMAND_CLIENT_PAGE_REQ;
	var bodyData = {
		pageIndex : 1,
		pageSize : dtfPageSize,
		group : respBody.group
	};
	sendPacket(ws, command, ClientPageReqBody, bodyData);
};

//收到在线用户列表
handler.COMMAND_CLIENT_PAGE_RESP = function(uint8Array, event, ws){
	var respBody = ClientPageRespBody.decode(uint8Array);
	
	console.log(respBody);
	
	var pageIndex = respBody.pageIndex;
	var pageSize= respBody.pageSize;
	var recordCount= respBody.recordCount;
	var clients = respBody.clients;
	
	userlist.pageIndex = pageIndex;
	userlist.pageSize = pageSize;
	userlist.recordCount = recordCount;
	userlist.clients = clients;
	
	open1();
};
//收到有人进入群组通知
handler.COMMAND_JOIN_GROUP_NOTIFY_RESP = function(uint8Array, event, ws){
	var respBody = JoinGroupNotifyRespBody.decode(uint8Array);
	
	console.log(respBody);
	
	var group = respBody.group;
	var client = respBody.client;
	
	var clients = userlist.clients;
//	clients.push(client);
	clients.splice(0, 0, client);
	
	userlist.recordCount++;
	
};

//收到有人离开群组通知
handler.COMMAND_EXIT_GROUP_NOTIFY_RESP = function(uint8Array, event, ws){
	var respBody = ExitGroupNotifyRespBody.decode(uint8Array);
	
	console.log(respBody);
	
	var group = respBody.group;
	var client = respBody.client;
	
	var clients= userlist.clients;
	for (var i = 0; i < clients.length; i++){
		var client1 = clients[i];
		if (client1.id == client.id){
			clients.splice(i, 1);
			userlist.recordCount--;
			console.log(clients);
			break;
		}
	}
};


//收到聊天响应
handler.COMMAND_CHAT_RESP = function(uint8Array, event, ws){
	var respBody = ChatRespBody.decode(uint8Array);
//	console.log("收到聊天消息:" + stat.received + "-" + respBody.text);
	console.log("收到聊天消息", respBody);
//	console.log(respBody.time);
//	console.log(respBody.time.toNumber());
	
	if (chat.chatRespBodys.length > 200) {
		chat.chatRespBodys = [];
	}
	respBody.date = new Date(respBody.time.toNumber()).format('yyyy-MM-dd hh:mm:ss');
	chat.chatRespBodys.push(respBody);
	
	setTimeout('cccc()',10);
};
function cccc(){
	var div = document.getElementById('chat_main');
	div.scrollTop = div.scrollHeight;
}