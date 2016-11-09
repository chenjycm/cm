// $(document).ready(function(){
// 	$.ajax({
// 			url:'/cmapis/getQues?page=1&pageSize=6',
// 	        type:'GET',
// 	        success: function(res){
// 	            console.log(res.data.datas);    //res就是一个对象数组，这里你就可以操作他了
// 	           	$("#ans_list").html('');
// 	             var tmp=new Array();
// 			 	 for(var i=0;i<res.data.datas.length;i++){
// 			      if('ans' in res.data.datas[i]){
// 						var ask_id = res.data.datas[i]._id;
// 			 	 		var ask_name = res.data.datas[i].ask.name;
// 						var ask_text = res.data.datas[i].ask.txt;
// 						var a1 = new Date(res.data.datas[i].ask.time)       //Date(time)将时间戳time转化成Date数据
// 						var ask_time = change_time(a1);  					//change_time将Date数据转化成自定义数据
// 						var ans_name = res.data.datas[i].ans.name;
// 						var ans_text = res.data.datas[i].ans.txt;
// 						var a2 = new Date(res.data.datas[i].ans.time)
// 						var ans_time = change_time(a2);
// 						var $ask_ans="<li data-w='"+ask_id+"' class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ask_time+"</div><div class='list_link'><a href='./answer.html' target='_blank'>回复</a><span>|</span><a href='page.html'>审核通过</a><span>|</span><a href='page.html'>撤销</a></div></li>";
// 						tmp.push($ask_ans);
// 						//$("#answer").prepend($ask_ans);
// 					}else{
// 						var ask_name = res.data.datas[i].ask.name;
// 						var ask_text = res.data.datas[i].ask.txt;
// 						var b = new Date(res.data.datas[i].ask.time)
// 						var ask_time = change_time(b);
// 						var $ask_ans="<li data-w='"+ans_id+"' class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ask_time+"</div><div class='list_link'><a href='./answer.html' target='_blank'>回复</a><span>|</span><a href='page.html'>审核通过</a><span>|</span><a href='page.html'>撤销</a></div></li>";
// 						//$("#answer").prepend($ask_ans);
// 						tmp.push($ask_ans);
// 					}				
// 			 	}
// 			 	$("#ans_list").prepend(tmp);
// 	        },
// 	        error: function(err){
// 	          console.log('error:',err);
// 	        }
// 		});
// });

$(function(){ 
	$('#ans_back').bind("click",function(){
		alert('get');
		$('#back_hide').show();
	});
});	

function change_time(t){     //将Date数据，装换成自定义时间显示格式
	var a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes();
	return a; 
}
