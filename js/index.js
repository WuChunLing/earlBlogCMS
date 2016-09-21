$(document).ready(function(){
	//判断是否登录
	if(window.sessionStorage)
	{ 
		$("header>span").text(sessionStorage.userName+",欢迎登录本系统！")
	}
	$(".editBlog").click(function(event) {
		sessionStorage.id = "";
		sessionStorage.title = "";
		sessionStorage.tag = "";
		sessionStorage.main = "";
	});
	
	window.onbeforeunload=function (){
		if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){
		     
		}
		else
		{
		    sessionStorage.id = "";
			sessionStorage.title = "";
			sessionStorage.tag = "";
			sessionStorage.main = "";
		}
	}
});