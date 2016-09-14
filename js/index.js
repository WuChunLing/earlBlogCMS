$(document).ready(function(){
	//判断是否登录
	if(window.sessionStorage)
	{ 
		var userName=sessionStorage.userName; 
		$("header>span").text(userName+",欢迎登录本系统！")
	}

});