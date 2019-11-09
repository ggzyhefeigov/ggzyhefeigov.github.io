$(document).ready(function(){
	//初始加载数据
	$("#showtitle").html($("#title").val());
	//$("#showdate").html($("#infodate").val());

	if(($("#zhuanzai").val()==null || $("#zhuanzai").val()==""|| $("#zhuanzai").val()=="null")&&(window.location.href.split('/')[3]=="jyxx"||window.location.href.split('/')[3]=="gggs")){
		$("#showzhuanzai").html("安徽合肥公共资源电子交易系统");
	}else{
		$("#showzhuanzai").html($("#zhuanzai").val()==null||""?"本网":$("#zhuanzai").val());
	}
	var wybm = "";
	var baomingtype = $("#baomingtype").val();
	var infoguid = $("#infoguid").val();
	var youxiaodatenew = $("#toubiaoenddate").val();
	if(youxiaodatenew!=undefined){
		youxiaodatenew = youxiaodatenew.replace(/-/g,"/");
	}
	var endTime = new Date(youxiaodatenew).getTime();
	var sys_secondnew = (endTime - new Date().getTime()) / 1000;
	var baomingurl = "http://www.hfztb.cn/ESS/memberLogin";
	if(baomingtype=="1"&&sys_secondnew>1){
		wybm = "<li class=\"ewb-sl-node\" >"+
                "<a href=\"http://www.hfztb.cn/ESS/memberLogin\" class=\"ewb-sl-ico1\" target=\"_blank\">"+
                    "<span>投标</span>"+
                "</a>"+
            "</li>";
	$('.ewb-side-link ul').prepend(wybm);
	}else if(baomingtype=="2"&&sys_secondnew>1){
		wybm = "<li class=\"ewb-sl-node\" >"+
                "<a href=\""+baomingurl+"\" class=\"ewb-sl-ico1\" target=\"_blank\">"+
                    "<span>投标</span>"+
                "</a>"+
            "</li>";
		$('.ewb-side-link ul').prepend(wybm);
	}
	
	
	var url = window.location.href,
		title=$("#title").val(),
		newurl = "/share.html?title="+title+"&url="+encodeURIComponent(url)+"";
		$(".ewb-side-link").html($(".ewb-side-link").html().replace("http://www.jiathis.com/share",newurl));
		$(".ewb-side-link").html($(".ewb-side-link").html().replace("#",newurl));
	
	$(".file").each(function(){
		if($(this).has('a').length == 0){
			$(this).find("span").append("无");
		}
	});
})