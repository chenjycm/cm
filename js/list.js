$(document).ready(function(){
	$.ajax({
			url:'/cmapis/getQues?page=1&pageSize=12',
	        type:'GET',
	        success: function(res){
	            console.log(res.data.datas[0].ask_time);    //res就是一个对象数组，这里你就可以操作他了
	           //	$(".ans_list").html('');
	            var get_print=new Array(); 
			 	for(var i=0,datas=res.data.datas,l=datas.length,tmp;i<l;i++){
			 		tmp=datas[i];
			      if('ans' in tmp){
						var ask_id = tmp._id;
			 	 		var ask_name = tmp.ask.name;
						var ask_text = tmp.ask.txt;
						var a1 = new Date(tmp.ask.time)       //Date(time)将时间戳time转化成Date数据
						var ask_time = change_time(a1);  					//change_time将Date数据转化成自定义数据
						var ans_name = tmp.ans.name;
						var ans_text = tmp.ans.txt;
						var a2 = new Date(tmp.ans.time)
						var ans_time = change_time(a2);
						var $ask_ans="<li class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ask_time+"</div><div class='list_link' data-ids = '"+ask_id+"'><a class='ans_back'>回复</a><span>|</span><a>审核通过</a><span>|</span><a class='delet_text'>撤销</a></div><div class='ans_box'><p class='ans_title'>答：</p><div class='ans_content'><div class='ans_name'>"+ans_name+"</div><div class='ans_text'>"+ans_text+"</div><div class='ans_time'>"+ans_time+"</div></div></div></li>"
						get_print.push($ask_ans);    
					}
					else{
						var ask_id = tmp._id;
						var ask_name = tmp.ask.name;
						var ask_text = tmp.ask.txt;
						var b = new Date(tmp.ask.time);
						var ask_time = change_time(b);
						var $ask_ans="<li class='ans_inf'><div class='list_name'>"+ask_name+"</div><div class='list_ask'>"+ask_text+"</div><div class='list_heart'>400</div><div class='list_time'>"+ask_time+"</div><div class='list_link' data-ids = '"+ask_id+"'><a class='ans_back'>回复</a><span>|</span><a>审核通过</a><span>|</span><a class='delet_text'>撤销</a></div></li>";
						get_print.push($ask_ans);
					}				
			 	}
			 	$(".ans_list").prepend(get_print);

	        },
	        error: function(err){
	          console.log('error:',err);
	        }
		});
});

$(function(){ 


	$(document).on('click', '.ans_back',function(){              //回复内容
			var $self = $(this).parent(); 
			var ask_ids= $self.data('ids');  console.log(ask_ids);
			$('#back_ans').show();
			$('#button_ans').bind('click',function(){
				var ans_text_send = $('#textarea_ans').val();
				var ans_name_send =$('#name_ans').val();
				if(ans_text_send==''){
					alert('请输入回复内容哦，亲！');
				}
				if(ans_name_send==''){
					alert('请输入您的尊姓大名！');
				}
				if(ans_text_send&&ans_name_send){
					var mydate = new Date();
					var up_time = mydate.getTime();
	       	 		var ans_time_send= change_time(mydate);
					var data = {id:ask_ids,name:ans_name_send,txt:ans_text_send,time:up_time};
					$.ajax({
				   	 	url:'/cmapis/postAns',
				 	    type:'POST',
					    data:data,
					    success: function(res){
					      console.log(res);
					    	$('#textarea_ans').val('');
							$('#name_ans').val('');
							$('#back_ans').hide();
							var $ans= "<div class='ans_box'><p class='ans_title'>答：</p><div class='ans_content'><span class='ans_name'>"+ans_name_send+"</span><div class='ans_text'>"+ans_text_send+"</div><div class='ans_time'>"+ans_time_send+"</div></div></div></li>";
							$self.closest('.ans_inf').append($ans);
					    },
					    error: function(err){
					      console.log('error:',err);
					      alert('回复出问题啦！');
					    }
					});						
				}		
			});
	});

	$('#ans_exit').bind('click',function(){
		$('#back_ans').hide();
		$('#textarea_ans').val('');
		$('#name_ans').val('');
	});

	$(document).on('click','.delet_text',function(){      //删除内容
		if(confirm("确定要删除数据吗？")){
			var $self = $(this).parent(); 
			var ask_ids= $self.data('ids');  console.log(ask_ids);
			var data = {id:ask_ids};
			$.ajax({
				   	 	url:'/cmapis/delQues',
				 	    type:'POST',
					    data:data,
					    success: function(res){
					      console.log(res);
					    
					      $self.closest('.ans_inf').slideUp(300).delay(800).queue(function(){
							 	$self.closest('.ans_inf').remove();
							}); 
					      },
					    error: function(err){
					      console.log('error:',err);
					    }
					});
		}
	})


});	

function change_time(t){     //将Date数据，装换成自定义时间显示格式
	var month = t.getMonth()+1;
	var date = t.getDate();
	var hour = t.getHours();
	var minute = t.getMinutes();
	var a=t.getFullYear()+"-"+addzero(month)+"-"+addzero(date)+" "+addzero(hour)+":"+addzero(minute);
	return a; 
}
 function addzero(obj)  
    {  
        if(obj<10) return "0" +""+ obj;  
        else return obj;  
    }  