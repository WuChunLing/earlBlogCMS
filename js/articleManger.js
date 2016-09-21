var myArticle = [] ;//我的文章
var tag = [];//标签
var totalPage;

var myArticleURL ="./json/myArticle.json";//按最新时间排序的文章接口

var url = myArticleURL;

//文档加载预先显示第一分页文章信息
jQuery(document).ready(function($) {
	getArticle(url,1,20,null);//获取第一页的文章列表信息
	
	// 显示文章
	$("body").find("#myArticleTable").on('click', '.showList', function(){
		console.log("click");
		var i = this.id;
		sessionStorage.title = myArticle[i][1];
		sessionStorage.author = myArticle[i][3];
		sessionStorage.time = myArticle[i][7];
		sessionStorage.main = myArticle[i][2];
		// window.location.href='./showArticle.html';
	});

	// 页码点击事件
	$("body").find(".list_page").on('click', 'li', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');		
		var page = $(this).text();
		if(page=="第一页"){page = 1;}
		else if(page=="最后一页")
		{
			var page_prev = $(this).prev().text();
			if(page_prev=="第一页"){page_prev = 1 ;}
			page = parseInt(page_prev) + 1;
		}
		else{ page = parseInt(page);}
		scroll(0,0);
		var text = sessionStorage.userName;
		getArticle(url,page,20,text);
	});

	// 修改文章
	$("#myArticleTable").on('click', '.update', function(){
		var i = this.id;
		sessionStorage.id = myArticle[i][0];
		sessionStorage.title = myArticle[i][1];
		sessionStorage.tag = myArticle[i][8];
		sessionStorage.main = myArticle[i][2];
	});

	// 删除文章
	$("#myArticleTable").on('click', '.delete', function(){
		var i = this.id;
		var url = "删除的接口";
		var articleId = myArticle[i][0];
		$.post(url, {id:articleId}, function(data) {
			alert("删除成功");
			getArticle(url,1,20,null);//获取第一页的文章列表信息
		});

	});

});

// 从接口接收文章
// url接口 ，pageNum 第几页信息，index 每页几条记录，text 查询字段 
function getArticle(url,pageNum,index,text){
	$.post(url, {
		page:pageNum,
		articleNum:index,
		search:text
		},
		function(json) {
			var data = JSON.parse(json);
			var articleNum = data.numberOfElements;	//获得当前页文章总数
			totalPage = data.totalPages;	//获得分页数目
			arr(myArticle,tag,articleNum,data);
			put(myArticle,tag,articleNum,20);
		
			//页码显示
			if (pageNum == 1){	
				getPage(totalPage,20);
			}
	});
}

// 把从接口收到的数据存入数组中
// 参数 article要存入的文章数组，tag要存入的标签数组，articleNum文章总数或数组长度，data从接口接收到的数据
function arr(article,tag,atricleNum,data){
	for(var i=0;i<atricleNum;i++){	
		article[i] = new Array(9);	//定义为二维数组
		tag[i] = new Array();		//定义为二维数组
		article[i][0] = data.content[i].id ;	 // id
		article[i][1] = data.content[i].title  ;  //  标题
		article[i][2] = data.content[i].html   ;  // 内容
		article[i][3] = data.content[i].user.userName  ;  // 作者
		article[i][4] = data.content[i].readNum ;  // 阅读数
		article[i][5] = data.content[i].outline ;  // 片段
		article[i][6] = data.content[i].likeNum ;  // 点赞数
		var createTime= new Date(parseInt(data.content[i].createTime)).toLocaleString();
		article[i][7] = createTime ;  // 发表时间
		article[i][8] = data.content[i].tag ;  // 标签
		var tipText = article[i][8].split(",");
		for (var j=0;j<tipText.length;j++){
			tag[i][j] = tipText[j];
		} 
	}
}

// 把数组内容放入写入页面中
function put(article,tag,articleNum,index){
	
	var str = '';
	for(var i=0;i<articleNum;i++){
		str += '<tr><td><a href="./showArticle.html" class="showList" id='+i+' >'+article[i][1]+'</a></td>'+'<td>'+article[i][7] +'</td><td>'+'<span class="glyphicon glyphicon-eye-open">&nbsp;'+article[i][4]+'&nbsp;&nbsp;</span>'+'</td>'+'<td><a class="update" href="./edit/index.html" id='+i+'>修改</a>&nbsp;&nbsp;&nbsp;<a class="delete" id='+i+'>删除</a></td>'+'</tr>';
	}
	$("#myArticleTable").empty().append(str);
	
}
// 显示页码
function getPage(totalPage,index){
	if(totalPage != 1)
	{	
		var str = " "
		for (var i = 1;i<=totalPage;i++){
			if(i==1){
				str += "<li class='active'><a>第一页</a></li>";
			}
			else{
				if(i==totalPage){
					str += "<li><a>最后一页</a></li>";
				}
				else{
					str += "<li><a>"+i+"</a></li>";
				}	
			}
		}
		$(".list_page").empty().append(str);	
	}
}



