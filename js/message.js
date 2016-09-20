function showMessage(){
	//判断是否登录
	if(window.sessionStorage)
	{ 
		$(".acount").text(sessionStorage.userAcount);
		$(".name").text(sessionStorage.userName);
		$(".password").text(sessionStorage.userPassword);
	}
}

$(document).ready(function(){
	showMessage();
	$("body").on('click', '.update', function(){
		$("form").css("display","block");
	});
	$("body").on('click', '#cancel', function(){
		$("form").css("display","none");
	});
	$("body").on('click', '#submit', function(e){
	    var userName=$("#userName").val(); 
	    var oldPassword=$("#oldPassword").val(); 
	    var newPassword=$("#newPassword").val();  
	    var newPassword2=$("#newPassword2").val(); 

		var url=' ';

		if(newPassword!=newPassword2){
			$("#message").text("两次密码输入不一致，请重新输入");
		}
		else if(oldPassword!=sessionStorage.userPassword){
			$("#message").text("原密码输入错误，请重新输入");
		}
		else{
			$.post(url,
				{
					userName:userName,
					password:newPassword
				},
				function(data){
					if(data=="success")
	                {				
						
						$("#message").text("修改成功");
						sessionStorage.userName = userName;
						sessionStorage.userPassword = newPassword;
						showMessage();
						$("form").css("display","none");
					}
					else
					{
						$("#message").text("修改失败");
						return false; 
					}
		
			});		
		}
		return false;	
 	}); 

});
