$(function(){
	var user = {};
	$("#getInsta").click(function(event) {
		var username = $("input[name='instaUsername']").val();
		console.log(username);
		user.instagramUsername = username;
		makeRequest("/setup", user, function(data) {
			$(".instaImg").attr("src", data);
		});
	});

	function makeRequest(url, data, callback) {
		$.ajax({
		  type: "POST",
		  url: url,
		  data: data,
		  success: function(data) {
		  	callback(data);
		  },
		  error: function(err) {
		  	console.log(err);
		  }
		});
	}

});
