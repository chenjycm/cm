$(document).ready(function(){
	alert("本网站尚处于测试阶段，建议使用Chrome浏览器进行使用，以获得更好的用户体验！谢谢！");	
	get_ask_list(1);

    $("#button3").bind("click",function(){
        var ask_name=$('#input_name').val();
        var ask_text=$('#textarea1').val(); 
        if(ask_text=="") {
        	alert("请输入发言内容！");
        }else{
        	if(ask_name==""){
        		alert("请输入您的名字！");
        	}else{
        		var mydate = new Date();
	       	 	var ask_time= change_time(mydate);			//这个用于显示	
	      	 	var up_time=mydate.getTime();      //getTime是将Date数据转换成时间戳,这个时间用于上传
				var data = {name:ask_name,txt:ask_text,time:up_time};
			  	$.ajax({
			   	 	url:'/cmapis/postQues',
			 	    type:'POST',
				    data:data,
				    success: function(res){
				      console.log(res);
				      var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div></li>";
	      	 		  $("#answer").prepend($ask_ans);
				    },
				    error: function(err){
				      console.log('error:',err);
				      alert("网络故障，提问未提交");
				    }
				});
	      	 	$("#textarea1").val("");
				$("#input_name").val("");
        	}
        }
    });

 	$("#button1").bind("click",function(){
 		var inputName=$('#in_name').val();
 		var inputGender=$('#in_gender').val(); 
 		var inputTeleph=$('#in_teleph').val();
		var inputEmail=$('#in_email').val();
		var inputMajor=$('#in_major').val();
		var inputEdu=$('#in_edu').val();        //find("option:selected").text();返回的值为option选中的值，而不是value=0,1,2
		var inputSchool=$('#in_school').val();
		if(inputName==""&inputGender==""&inputTeleph==""&inputEmail==""&inputMajor==""&inputEdu==""&inputSchool==""){
			alert("未输入任何信息，请填写完整后提交！");
		}else{
			var inputInfor={name:inputName,gender:inputGender,teleph:inputTeleph,email:inputEmail,major:inputMajor,edu:inputEdu,school:inputSchool};
			//name:"inputName",gender:"inputGender",teleph:inputTeleph,email:inputEmail,major:inputMajor,edu:inputEdu,school:inputSchool
			console.log("输入的值:");
			console.log(inputInfor);
			alert("提交信息：\n姓名："+inputInfor.name+"\n性别："+inputInfor.gender+"\n电话："+inputInfor.teleph+"\n邮箱："+inputInfor.email+"\n专业："+inputInfor.major+"\n学历："+inputInfor.edu+"\n学校："+inputInfor.school);
			$("#in_name").val("");
			$("#in_gender").val("");
			$("#in_teleph").val("");
			$("#in_email").val("");
			$("#in_major").val("");
			$("#in_edu").val("");
			$("#in_school").val("");
			}
 	});

	$(function(){ 
		$("#chat_name_in").keydown(function(event){ 
			if(event.keyCode==13){ 
			$("#button_chatname").click(); 
			} 
		}); 

		$("#button_chatname").click(function(){ 
			var chat_name_text=$("#chat_name_in").val();
			console.log("聊天昵称："+chat_name_text);
			if(chat_name_text==""){
				alert("请输入昵称再发言！")
				return;
			}else{
				$('#right_login_box,#right_chat_box').toggle();
				$("#button2").bind("click",function(){
			 		var chat_text=$("#send_right").val();
			 		if(chat_text==""){ 
			 			return;
			 		}else{
			 			var times= new Date();
			 			var chat_time=change_time(times);
			 			var $chat_html="<li class='chats'><p class='xuesheng'>"+chat_name_text+"</p>"+chat_text+"<br/><p class='time-right'>"+chat_time+"</p></li>";
			 			$("#right2").append($chat_html);
			 			$("#right2").scrollTop($("#right2")[0].scrollHeight);
			 			$("#send_right").val("");
				 		}	
				 });
				}
		}); 
	}) 
 	

		FreshTime();
		var sh;        
		sh = setInterval(FreshTime, 1000); // 每秒钟执行一次

		$(document).on('click', '.tab',function(){
			var $self = $(this);
			if (!$self.hasClass('active')) {
			$self.addClass('active').siblings().removeClass('active');
			$('.list1,.list2').toggle();
			}
		});			  

});		

function FreshTime() {
	 var endtime = new Date("2017/1/28,12:00:00");//结束时间            
	 var nowtime = new Date();//当前时间           
	 var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000); // 剩余时间            
	 d = parseInt(lefttime / 3600 / 24);   // 剩余天数            
	 h = parseInt((lefttime / 3600) % 24); // 剩余小时数            
	 m = parseInt((lefttime / 60) % 60); // 剩余分钟数  
	 s = parseInt(lefttime % 60); 
	 // var $left_time = "<div>仅剩<span >"+d+"</span>天<span>"+h+"</span>时<span>"+m+"</span>分<span>"+s+"</span>秒</div>";
	 // $("#lefttime").append(left_time);
	document.getElementById("lefttime").innerHTML = "剩余<span>"+d+"</span> 天<span>" + h + "</span>小时<span>"  + m + "</span>分<span>" + s + "</span>秒";
}      

$(function(){        //根据点击的页面按钮，读取第几页面，并修改页码格式
		 $(document).on('click', '.pages',function(){
			var $self = $(this);
			if (!$self.hasClass('active')) {
			$self.addClass('active').siblings().removeClass('active');
			var a = $self.val(); 
			get_ask_list(a);
			$(document).scrollTop($('.question').offset().top);
			}
		});
});	


function get_ask_list(page_num){     //根据输入参数page_num，读取第几页的数据
		$.ajax({
			    url:'/cmapis/getQues?page=' + page_num +'&pageSize=6',
		        type:'GET',
		        success: function(res){
		            console.log(res.data.datas);    //res就是一个对象数组，这里你就可以操作他了
		           	$("#answer").html('');
		             var get_print=new Array();
				 	 for(var i=0,datas=res.data.datas,l=datas.length;i<l;i++){
				 	 	tmp=datas[i];
				      if('ans' in tmp){
				 	 		var ask_name = tmp.ask.name;
							var ask_text = tmp.ask.txt;
							var a1 = new Date(tmp.ask.time)       //Date(time)将时间戳time转化成Date数据
							var ask_time = change_time(a1);  					//change_time将Date数据转化成自定义数据
							var ans_name = tmp.ans.name;
							var ans_text = tmp.ans.txt;
							var a2 = new Date(tmp.ans.time)
							var ans_time = change_time(a2);
							var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div><div class='answer-big'><p class='answer-da'>答</p><div class='answer-text'><span class='answerer'>"+ans_name+"</span>"+ans_text+"<div class='ask-time'>"+ans_time+"</div></div></div></li>";
							get_print.unshift($ask_ans);
						}else{
							var ask_name = tmp.ask.name;
							var ask_text = tmp.ask.txt;
							var b = new Date(tmp.ask.time)
							var ask_time = change_time(b);
							var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div></li>";
							get_print.unshift($ask_ans);
						}				
				 	}
				 	$("#answer").prepend(get_print);
		        },
		        error: function(err){
		          console.log('error:',err);
		        }
		});
				
}
function change_time(t){     //将Date数据，装换成自定义时间显示格式
	var a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes();
	return a; 
}