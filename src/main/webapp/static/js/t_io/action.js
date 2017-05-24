function connectionBtnClicked() {
	/*var serverele = document.getElementById('server').value;
	var portele = document.getElementById('port').value;
	var countele = document.getElementById('count').value;*/
	var wsUrl = "ws://" + "127.0.0.1" + ":" + "9321";
	for (var i = 0; i < 1; i++) {
		initWs(wsUrl);
	}
}

function sendBtnClicked() {
	var textele = "zhq邹海清";
	var groupele = "g";
	var command = Command.values.COMMAND_CHAT_REQ;
	var bodyData = {
		text : textele.value,
		group : groupele.value,
		type : ChatType.values.CHAT_TYPE_PUBLIC
	};

	for (var i = 0; i < websockets.length; i++) {
		var ws = websockets[i];
		sendPacket(ws, command, ChatReqBody, bodyData);
		break;
	}
}

function open1() {
	layui.use(['layer','layim'], function() {
				layer.open({
							type : 1,
							shade : false,
							content : $('#layer_notice'), // 捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
							//maxmin: true,
							cancel : function() {

							},
							title: ['开源中国粉丝群', 'font-size:18px;'],
							//skin : "layui-layer-molv",//layui-layer-lan(蓝), layui-layer-molv(绿)
//							btn : ['按钮一', '按钮二', '按钮三'] // 可以无限个按钮
//							,
//							btn3 : function(index, layero) {
//								// 按钮【按钮三】的回调
//							},
							area : ['750px', '500px']       //宽, 高
						});
			});

}

function init() {

	connectionBtnClicked();

	
}

init();