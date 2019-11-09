/**!
 * 公告详情
 * author: wangkai
 */

(function(win, $) {

    // TAB切换,依赖于tabview.js组件
    $(".tab-view").each(function(index, el) {
        new TabView({
            dom: el,
            // 触发tab切换的事件：click|mouseover
            triggerEvent: 'mouseover',
            activeCls: 'current'
        });
    });
	$("#showdate").html($("#infodate").val());
	
	var infoid2 = $("#infoguid").val();
	var ztbtab = new ServiceUtil().RequestString("ztbtab");
    if(ztbtab != null && ztbtab != ''){
        $("#ztbtab"+ztbtab).mouseover();
		if(ztbtab!="002001001"){
			$("#showdate").html($("."+ztbtab+"infodate").val());
		}
		
    }
	
	var $target = $(".ewb-info-bd").filter('[data-id=tab-002001002]');
	$target.find(".cont_hr").each(function(index,el){
		var number = $target.find(".cont_hr").length-index;
		$(this).html("答疑变更"+number);
	});
	

	
	var tabbody = $('.ewb-info-bd');
	var tabName = $('.ewb-info-tabname');
	var tabbody_single = "";
	for(var i=0;i<tabbody.length;i++){
		tabbody_single = tabbody.eq(i).text().replace(/\s+/g,"");
		if(tabbody_single==""||tabbody_single==null){
			tabbody.eq(i).html("此流程暂无信息");
		}
	} 
	if(ztbtab=="002001002"){
		$("#viewGuid").empty().html("澄清/变更公告");
		tabbody_single=tabbody.eq(1).text().replace(/\s+/g,"");
		if(tabbody_single==""||tabbody_single==null||tabbody_single=="此流程暂无信息"){
			getInfocontent(ztbtab,infoid2,1);
		}
	}else if(ztbtab=="002001003"){
		$("#viewGuid").empty().html("中标候选人公示");
		tabbody_single=tabbody.eq(2).text().replace(/\s+/g,"");
		if(tabbody_single==""||tabbody_single==null||tabbody_single=="此流程暂无信息"){
			getInfocontent(ztbtab,infoid2,2);
		}
	}else if(ztbtab=="002001004"){
		$("#viewGuid").empty().html("中标公告");
		tabbody_single=tabbody.eq(3).text().replace(/\s+/g,"");
		if(tabbody_single==""||tabbody_single==null||tabbody_single=="此流程暂无信息"){
			getInfocontent(ztbtab,infoid2,3);
		}
	}else if(ztbtab=="002001005"){
		$("#viewGuid").empty().html("合同及履约");
		tabbody_single=tabbody.eq(4).text().replace(/\s+/g,"");
		if(tabbody_single==""||tabbody_single==null||tabbody_single=="此流程暂无信息"){
			getInfocontent(ztbtab,infoid2,4);
		}
	}
    //使置灰的tab按钮不能使用
    /* var tabName = $('.ewb-info-tabname');
    tabName.each(function(index, el) {
        var _this = $(this);
        if (_this.hasClass('not-use')) {
            _this.attr('data-role', '');
            _this.attr('data-target', '');
        }
    }); */

	var youxiaodate = $("#youxiaodate").val();
	
    //倒计时
    countDown(youxiaodate); //这里模拟了一下报名日期

    function countDown(time) {

        var $day = $('#day'),
            $hour = $('#hour'),
            $minute = $('#minute'),
            endTime = new Date(time).getTime(), //月份是实际月份-1
            sys_second = (endTime - new Date().getTime()) / 1000;
        var timer = setInterval(function() {
				var $countdown = $('.ewb-countdown'),
                    $cdRmind = $('.ewb-cd-tt span');
            if (sys_second > 1) {
                sys_second -= 1;
                var day = Math.floor((sys_second / 3600) / 24);
                var hour = Math.floor((sys_second / 3600) % 24);
                var minute = Math.floor((sys_second / 60) % 60);
                $day && $day.text(day); //计算天
                $hour.text(hour < 10 ? "0" + hour : hour); //计算小时
                $minute.text(minute < 10 ? "0" + minute : minute); //计算分钟

                
                if (day == 0 && hour == 0 && minute == 0) {
                    $countdown.addClass('end');
                    $cdRmind.text("开标已结束");
                    clearInterval(timer);
                } else {
                    $countdown.removeClass('end');
                    $cdRmind.text("开标倒计时");
                }

            } else {
				$day.text("0"); //计算天
                $hour.text("0"); //计算小时
                $minute.text("0"); //计算分钟
				$countdown.addClass('end');
                $cdRmind.text("开标已结束");
                clearInterval(timer);

            }

        }, 1000);

    }
	
	
	
	if(infoid2 != null && infoid2 !=''){
        validateJsonFile(infoid2);
    }else{
		getProjectProcess(infoid2,"JSGC");
	}
	
	    //验证文件地址
function validateJsonFile(id){

    var jsonpath = "/ztbjson/detailjson/tableinfodetail/"+id+".json";
              $.ajax({
                url: jsonpath,
                type: 'HEAD',
                error: function () {
                     //文件不存在，请求接口生成文件
                     getProjectProcess(id,"JSGC");
                },
                success: function () {
                    //文件存在,验证是否有效
                    validateYouxiaojson(jsonpath,600000,id);

                }
            });
    };
	var milliseconds = new Date().getTime();
	//验证有效json
    function  validateYouxiaojson(jsonpath,time,id){
                $.ajax({
                            url:jsonpath,
                            type:"get",
                            dataType:"text",
                            async:false,
							cache:false,
                            success:function(msg){
                                if(msg != null && msg != ""){
                                    var expireTime = msg.substr(0,msg.indexOf("expireTime"));;
                                    if(milliseconds-parseInt(expireTime)<time){
										var msg2 = {};
										msg2.custom = msg;
                                        getProjectProcesssuccess(msg2);
                                    }else{
                                        getProjectProcess(id,"JSGC");
                                    }
                                }
                            },
                            error:function(e){
                                console.log(e);
                            }
                    });
    };
	
	function getProjectProcess(noticeid,projecttype) {
		$.ajax({
			type : "POST",
			url : siteInfo.projectName + "/getZtbProjectProcess.action?cmd=getProjectProcess",
			data: {
                    "infoid": noticeid,
                    "projecttype": projecttype
                },
			dataType : "json",
			success: function (msg) { // 返回数据后处理
				getProjectProcesssuccess(msg);
			}
		});
	}
	
	function getProjectProcesssuccess(msg){
		if(msg != null && msg != ""){
					msg.custom = msg.custom.substr(msg.custom.indexOf("expireTime")+10,msg.custom.length);
					//console.log(msg.custom);
					var obj = JSON.parse(msg.custom);
					var str = "<ul class=\"clearfix\">";
					if(obj.KaiPingBiaoDate!=null&&obj.KaiPingBiaoDate!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">预约场地</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">01</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">预约场地</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">01</span>"+
								"</li>";
					}
					if(obj.ZhaoBiaoGGDate!=null&&obj.ZhaoBiaoGGDate!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">招标公告发布</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">02</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">招标公告发布</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">02</span>"+
								"</li>";
					}
					if(obj.ZhaoBiaoFile!=null&&obj.ZhaoBiaoFile!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">招标文件发布</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">03</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">招标文件发布</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">03</span>"+
								"</li>";
					}
					
					if(obj.ZhongBiaoGSDate!=null&&obj.ZhongBiaoGSDate!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">中标公示</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">04</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">中标公示</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">04</span>"+
								"</li>";
					}
					if(obj.ZhongBiaoBook!=null&&obj.ZhongBiaoBook!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">中标通知书</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">05</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">中标通知书</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">05</span>"+
								"</li>";
					}
					if(obj.HeTongJZ!=null&&obj.HeTongJZ!=""){
						str+="<li class=\"ewb-nl-node current\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">合同见证</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">06</span>"+
								"</li>";
					}else{
						str+="<li class=\"ewb-nl-node\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">合同见证</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">06</span>"+
								"</li>";
					}
						str+="<li class=\"ewb-nl-node last\">"+
									"<div class=\"ewb-nl-info\">"+
										"<span class=\"ewb-nl-name\">项目履约</span>"+
										
									"</div>"+
									"<span class=\"ewb-nl-number\">07</span>"+
								"</li>";
					str+="</ul>";
					$("#shouprocess").html(str);
				}
	}
	
	
	function getInfocontent(categorynum,infoidnew,num){
		$.ajax({
			type : "POST",
			url : siteInfo.projectName + "/hfggzyGetGgInfo.action?cmd=getZtbInfocontent",
			data: {
					"siteguid": siteInfo.siteGuid,
                    "Categorynum": categorynum,
                    "infoid": infoidnew
                },
			dataType : "json",
			success: function (msg) { // 返回数据后处理
				tabbody.eq(num).html(msg.custom);
			}
		});
	}


}(this, jQuery))

function baoming(){
	var infoid = $("#infoguid").val();
	var url = "http://localhost:8080/index.html?infoid="+infoid;
	window.open(url);
}

function preview(){
		var oldstr = window.document.body.innerHTML;
		$('.ewb-info-main').attr("style","width:998px");
		$('.preview_box').attr("style","width:998px");
		var printData = $('.ewb-info-bd').eq($(".ewb-info-tabname.current").index()).html();
		window.document.body.innerHTML = printData; 
		window.print(); 
		window.location.reload();
	}
