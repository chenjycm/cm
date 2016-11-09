$(document).ready(function(){
	$.ajax({
			url:'/cmapis/getQues?page=1&pageSize=12',
	        type:'GET',
	        success: function(res){
	            console.log(res.data.datas);    //res就是一个对象数组，这里你就可以操作他了
	           //	$(".ans_list").html('');
	             var tmp=new Array();
			 	 for(var i=0;i<res.data.datas.length;i++){
			      if('ans' in res.data.datas[i]){
						var ask_id = res.data.datas[i]._id;
			 	 		var ask_name = res.data.datas[i].ask.name;
						var ask_text = res.data.datas[i].ask.txt;
						var a1 = new Date(res.data.datas[i].ask.time)       //Date(time)将时间戳time转化成Date数据
						var ask_time = change_time(a1);  					//change_time将Date数据转化成自定义数据
						var ans_name = res.data.datas[i].ans.name;
						var ans_text = res.data.datas[i].ans.txt;
						var a2 = new Date(res.data.datas[i].ans.time)
						var ans_time = change_time(a2);
						var $ask_ans="<li class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ans_time+"</div><div class='list_link'><a class='ans_back'>回复</a><span>|</span><a>审核通过</a><span>|</span><a>撤销</a></div><div class='ans_box'><p class='ans_title'>答：</p><div class='ans_content'><span class='ans_name'>"+ans_name+"</span><div class='ans_text'>"+ans_text+"</div><div class='ans_time'>"+ans_time+"</div></div></div></li>"
						tmp.push($ask_ans);    // data-ids = '"+ask_id+"'
					}
					else{
						var ask_name = res.data.datas[i].ask.name;
						var ask_text = res.data.datas[i].ask.txt;
						var b = new Date(res.data.datas[i].ask.time)
						var ask_time = change_time(b);
						var $ask_ans="<li class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ans_time+"</div><div class='list_link'><a class='ans_back'>回复</a><span>|</span><a>审核通过</a><span>|</span><a>撤销</a></div></li>";
						tmp.push($ask_ans);
					}				
			 	}
			 	$(".ans_list").prepend(tmp);
	        },
	        error: function(err){
	          console.log('error:',err);
	        }
		});
});

$(function(){ 


	$(document).on('click', '.ans_back',function(){
			
			$('#back_ans').show();
			// var $self = $(this);
			// $('#button_ans').bind('click',function(){
			// 	var ans_text_id = $self.data('ids'); console.log(ans_text_id);
			// 	var ans_text_send = .val();console.log(ans_text_send);
			// 	var ans_name_send = $self.name_ans.val();console.log(ans_name_send);
			// 	$('#back_ans').hide();
			// });
	});

	$('#ans_exit').bind('click',function(){
		$('#back_ans').hide();
	});




});	

function change_time(t){     //将Date数据，装换成自定义时间显示格式
	var a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes();
	return a; 
}
