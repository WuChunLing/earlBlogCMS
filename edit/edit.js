jQuery(document).ready(function($) {
	$("#send").click(function(){
		// 检查文章内容是否为空
		var has = hasContent();
		if(has){
			var title = $("#articleTitle").val();
			// 检查文章标题是否为空
			if(title==" "){alert("文章标题不允许为空！");}
			else{
				var articleContent = getContent();//文章内容
				var articleOutline = getContentTxt();//文章概要
				var articleTag = $("#articleTip").val();//文章标签
				var articleAuthor = sessionStorage.userName;//文章作者
				var createTime = new Date();//发表时间

				var url = " ";
				$.post(url, {
					articleContent : articleContent,
					articleOutline : articleOutline,
					articleTag : articleTag,
					articleAuthor : articleAuthor,
					createTime : createTime,
					}, 
					function(data) {
						alert(data);
				});
			}
		}
	});
});