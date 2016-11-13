$(document).ready(function(){

	var cur_page = 1;
	get_ask_list(1);

	//导航条对下面标题的切换

	$(document).on('click', '#message_com',function(){		
		$('.title_box').show();
		$('.title_box_2').hide();
		get_ask_list(1);

	});	
	$(document).on('click', '#sign_com',function(){		
		$('.title_box').hide();
		$('.title_box_2').show();	
		get_people_list(1);		
	});			

//88888888888888888888888888888888888888888888888888888888888888888888888888888

	       //根据点击的页面按钮，读取第几页面，并修改页码格式
	$(document).on('click', '.pages',function(){
			var $self = $(this);
			if (!$self.hasClass('active')) {
				$self.addClass('active').siblings().removeClass('active');
				cur_page= $self.val();  console.log('当前页：'+cur_page);
				get_ask_list(cur_page); 
				
			}
	});	
	$(document).on('click', '#pagesnext',function(){
		cur_page+=1;
		get_ask_list(cur_page);
 	});
 	$(document).on('click', '#pagespre',function(){
		cur_page-=1;
		get_ask_list(cur_page);
 	});
//88888888888888888888888888888888888888888888888888888888888888888888888888888
 	function get_people_list(cur_page){
 		$(".ans_list").html('');
 		$.ajax({
			    url:'/cmapis/getUsers?page=' + cur_page +'&pageSize=12',
		        type:'GET',
		        success: function(res){
		            console.log('获得用户列表:');    //res就是一个对象数组，这里你就可以操作他了
		           	console.log(res);   
		           	$(".ans_list").html('');
		          	var get_print = new Array();
				 	for(var i=0,datas=res.data.datas,l=datas.length,tmp;i<l;i++){
				 		tmp=datas[i];
				      		var p_id = tmp._id;
				 	 		var p_name = tmp.name;
							var p_sex ;
							if(tmp.sex==1){p_sex='男';}else{if(tmp.sex==2){p_sex='女';}else{ p_sex='Null';}}							
							var p_mobile = tmp.mobile;
							var p_email = tmp.email;
							var p_major = tmp.major;
							var p_degree;
							if(tmp.degree==1){p_degree='高中';}else{if(tmp.degree==2){p_degree='大专';}else{if(tmp.degree==3){p_degree='本科';}else{if(tmp.degree==4){p_degree='硕士';}else{if(tmp.degree==5){p_degree='博士';}else{p_degree='Null';}}}}}
							var p_school =  tmp.school;
							var $peo_inf="<li class='people_inf'><div class='people_name'>"+p_name+"</div><div class='people_sex'>"+p_sex+"</div><div class='people_mobile'>"+p_mobile+"</div><div class='people_email'>"+p_email+"</div><div class='people_major'>"+p_major+"</div><div class='people_degree'>"+p_degree+"</div><div class='people_school'>"+p_school+"</div></li>"
							get_print.push($peo_inf);    
					}
				 	$(".ans_list").prepend(get_print);
				 	var total_pages = res.data.totalPage; 
			 		setpages(total_pages,cur_page);
			 		$(document).scrollTop($('.mid_main').offset().top);
		        },
		        error: function(err){
		          console.log('error:',err);
		        }
		});



 	}


	function get_ask_list(cur_page){     //根据输入参数page_num，读取第几页的数据
		$.ajax({
			    url:'/cmapis/getQues?page=' + cur_page +'&pageSize=12',
		        type:'GET',
		        success: function(res){
		            console.log('获得问答列表：');    //res就是一个对象数组，这里你就可以操作他了
		           	console.log(res); 
		           	$(".ans_list").html('');
		          	var get_print = new Array();
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
				 	var total_pages = res.data.totalPage; 
			 		setpages(total_pages,cur_page);
			 		$(document).scrollTop($('.mid_main').offset().top);
		        },
		        error: function(err){
		          console.log('error:',err);
		        }
		});
					
	}
	function setpages(tp,cp){				//自动设置分页按钮，最多显示6个数字页码
		$("#bottom-button").html('');
		var get_pages = new Array();
		get_pages.push("<input id='pagespre' type='button' value='上一页'>");
		if(tp==1){}
		if(tp>1&&tp<7){						//小于7的情况：1/2/3/4/5/6按钮全部输出
			for(var i=1;i<=tp;i++){
				if(i==cp){
					get_pages.push("<input class='pages active' type='button' value='"+i+"'>")
				}else{
					get_pages.push("<input class='pages' type='button' value='"+i+"'>");
				}
			}
		}
		if(tp>=7){						//大于7的情况，除了最大和最小的数，有部分会隐藏
			if(cp<=3){				//	当前页小于4的情况，1/2/3/4/5全部显示
				for(var i=1;i<=5;i++){
					if(i==cp){
						get_pages.push("<input class='pages active' type='button' value='"+i+"'>")
					}else{
						get_pages.push("<input class='pages' type='button' value='"+i+"'>");
					}
				}
				get_pages.push("<span  class='dian'>···</span>");
				get_pages.push("<input class='pages' type='button' value='"+tp+"'>");
			}
			if(cp>=4&&cp<=tp-4){       //当前页大于4/小于（总页数-3）的时候，1显示2或者更多的隐藏了
				get_pages.push("<input class='pages' type='button' value='1'>");
				get_pages.push("<span class='dian'>···</span>");
				for(var i=(cp-1);i<=(+cp+2);i++){
					if(i==cp){
						get_pages.push("<input class='pages active' type='button' value='"+i+"'>")
					}else{
						get_pages.push("<input class='pages' type='button' value='"+i+"'>");
					}
				}
				
				get_pages.push("<span class='dian'>···</span>");
				get_pages.push("<input class='pages' type='button' value='"+tp+"'>");
			}
			if(cp>tp-4){
				get_pages.push("<input class='pages' type='button' value='1'>");
				get_pages.push("<span class='dian'>···</span>");
				for(var i=tp-4;i<=tp;i++){
					if(i==cp){
						get_pages.push("<input class='pages active' type='button' value='"+i+"'>")
					}else{
						get_pages.push("<input class='pages' type='button' value='"+i+"'>");
					}
				}			
			}			
		}
		
		get_pages.push("<input id='pagesnext' type='button' value='下一页'>");
		if(cp==1){
			get_pages.shift();
		}
		if(cp==tp){
			get_pages.pop();
		}
		$("#bottom-button").append(get_pages);
	}	  


//回复问题  ##########################################################################
	$(function(){ 
		var ask_ids;
		var $self;
		$(document).on('click', '.ans_back',function(){              //回复内容,将数据推送到服务器
				$self = $(this).parent(); 
				ask_ids= $self.data('ids');  console.log(ask_ids);
				$('#back_ans').show();
				return $self;
		}).on('click','#button_ans',function(){
				var ans_text_send = $('#textarea_ans').val();
				var ans_name_send =$('#name_ans').val();
				if(ans_text_send==''){
					alert('请输入回复内容哦，亲！');
				}else{
					if(ans_name_send==''){
						alert('请输入您的尊姓大名！');
					}else{
						var mydate = new Date();
						var up_time = mydate.getTime();
		       	 		var ans_time_send= change_time(mydate);
						var data = {id:ask_ids,name:ans_name_send,txt:ans_text_send,time:up_time};
						$.ajax({
					   	 	url:'/cmapis/postAns',
					 	    type:'POST',
						    data:data,
						    success: function(res){
						      console.log('提交回复内容：'+data);
						    	$('#textarea_ans').val('');
								$('#name_ans').val('');
								$('#back_ans').hide();
								var $ans= "<div class='ans_box'><p class='ans_title'>答：</p><div class='ans_content'><span class='ans_name'>"+ans_name_send+"</span><div class='ans_text'>"+ans_text_send+"</div><div class='ans_time'>"+ans_time_send+"</div></div></div></li>";
								$self.closest('.ans_inf').children('.ans_box').remove();
								$self.closest('.ans_inf').append($ans);
						    },
						    error: function(err){
						      console.log('error:',err);
						      alert('回复出问题啦！');
						    }
						});	
					}
				}
			});

		$('#ans_exit').bind('click',function(){
			$('#back_ans').hide();
			$('#textarea_ans').val('');
			$('#name_ans').val('');
		});


	});	

	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
		});
	function change_time(t){     //将Date数据，装换成自定义时间显示格式
		var month = t.getMonth()+1;
		var date = t.getDate();
		var hour = t.getHours();
		var minute = t.getMinutes();
		var a=t.getFullYear()+"-"+addzero(month)+"-"+addzero(date)+" "+addzero(hour)+":"+addzero(minute);
		return a; 
	}
 	function addzero(obj){  
        if(obj<10) return "0" +""+ obj;  
        else return obj;  
    }  



});