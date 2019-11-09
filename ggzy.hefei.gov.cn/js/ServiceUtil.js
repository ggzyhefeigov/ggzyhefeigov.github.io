/// <reference path="jquery-1.7.1.js"/*tpa=http://ggzy.hefei.gov.cn/js/jquery-1.7.1.js*/ />
var GlobalActionUrl = "/services/FrontAppInterFaceForWS";
var messageEFront = ["执行成功！", "请输入准确的验证码！", "该帐号已注册！", "该邮箱已注册！", "Session已过期，请重新登录！", "密码错误！"]
var AlertErrorMessage = "网站服务暂时出现异常，请稍后访问！";
/*
* 处理服务器相关的功能
*/
var ServiceUtil = function () {
    IndexArr = new Array();
    IdArr = new Array();
    tempArr = new Array();
}

/*
* 获取后台返回的webservice XML，解析return内容转换为JSON对象
*/
ServiceUtil.prototype.GetJsonData = function (mUrl, mdata) {
    var rtndata="";
    var jsonUrl = mUrl+"?response=application/json";
    $.ajax({
        type: "post",
        url: jsonUrl,
        data: mdata,
        dataType: "json",
        async:true,
        success: function (msg) {
        	if(msg!=null&&msg!=""){
        		rtndata = $.parseJSON(msg['return']);
        	}
        },
        error: function (msg) {
            //alert(AlertErrorMessage);
        }
    });
    return rtndata;
}

/*
* 获取后台返回的webservice XML，获取返回的String内容
*/
ServiceUtil.prototype.GetStringData = function (mUrl, mdata) {
    var rtndata="";
    var jsonUrl = mUrl+"?response=application/json";
    $.ajax({
        type: "post",
        url: jsonUrl,
        data: mdata,
        dataType: "json",
         async:true,
        success: function (msg) {
        	if(msg!=null&&msg!=""){
        		rtndata = msg['return'];
        	}
        },
        error: function (msg) {
            //alert(AlertErrorMessage);
        }
    });
    return rtndata;
}

/*
* 从URL中获取参数值
*/
ServiceUtil.prototype.RequestString = function (vName) {
    var mret
    var valueList = document.URL.split("?")
    if (valueList.length > 1) {
        var thisURL = "&" + valueList[1] + "&";
        var re = new RegExp("&" + vName + "=((.|\\n)*?)&", "g");
        if (re.test(thisURL) > 0) {
            var tarr = thisURL.match(re);
            var needrep = vName + "=";
            mret = tarr[0]
            mret = mret.replace(needrep, "");
            mret = mret.replace(/&/g, "");
            //参数值去除特殊字符
            mret = SpecialCharacterFilter(mret);
        }
    }
    if (mret == undefined)
        mret = "";
    return mret;
}

// 参数中特殊字符去除处理
function SpecialCharacterFilter(str){
	 var pattern = new RegExp("[!@#$^*()=|{}':;',\\[\\].<>/~！@#￥……*（）;—|{}【】‘；：”“'。，、]");
	  var newStr="";
     for (var i = 0; i < str.length; i++) { 
    	 newStr = newStr + str.substr(i, 1).replace(pattern, ''); 
     } 
     return newStr;
}
