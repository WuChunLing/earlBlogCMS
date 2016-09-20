$(document).ready(function() {

	$('#submit').click(function() {	

	    var ouser=$("#user").val(); //获取登录账号
	    var opassword=$("#password").val();  //获取登录密码

		var url='http://localhost:8080/webapp/loading';
		if(ouser!="" && opassword!=""){
			$.post(url,
				{
					user:ouser,
					password:opassword
				},
				function(data){
					if(data.mess=="success")
	                {				
						sessionStorage.userName = data.userName;//将变量存储到本地sessionStorage
						sessionStorage.userAcount = data.userAcount;
						sessionStorage.userPassword = data.userPassword; 
						window.location.href='../blogCMS.html';
						
					}
					else
					{
						$("#message").text("账户密码错误,请重新输入");
						return false; 
					}
		
			});			
		}
		
 	}); 
});