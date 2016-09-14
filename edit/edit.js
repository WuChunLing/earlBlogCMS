jQuery(document).ready(function($) {
	$("#send").click(function(){
		var has = hasContent();
		if(has){
			var title = $("#articleTitle").val();
			if(title==""){alert("文章标题不允许为空！");}
			else{
				console.log($("#articleTitle").val());
			}
		}
	});
});