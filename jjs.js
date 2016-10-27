$(document).ready(function(){
	
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
	       	 	var ask_time= change_time(mydate);
				
	      	 	var up_time=mydate.getTime();
				var data = {name:ask_name,txt:ask_text,time:up_time};
			  	$.ajax({
			   	 	url:'http://115.28.10.122:8888/cmapis/post',
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

 	

	$("#button_chatname").bind("click",function(){
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
			 		}	
			 });
			}
	});

	   
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
				  
		alert("本网站尚处于测试阶段，建议使用Chrome浏览器进行使用，以获得更好的用户体验！谢谢！");
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
	
	
$.ajax({ 
        url:'http://115.28.10.122:8888/cmapis/get',
        type:'GET',
        success: function(res){
            console.log(res);    //res就是一个对象数组，这里你就可以操作他了
           	//console.log("时间转换："+getTime(res[0].ask.time));
           	var tmp=new Array();
		 	for(var i=0;i<res.length;i++){
		 	    if('ans' in res[i]){
		 			var ask_name = res[i].ask.name;
					var ask_text = res[i].ask.txt;
					var a1 = new Date(res[i].ask.time)
					var ask_time = change_time(a1);  
					var ans_name = res[i].ans.name;
					var ans_text = res[i].ans.txt;
					var a2 = new Date(res[i].ans.time)
					var ans_time = change_time(a2);
					var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div><div class='answer-big'><p class='answer-da'>答</p><div class='answer-text'><span class='answerer'>"+ans_name+"</span>"+ans_text+"<div class='ask-time'>"+ans_time+"</div></div></div></li>";
					tmp.push($ask_ans);
					//$("#answer").prepend($ask_ans);
				}else{
					var ask_name = res[i].ask.name;
					var ask_text = res[i].ask.txt;
					var b = new Date(res[i].ask.time)
					var ask_time = change_time(b);
					var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div></li>";
					//$("#answer").prepend($ask_ans);
					tmp.push($ask_ans);
				}				
		 	}
		 	$("#answer").prepend(tmp);
        },
        error: function(err){
          console.log('error:',err);
        }
});

function change_time(t){
	var a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes();
	return a; 
}