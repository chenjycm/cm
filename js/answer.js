 $("#button_ans").bind("click",function(){
       
        var ask_name=$('#name_ans').val();
        var ask_text=$('#textarea_ans').val(); 
        if(ask_text=="") {
        	alert("请输入发言内容！");
        }else{
        	if(ask_name==""){
        		alert("请输入您的名字！");
        	}else{
        		var mydate = new Date();
	       	 	var ask_time= change_time(mydate);
				
	      	 	var up_time=mydate.getTime();      //getTime是将Date数据转换成时间戳
				var data = {name:ask_name,txt:ask_text,time:up_time};
			  	$.ajax({
			   	 	url:'/cmapis/postAns',
			 	    type:'POST',
				    data:data,
				    success: function(res){
				      console.log(res);
				      // var $ask_ans="<li id ='ask-answer'><p class='ask'>问</p><div class='ask-text'><span class='asker'>"+ask_name+"</span>"+ask_text+"<div class='ask-time'>"+ask_time+"</div></div></li>";
	      	 	// 	  $("#answer").prepend($ask_ans);
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