(function() {
	$("#btnBack").bind("click",
	function() {
		var n = $(this).data("type");
		n === "window" ? parent.layer.closeAll() : n === "url" && window.history.go( - 1)
	});
	$("#btnSave").bind("click",
	function() {
		$("form:first").valid() && $(this).button("loading")
	})
})()