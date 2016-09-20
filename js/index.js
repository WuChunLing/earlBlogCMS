$(document).ready(function(){
	//判断是否登录
	if(window.sessionStorage)
	{ 
		$("header>span").text(sessionStorage.userName+",欢迎登录本系统！")
	}

});