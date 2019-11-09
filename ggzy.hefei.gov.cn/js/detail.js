//无附件时隐藏
if($(".ewb-info-footer").find("a").length<1){
	$(".ewb-info-footer").hide();
}


$(document).ready(function(){ 
	if(($("#zhuanzai").val()==null || $("#zhuanzai").val()==""|| $("#zhuanzai").val()=="null")&&(window.location.href.split('/')[3]=="jyxx"||window.location.href.split('/')[3]=="gggs")){
		$("#showzhuanzai").html("安徽合肥公共资源电子交易系统");
	}else{
		if($("#zhuanzai").val()==null || $("#zhuanzai").val()==""|| $("#zhuanzai").val()=="null"){
			$("#showzhuanzai").html("本网");
		}else{
			$("#showzhuanzai").html($("#zhuanzai").val());
		}
	}
	$("#showdate").html($("#infodate").val());
});


function preview(){
	    window.print();
	}
	
function detailclose(){
	    window.opener=null;
		window.open('','_self');
		window.close();
	}