//----------------------------------------------------------------------
//名称：ABT(Accessibility Browser Tool) v3.2
//     无障碍辅助浏览工具条第三版
//说明：多语言版本整合
//开发：Scorpio
//日期：2012/08/23
//----------------------------------------------------------------------

//------------------------------------------------------------
//*************************初始化部分**************************
//------------------------------------------------------------
//加载配置文件--------------------------------------
function loadConfig(){
	var ABTFileUrl = document.getElementById("ABT").getAttribute("src");
	URLPrefix = "";
	if(ABTFileUrl.indexOf("/")!=-1){URLPrefix = ABTFileUrl.substring(0,ABTFileUrl.lastIndexOf("/")+1);}
	else{URLPrefix = "";}
	var language = document.getElementsByTagName("HTML")[0].getAttribute("lang");
	if(language){langCode = language=="zh_CN"?"cn":language;}
	else{langCode = "cn";}
	document.write("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+URLPrefix+"config/config_"+langCode+".js\"></script>");
	document.write("<script type=\"text/javascript\" charset=\"UTF-8\" src=\""+URLPrefix+"pinyin/pinyin.js\"></script>");
	document.write("<link rel=\"stylesheet\" type=\"text/css\" charset=\"UTF-8\" id=\"ABTStyle\" href=\""+URLPrefix+"skins/jinganGov/skin_"+langCode+".css\" />");
	var ABTBG = new Image();
	ABTBG.src =URLPrefix+"skins/jinganGov/images/newbg.gif";
}
loadConfig();
//页面加载完毕运行----------------------------------
if(window.addEventListener){window.addEventListener("load",Initialization,false);}
else{window.attachEvent("onload",Initialization);}
//工具条初始化--------------------------------------
var pageLoaded = false;
function Initialization(){
	pageLoaded = true;
	declareConfig();
	if(ABTConfig.mainSwitch){
		browserTypeCheck();
		getElements(ABTConfig.container);
		iframeKeyListenerWrite();
		toolbar.skin = ABTConfig.defaultSkin;
		toolbar.cookie.readCookie();
	}
}
//键盘事件监听--------------------------------------
document.onkeydown = function keyListener(e){
	if(!pageLoaded){return;}
	var currkey=0,e=e||event;
	currkey=e.keyCode||e.which||e.charCode;
	toolbar.keyboardListener(e.ctrlKey,e.altKey,e.shiftKey,currkey);
}
//------------------------------------------------------------
//************************公用函数部分**************************
//------------------------------------------------------------
//浏览器类型判断函数--------------------------------
function browserTypeCheck(){
	browserType = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? browserType.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? browserType.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? browserType.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? browserType.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? browserType.safari = s[1] : 0;
}
//公用节点获取函数----------------------------------
function getElements(elementId){
	getE = new Object();
	if(document.getElementById(elementId)){
		getE.container = document.getElementById(elementId);
		getE.allElements = getE.container.getElementsByTagName("*");
		getE.allImg = getE.container.getElementsByTagName("img");
		getE.allFrame = getE.container.getElementsByTagName("iframe");
		getE.allStyle = document.getElementsByTagName("head")[0].getElementsByTagName("link");
		getE.allScript= document.getElementsByTagName("head")[0].getElementsByTagName("script");
		getE.error = false;
	}
	else{getE.error = true;}
}
//文字键盘码处理函数--------------------------------
function keyCodeStringHandle(keyString){
	var thisKeyString = "";
	thisKeyString += String(keyString.toUpperCase().indexOf("CTRL")>-1?1:0);
	thisKeyString += String(keyString.toUpperCase().indexOf("ALT")>-1?1:0);
	thisKeyString += String(keyString.toUpperCase().indexOf("SHIFT")>-1?1:0);
	thisKeyString += keyString.toUpperCase().substring(keyString.toUpperCase().lastIndexOf("+")+1);
	return thisKeyString;
}
//跳转节点建立函数----------------------------------
function skipElementBuild(element,elementText){
	if(!element){return;}
	var shipElement = document.createElement("div");
	shipElement.setAttribute("class",ABTConfig.skipClassName);
	shipElement.style.cssText = "width:0px;height:0px;font-size:0px;line-height:0px;";
	shipElement.innerHTML = "<a href=\"javascript:\" title=\""+elementText+"\" onblur=\"skipElementRemove(this)\">"+elementText+"</a>";
	element.parentNode.insertBefore(shipElement,element);
	window.setTimeout(function(){shipElement.firstChild.focus();},10);
}
//跳转节点删除函数----------------------------------
function skipElementRemove(skipElement){skipElement.parentNode.parentNode.removeChild(skipElement.parentNode);}
//获取文本功能函数----------------------------------
function getText(element){
	var elementText;
	if (element.nodeName == "H1" || element.nodeName == "H2" || element.nodeName == "H3" || element.nodeName == "H4" || element.nodeName == "H5" || element.nodeName == "H6") {
	    if (element.firstChild.nodeName == "#text") {
	        if (element.firstChild.nodeValue.trim() == "") {
	            if (element.childNodes.length > 1) {
	                element = element.childNodes[1];
	            } else {
	                element = element.firstChild;
	            }
	        }
	        else {
	            element = element.firstChild;
	        }
	    }
	    else {
	        element = element.firstChild;
	    }
	    

	}
	if(element.nodeName=="#text"){elementText=element.nodeValue;}
	else if(element.nodeName=="IMG"){
		if(element.getAttribute("alt")){elementText=element.getAttribute("alt");}
		else if(element.getAttribute("title")){elementText=element.getAttribute("title");}
		else{elementText=document.title;}
	}
	else{elementText=element.innerText||element.textContent;}
	return elementText;
}
//iframe键盘监听函数--------------------------------
function iframeKeyListenerWrite(){
	if(getE.error){return;}
	for(var i=0;i<getE.allFrame.length;i++){
		var iframeDOM = getE.allFrame[i].contentWindow;
		try{
			var scriptElement = iframeDOM.document.createElement("script");
			scriptElement.setAttribute("type","text/javascript");
			scriptElement.text = "document.onkeydown = function(e){var e=e||event;document.parentWindow.parent.keyListener(e);}";
			iframeDOM.document.getElementsByTagName("head")[0].appendChild(scriptElement);
		}catch(e){}
	}
}
//------------------------------------------------------------
//*************************工具条部分**************************
//------------------------------------------------------------
var toolbar = new Object();
//工具条键盘监听------------------------------------
toolbar.keyboardListener = function(ctrlKey,altKey,shiftKey,otherKey){
	if(getE.error){return;}
	var keyNum = "";
	keyNum += String(ctrlKey?1:0);
	keyNum += String(altKey?1:0);
	keyNum += String(shiftKey?1:0);
	for(var a in toolbar.Function){
		try{toolbar.Function[a].keyTrigger(keyNum+String.fromCharCode(otherKey).toUpperCase());}catch(f){}
	}
}
//工具条cookie存取----------------------------------
toolbar.cookie = new Object();
toolbar.cookie.setCookie = function(cookieName,cookieValue){
	if(cookieName==undefined||cookieValue==undefined){return;}
	var Days = ABTConfig.cookieTime;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = cookieName+"="+ escape(cookieValue)+";expires="+exp.toGMTString()+";path=/;";
}
toolbar.cookie.getCookie = function(name){
	if(name==undefined){return;}
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
toolbar.cookie.readCookie = function(){
	if(!ABTConfig.cookieSwitch||getE.error){return;}
	for(var a in toolbar.Function){
		try{toolbar.Function[a].cookieMethod();}catch(e){};
	}
}
//--------------------------------------------------
//*****************工具条具体功能部分*****************
//--------------------------------------------------
toolbar.Function = new Object();
//区域跳转功能--------------------------------------
toolbar.Function.areaSkip = {
    keyTrigger: function (keyString) {
		var customizeAreaSkip = ABTConfig.areaSkip.delimit;
		for(var a=0;a<customizeAreaSkip.length;a++){
			if(keyString==keyCodeStringHandle(customizeAreaSkip[a].split(":")[2])){
				toolbar.Function.areaSkip.mainMethod(customizeAreaSkip[a].split(":")[0],customizeAreaSkip[a].split(":")[1]);
			}
		}
	},
	mainMethod:function(areaId,elementText){
		if(!ABTConfig.areaSkip.functionSwitch){return;};
		if (langCode == "cn") {
			if(document.getElementById(areaId)){skipElementBuild(document.getElementById(areaId),elementText);}
			else{
				var newPromptText = "当前页面无"+elementText.substring(5)+"，已为您跳转到页面头部区域";
				skipElementBuild(document.getElementById("skip"),newPromptText);
			}
		}
		else{skipElementBuild(document.getElementById(areaId),elementText);}
	}
}
//自定义跳转功能------------------------------------
toolbar.Function.customSkip = {
	keyTrigger:function(keyString){
		var nextKeyCode = ABTConfig.customSkip.nextKeyCode;
		var previousKeyCode = ABTConfig.customSkip.previousKeyCode;
		for(var a=0;a<nextKeyCode.length;a++){if(keyString==keyCodeStringHandle(nextKeyCode[a])){toolbar.Function.customSkip.mainMethod(0);};};
		for(var a=0;a<previousKeyCode.length;a++){if(keyString==keyCodeStringHandle(previousKeyCode[a])){toolbar.Function.customSkip.mainMethod(1);};};
	},
	getCustomSkip:function(){
		var switchValue = ABTConfig.customSkip.delimit;
		var allCustomElement = new Array();
		var allColumnNum = 0;
		for(var a=0;a<getE.allElements.length;a++){
			for(var b=0;b<switchValue.length;b++){
				var tempVar = switchValue[b].split(":");
				if ((tempVar[0] == "tagName" && getE.allElements[a].nodeName == tempVar[1]) || (tempVar[0] == "tagId" && getE.allElements[a].getAttribute("id") == tempVar[1])) {
				    if (getE.allElements[a].offsetHeight + getE.allElements[a].offsetWidth!=0) {
					allCustomElement[allColumnNum]={
                        element:getE.allElements[a],
                        elementTips:tempVar[2],
                        elementType:tempVar[0]
                    }
					}
					allColumnNum++;
				}
			}
		}
		return allCustomElement;
	},
	firstRun:true,
	customElementGroup:new Array(),
	nowElementNum:-1,
	mainMethod:function(skipDirection){
		if(!ABTConfig.customSkip.functionSwitch){return;};
		if(this.firstRun){
			this.customElementGroup = this.getCustomSkip();
			this.firstRun = false;
		}
		if(skipDirection==0){
			this.nowElementNum++;
			if(this.nowElementNum>this.customElementGroup.length-1){this.nowElementNum=this.customElementGroup.length-1;}
		}
		else if(skipDirection==1){
			this.nowElementNum--;
			if(this.nowElementNum<0){this.nowElementNum=0;}
		}
		if(this.customElementGroup.length==0){return;}
		var nodeText = "";
		if(this.customElementGroup[this.nowElementNum].elementType!="tagId"){
			nodeText = getText(this.customElementGroup[this.nowElementNum].element);
			if(nodeText==undefined){nodeText="";}
		}
		nodeText += this.customElementGroup[this.nowElementNum].elementTips;
		skipElementBuild(this.customElementGroup[this.nowElementNum].element,nodeText);
	}
}

//语音模式功能------------------------------------
/*toolbar.Function.overSoundMode = {
    showHTML: function () {
        if (ABTConfig.overSoundMode.functionSwitch) {
            var buttonText = this.overSoundModeState ? ABTConfig.language.overSoundMode.on : ABTConfig.language.overSoundMode.off;
            return "<li id=\"overSoundModebutton\"><a href=\"javascript:toolbar.Function.overSoundMode.mainMethod()\">" + buttonText + "</a></li>";
        }
        else { return "" }
    },
    cookieName: "overSoundModeState",
    cookieMethod: function () {
        if (ABTConfig.overSoundMode.cookieSwitch && toolbar.cookie.getCookie(this.cookieName) == 1) {
            toolbar.Function.overSoundMode.mainMethod();
        }
    },
    resetCookie: function () { toolbar.cookie.setCookie(this.cookieName, 0); },
    overSoundModeState: false,
    mainMethod: function () {
        if (!ABTConfig.overSoundMode.functionSwitch || getE.error) { return; };
        if (!this.overSoundModeState) {
            if (document.getElementById("overSoundModebutton")) { document.getElementById("overSoundModebutton").getElementsByTagName("a")[0].innerHTML = ABTConfig.language.overSoundMode.on; }
            this.overSoundModeState = true;
            toolbar.cookie.setCookie(this.cookieName, this.overSoundModeState ? 1 : 0);
            startSoundMode();
        }
        else {
            if (document.getElementById("overSoundModebutton")) { document.getElementById("overSoundModebutton").getElementsByTagName("a")[0].innerHTML = ABTConfig.language.overSoundMode.off; }
            this.overSoundModeState = false;
            toolbar.cookie.setCookie(this.cookieName, this.overSoundModeState ? 1 : 0);
            window.location.href = window.location.href;
            window.location.reload();
        }

    }
}*/

//纯文本模式功能------------------------------------
toolbar.Function.textMode = {
	showHTML:function(){
		if(ABTConfig.textMode.functionSwitch){
			var buttonText = this.textModeState?ABTConfig.language.textMode.on:ABTConfig.language.textMode.off;
			return "<li id=\"textmodebutton\"><a href=\"javascript:toolbar.Function.textMode.mainMethod()\">"+buttonText+"</a></li>";
		}
		else{return ""}	
	},
	keyTrigger:function(keyString){
		var shortcuts = ABTConfig.textMode.KeyCode;
		for(var a=0;a<shortcuts.length;a++){if(keyString==keyCodeStringHandle(shortcuts[a])){toolbar.Function.textMode.mainMethod();};};
	},
	cookieName:"textModeState",
	cookieMethod:function(){
		if(ABTConfig.textMode.cookieSwitch&&toolbar.cookie.getCookie(this.cookieName)==1){
			toolbar.Function.textMode.mainMethod();
		}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,0);},
	textModeState:false,
	mainMethod:function(){
		if(!ABTConfig.textMode.functionSwitch||getE.error){return;};
		if(!this.textModeState){
			getE.container.style.display = "none";
			for(var c=0;c<getE.allFrame.length;c++){
				var iframeDOM = getE.allFrame[c].contentWindow;
				var newFrameContainer = document.createElement("div");
				try{newFrameContainer.innerHTML = iframeDOM.document.body.innerHTML;}catch(z){}
				getE.allFrame[c].parentNode.insertBefore(newFrameContainer,getE.allFrame[c]);
			}
			while(getE.allFrame.length){getE.allFrame[0].parentNode.removeChild(getE.allFrame[0]);}
			for(var d=0;d<getE.allImg.length;d++){
				var newImgContainer = document.createElement("span");
				newImgContainer.innerHTML = getText(getE.allImg[d]);
				getE.allImg[d].parentNode.insertBefore(newImgContainer,getE.allImg[d]);
			}
			while(getE.allImg.length){getE.allImg[0].parentNode.removeChild(getE.allImg[0]);}
			var textModeStyleUrl = URLPrefix+"/skins/textMode.css";
			for(var a=0;a<getE.allStyle.length;a++){
				if(getE.allStyle[a].getAttribute("id")!="ABTStyle"){
					getE.allStyle[a].setAttribute("href","#");
				}
			}
			var textModeStyle = document.createElement("link");
			textModeStyle.setAttribute("rel","stylesheet");
			textModeStyle.setAttribute("type","text/css");
			textModeStyle.setAttribute("href",textModeStyleUrl);
			document.getElementsByTagName("head")[0].appendChild(textModeStyle);
			
			for(var b=0;b<getE.allElements.length;b++){getE.allElements[b].style.height = null;};
			if(document.getElementById("textmodebutton")){document.getElementById("textmodebutton").getElementsByTagName("a")[0].innerHTML = ABTConfig.language.textMode.on;};
			getE.container.style.display = "block";
			this.textModeState = true;
			toolbar.cookie.setCookie(this.cookieName,this.textModeState?1:0);
			//	读屏提示
			if(langCode=="cn"){skipElementBuild(document.body.firstChild,"您当前处于纯文本模式，可以ALT+SHIFT+J返回可视化模式");}
		}
		else{
			this.textModeState = false;
			toolbar.cookie.setCookie(this.cookieName,this.textModeState?1:0);
			window.location.href=window.location.href;
			window.location.reload();
		}
	}
}
//页面缩放功能--------------------------------------
toolbar.Function.pageZoom = {
	showHTML:function(){
		if(ABTConfig.pageZoom.functionSwitch){
			return "<li id=\"pagezoomin\"><a href=\"javascript:toolbar.Function.pageZoom.mainMethod(1)\">"+ABTConfig.language.pageZoom.zoomIn+"</a></li><li id=\"pagezoomout\"><a href=\"javascript:toolbar.Function.pageZoom.mainMethod(0)\">"+ABTConfig.language.pageZoom.zoomOut+"</a></li>";
		}
		else{return "";}
	},
	cookieName:"pageZoomState",
	cookieMethod:function(){
		if(!ABTConfig.pageZoom.cookieSwitch){return;}
		var cookieValue = toolbar.cookie.getCookie(this.cookieName);
		if(cookieValue>1){
			cookieValue -= ABTConfig.pageZoom.onceZoom;
			this.pageZoomState = cookieValue;
			toolbar.Function.pageZoom.mainMethod(1);
		}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,1);},
	pageZoomState:1,
	firstRun:true,
	mainMethod:function(zoomMode){
		if(!ABTConfig.pageZoom.functionSwitch||getE.error){return;};
		if(zoomMode==1){
			this.pageZoomState = (this.pageZoomState*10+ABTConfig.pageZoom.onceZoom*10)/10;
			if(this.pageZoomState>ABTConfig.pageZoom.Max){this.pageZoomState = ABTConfig.pageZoom.Max;}
		}
		else if(zoomMode==0){
			this.pageZoomState = (this.pageZoomState*10-ABTConfig.pageZoom.onceZoom*10)/10;
			if(this.pageZoomState<ABTConfig.pageZoom.Min){this.pageZoomState = ABTConfig.pageZoom.Min;}
		}
		var containerWidth = getE.container.offsetWidth;
		var containerHeight = getE.container.offsetHeight;
		getE.container.style.display = "none";
		if(browserType.ie&&browserType.ie!="9.0"){
			if(document.body.offsetWidth>containerWidth*this.pageZoomState){
				getE.container.style.cssText = "position:absolute;left:50%;margin:0px;";
				getE.container.style.marginLeft = 0-Math.round(containerWidth*this.pageZoomState/2)+"px";
			}
			else{getE.container.style.cssText = "position:absolute;left:0px;margin:0px;";}
			getE.container.style.zoom = this.pageZoomState;
		}
		else{
			var containerX = Math.round(((containerWidth*this.pageZoomState-containerWidth)/this.pageZoomState)/2);
			var containerY = Math.round(((containerHeight*this.pageZoomState-containerHeight)/this.pageZoomState)/2);
			var boxTranslate;
			if(containerWidth*this.pageZoomState>document.body.offsetWidth){
				var fuck = (containerWidth*this.pageZoomState-document.body.offsetWidth)/2;
				boxTranslate=Math.round(fuck/this.pageZoomState);
			}
			else{boxTranslate=0;}
			var hackCSS = "";
			if(browserType.firefox){hackCSS = "-moz-";};
			if(browserType.chrome||browserType.safari){
				hackCSS = "-webkit-";
				document.body.style.height = Math.round(containerHeight*this.pageZoomState)+"px";
				var bodyWidth;
				var oldBodyWidth = document.body.offsetWidth;
				if(oldBodyWidth<containerWidth*this.pageZoomState&&zoomMode==1){
					bodyWidth = Math.round((containerWidth*this.pageZoomState-oldBodyWidth)/this.pageZoomState);
					document.body.style.width = Math.round(containerWidth*this.pageZoomState)+"px";
					boxTranslate -= bodyWidth/2;
				}
				if(zoomMode==0){
					if(screen.width>containerWidth*this.pageZoomState){document.body.style.width = null;}
					else{document.body.style.width = Math.round(containerWidth*this.pageZoomState)+"px";}
				}
			}
			if(browserType.opera){hackCSS = "-o-";};
			if(browserType.ie=="9.0"){hackCSS = "-ms-";};
			getE.container.style.cssText = hackCSS+"transform:scale("+this.pageZoomState+") translate("+boxTranslate+"px,"+containerY+"px);";
		}
		if(this.pageZoomState==1){
			getE.container.style.cssText = null;
			document.body.style.width = null;
		}
		getE.container.style.display = "block";
		toolbar.cookie.setCookie(this.cookieName,this.pageZoomState);
	}
}
//字体缩放功能--------------------------------------
toolbar.Function.fontZoom = {
	showHTML:function(){
		if(ABTConfig.fontZoom.functionSwitch){
			return "<li id=\"fontzoomin\"><a href=\"javascript:toolbar.Function.fontZoom.mainMethod(1)\">"+ABTConfig.language.fontZoom.zoomIn+"</a></li><li id=\"fontzoomout\"><a href=\"javascript:toolbar.Function.fontZoom.mainMethod(0)\" onfocus=\"toolbar.Function.hightContrast.openMenu(1)\">"+ABTConfig.language.fontZoom.zoomOut+"</a></li>";
		}
		else{return "";}
	},
	cookieName:"fontZoomState",
	cookieMethod:function(){
		if(!ABTConfig.fontZoom.cookieSwitch){return;}
		var cookieValue = toolbar.cookie.getCookie(this.cookieName);
		if(cookieValue!=0){
			this.fontZoomState = cookieValue-ABTConfig.fontZoom.onceZoom;
			toolbar.Function.fontZoom.mainMethod(1);
		}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,0);},
	fontZoomState:0,
	mainMethod:function(zoomMode){
		if(!ABTConfig.fontZoom.functionSwitch||getE.error){return;};
		if(this.fontZoomState==0){this.fontZoomState=ABTConfig.fontZoom.Min;}
		if(zoomMode==1){
			this.fontZoomState += ABTConfig.fontZoom.onceZoom;
			if(this.fontZoomState>ABTConfig.fontZoom.Max){this.fontZoomState=ABTConfig.fontZoom.Max;}
		}
		else if(zoomMode==0){
			this.fontZoomState -= ABTConfig.fontZoom.onceZoom;
			if(this.fontZoomState<ABTConfig.fontZoom.Min){this.fontZoomState=0;}
		}
		for(var a=0;a<getE.allElements.length;a++){
			if(this.fontZoomState>ABTConfig.fontZoom.Min){
				getE.allElements[a].style.fontSize = this.fontZoomState+"px";
				getE.allElements[a].style.lineHeight = (this.fontZoomState+2)+"px";
			}
			else{
				getE.allElements[a].style.fontSize = null;
				getE.allElements[a].style.lineHeight = null;
			}
		}
		for(var c=0;c<getE.allFrame.length;c++){
			var iframeDOM = getE.allFrame[c].contentWindow;
			try{
				var iframeBody = iframeDOM.document.getElementsByTagName("body")[0];
				if(this.fontZoomState>ABTConfig.fontZoom.Min){
					for(var d=0;d<iframeBody.getElementsByTagName("*").length;d++){
						iframeBody.getElementsByTagName("*")[d].style.fontSize = this.fontZoomState+"px";
						iframeBody.getElementsByTagName("*")[d].style.lineHeight = (this.fontZoomState+2)+"px";
					}
				}
				else{
					for(var d=0;d<iframeBody.getElementsByTagName("*").length;d++){
						iframeBody.getElementsByTagName("*")[d].style.fontSize = null;
						iframeBody.getElementsByTagName("*")[d].style.lineHeight = null;
					}
				}
			}catch(e){}
		}
		toolbar.cookie.setCookie(this.cookieName,this.fontZoomState);
	}
}
//高对比度功能--------------------------------------
toolbar.Function.hightContrast = {
	showHTML:function(){
		if(ABTConfig.hightContrast.functionSwitch){
			var hightContrastHTML = "<li id=\"hightcontrast\"><a href=\"javascript:\" onmouseover=\"toolbar.Function.hightContrast.openMenu(0)\" onmouseout=\"toolbar.Function.hightContrast.openMenu(1)\" onfocus=\"toolbar.Function.hightContrast.openMenu(0)\">"+ABTConfig.language.hightContrast.text+"</a><ul id=\"hightcontrastlist\" onmouseover=\"toolbar.Function.hightContrast.openMenu(0)\" onmouseout=\"toolbar.Function.hightContrast.openMenu(1)\">";
			hightContrastHTML += "<li><a href=\"javascript:toolbar.Function.hightContrast.mainMethod(-1)\">"+ABTConfig.language.hightContrast.dColor+"</a></li>";
			var contrastlist = ABTConfig.hightContrast.delimit;
			for(var a=0;a<contrastlist.length;a++){
				hightContrastHTML = hightContrastHTML+"<li style=\"background-color:"+contrastlist[a].split("|")[1]+";\"><a href=\"javascript:toolbar.Function.hightContrast.mainMethod("+a+")\" style=\"color:"+contrastlist[a].split("|")[0]+";\">"+contrastlist[a].split("|")[2]+"</a></li>";
			}
			hightContrastHTML += "</ul></li>";
			return hightContrastHTML;
		}
		else{return "";}
	},
	cookieName:"hightContrastState",
	cookieMethod:function(){
		if(!ABTConfig.hightContrast.cookieSwtich){return;}
		var cookieValue = toolbar.cookie.getCookie(this.cookieName);
		if(cookieValue!=-1){toolbar.Function.hightContrast.mainMethod(cookieValue);}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,-1);},
	openMenu:function(mode){
		if(mode==0){document.getElementById("hightcontrastlist").style.display = "block";}
		else if(mode==1){document.getElementById("hightcontrastlist").style.display = "none";}
	},
	contrastControl:function(element,mode,q,b){
		if(mode==0){
			element.style.backgroundColor = "";
			element.style.backgroundImage = "";
			element.style.color = "";
		}
		else if(mode==1){
			element.style.backgroundColor = b;
			element.style.backgroundImage = "none";
			element.style.color = q;
		}
	},
	mainMethod:function(colorNum){
		if(!ABTConfig.hightContrast.functionSwitch||getE.error){return;};
		var contrastlist = ABTConfig.hightContrast.delimit;
		if(colorNum!=-1){
			var qcolor = contrastlist[colorNum].split("|")[0];
			var bcolor = contrastlist[colorNum].split("|")[1];
			for(var b=0;b<getE.allElements.length;b++){this.contrastControl(getE.allElements[b],1,qcolor,bcolor);}
			for(var c=0;c<getE.allFrame.length;c++){
				var iframeDOM = getE.allFrame[c].contentWindow;
				try{
					var iframeBody = iframeDOM.document.getElementsByTagName("body")[0];
					this.contrastControl(iframeBody,1,qcolor,bcolor);
					for(var d=0;d<iframeBody.getElementsByTagName("*").length;d++){
						this.contrastControl(iframeBody.getElementsByTagName("*")[d],1,qcolor,bcolor);
					}
				}catch(e){}
			}
		}
		else{
			for(var b=0;b<getE.allElements.length;b++){this.contrastControl(getE.allElements[b],0);}
			for(var c=0;c<getE.allFrame.length;c++){
				var iframeDOM = getE.allFrame[c].contentWindow;
				try{
					var iframeBody = iframeDOM.document.getElementsByTagName("body")[0];
					this.contrastControl(iframeBody,0);
					for(var d=0;d<iframeBody.getElementsByTagName("*").length;d++){
						this.contrastControl(iframeBody.getElementsByTagName("*")[d],0);
					}
				}catch(e){}
			}
		}
		toolbar.cookie.setCookie(this.cookieName,colorNum);
	}
}
//辅助线功能----------------------------------------
toolbar.Function.guides = {
	showHTML:function(){
		if(ABTConfig.guides.functionSwitch){
			var guidesValue = this.guidesState?ABTConfig.language.guides.on:ABTConfig.language.guides.off;
			return "<li id=\"guidesbutton\"><a href=\"javascript:toolbar.Function.guides.mainMethod()\" onfocus=\"toolbar.Function.hightContrast.openMenu(1)\">"+guidesValue+"</a></li>";}
		else{return "";}
	},
	cookieName:"guidesState",
	cookieMethod:function(){
		if(ABTConfig.guides.cookieSwitch&&toolbar.cookie.getCookie(this.cookieName)==1){
			toolbar.Function.guides.mainMethod();
		}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,0);},
	guidesState:false,
	mainMethod:function(){
		if(!ABTConfig.guides.functionSwitch){return;};
		if(!this.guidesState){
			var newGuidesBox = document.createElement("div");
			newGuidesBox.setAttribute("id","guidesbox")
			newGuidesBox.innerHTML = "<div id=\"guidesXLine\"></div><div id=\"guidesYLine\"></div>";
			document.body.insertBefore(newGuidesBox,getE.container);
			document.getElementById("guidesYLine").style.height = document.body.offsetHeight + "px";
			document.getElementById("guidesXLine").style.backgroundColor = "#F00";
			document.getElementById("guidesYLine").style.backgroundColor = "#F00";
			if(document.getElementById("guidesbutton")){document.getElementById("guidesbutton").getElementsByTagName("a")[0].innerHTML = ABTConfig.language.guides.on;}
			document.onmousemove = this.moveGuides;
			window.onscroll = this.moveGuides;
			this.guidesState = true;
		}
		else{
			document.getElementById("guidesbox").parentNode.removeChild(document.getElementById("guidesbox"));
			if(document.getElementById("guidesbutton")){document.getElementById("guidesbutton").getElementsByTagName("a")[0].innerHTML = ABTConfig.language.guides.off;}
			this.guidesState = false;
		}
		toolbar.cookie.setCookie(this.cookieName,this.guidesState?1:0);
	},
	moveGuides:function(e){
		if(!document.getElementById("guidesbox")){return;}
		e = window.event?window.event:e;
		var guidesX,guidesY;
		document.getElementById("guidesXLine").style.position = "absolute";
		if(browserType.ie){
			guidesX = e.clientX+ABTConfig.guides.skew;
			guidesY = e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)+ABTConfig.guides.skew;
		}
		else{
			document.getElementById("guidesXLine").style.position = "fixed";
			guidesX = e.pageX+ABTConfig.guides.skew;
			guidesY = e.pageY-(document.documentElement.scrollTop||document.body.scrollTop)+ABTConfig.guides.skew;
		}
		document.getElementById("guidesYLine").style.left = guidesX+"px";
		document.getElementById("guidesXLine").style.top = guidesY+"px";
	}
}
//文字提示功能--------------------------------------
toolbar.Function.textTips = {
	showHTML:function(){
		if(ABTConfig.textTips.functionSwitch){
			return "<li id=\"texttipsbutton\"><a href=\"javascript:toolbar.Function.textTips.mainMethod()\">"+ABTConfig.language.textTips.text+"</a></li>";
		}
		else{return "";}
	},
	cookieName:"textTips",
	cookieMethod:function(){
		if(ABTConfig.textTips.cookieSwitch&&toolbar.cookie.getCookie(this.cookieName)==1){
			toolbar.Function.textTips.mainMethod();
		}
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,0);},
	testTipsState:false,
	pinyinState:false,
	allTextNode:new Array(),
	getTextNode:function(element){
		var childNodes = element.childNodes;
		for (var i=0;i<childNodes.length;i++) {
			var thisChild = childNodes[i];
			switch(thisChild.nodeType){
				case 1:
					this.getTextNode(thisChild);
					break;
				case 3:
					if(this.trim(thisChild.nodeValue).length == 0){break;}
					this.allTextNode.push(thisChild);
					break;
			}
			if(thisChild.nodeName=="IMG"||thisChild.nodeName=="INPUT"||thisChild.nodeName=="OBJECT"||thisChild.nodeName=="SELECT"){this.allTextNode.push(thisChild);}
		}
	},
	AddTag:function(){
		if(this.firstRun){return;}
		for(var a=0;a<this.allTextNode.length;a++){
			if(this.allTextNode[a].parentNode.nodeName=="STYLE"){continue;}
			if(this.allTextNode[a].parentNode.parentNode.parentNode.getAttribute("id")=="carlendar"){continue;}
			var tagNode = document.createElement("em");
			if(this.allTextNode[a].nodeName=="IMG"||this.allTextNode[a].nodeName=="INPUT"||this.allTextNode[a].nodeName=="SELECT"){
				tagNode.setAttribute("class","getmessage");
				var newNode = this.allTextNode[a].cloneNode(true);
				tagNode.appendChild(newNode);
			}
			else if(this.allTextNode[a].nodeName=="OBJECT"&&this.allTextNode[a].parentNode.nodeName!="OBJECT"){
				tagNode.setAttribute("class","getmessage");
				var newNode = this.allTextNode[a].cloneNode(true);
				tagNode.appendChild(newNode);
			}
			else{
				var newString = this.allTextNode[a].nodeValue;
				var reg = /[，。！？；、：]/;
				if(reg.exec(newString)==null){
					tagNode.setAttribute("class","getmessage");
					tagNode.innerHTML = newString;
				}
				else{
					tagNode.setAttribute("class","getmainmessage");
					tagNode.innerHTML = this.mySplit(newString,/[，。！？；、：]/);
				}
			}
			if(this.allTextNode[a].parentNode){this.allTextNode[a].parentNode.insertBefore(tagNode,this.allTextNode[a]);}
		}
		for(var b=0;b<this.allTextNode.length;b++){
			if(this.allTextNode[b].parentNode.nodeName=="STYLE"){continue;}
			if(this.allTextNode[b].parentNode.parentNode.parentNode.getAttribute("id")=="carlendar"){continue;}
			this.allTextNode[b].parentNode.removeChild(this.allTextNode[b]);
		}
		var allOption = getE.container.getElementsByTagName("option");
		for(var c=0;c<allOption.length;c++){
			var thisMessage = allOption[c].firstChild.cloneNode(true);
			allOption[c].innerHTML = "";
			allOption[c].appendChild(thisMessage);
		}
		this.firstRun = true;

	},
	trim:function(str){return str.replace(/(^\s*)|(\s*$)/g,"");},
	mySplit:function(str,reg){
		var result,x=str,y,zzz=true;
		var stringArray = new Array();
		do{
			result = reg.exec(x);
			if(result!=null){
				var stringIndex = result.index;
				stringArray.push(x.substring(0,stringIndex+1));
				x = x.substring(stringIndex+1);
			}
			else{
				stringArray.push(x)
				zzz = false;
			}
		}
		while(zzz)
		var yy = "<em class=\"getmessage\">";
		for(var a=0;a<stringArray.length;a++){
			yy += (a<stringArray.length-1)?(stringArray[a]+"</em><em class=\"getmessage\">"):(stringArray[a]);
		}
		yy += "</em>";
		return yy;
	},
	getText:function(){
		if(!document.getElementById("gettextmessagecontent")){return;}
		var messagebox = document.getElementById("gettextmessagecontent");
		var textMessage = "";
		if(this.firstChild.nodeName=="IMG"){
			if(this.parentNode.parentNode.nodeName=="A"||this.parentNode.nodeName=="A"){
				textMessage = ABTConfig.language.textTips.textName.tagName1+""+getText(this.firstChild);
			}
			else{textMessage = ABTConfig.language.textTips.textName.tagName2+""+getText(this.firstChild);}
		}
		else if(this.firstChild.nodeName=="OBJECT"){textMessage = ABTConfig.language.textTips.textName.tagName3+""+this.firstChild.getAttribute("title");}
		else if(this.firstChild.nodeName=="SELECT"){textMessage = ABTConfig.language.textTips.textName.tagName4;}
		else if(this.firstChild.nodeName=="INPUT"){
			var inputType = this.firstChild.getAttribute("type");
			switch(inputType){
				case "button":
					textMessage = ABTConfig.language.textTips.textName.tagName5+""+this.firstChild.getAttribute("value");
					break;
				case "image":
					textMessage = ABTConfig.language.textTips.textName.tagName6+""+this.firstChild.getAttribute("alt");
					break;
				case "submit":
					textMessage = ABTConfig.language.textTips.textName.tagName7+""+this.firstChild.getAttribute("value");
					break;
				case "reset":
					textMessage = ABTConfig.language.textTips.textName.tagName8+""+this.firstChild.getAttribute("value");
					break;
				case "file":
					textMessage = ABTConfig.language.textTips.textName.tagName9+""+this.firstChild.getAttribute("title");
					break;
				case "password":
					textMessage = ABTConfig.language.textTips.textName.tagName10+""+this.firstChild.getAttribute("title");
					break;
				case "radio":
					textMessage = ABTConfig.language.textTips.textName.tagName11+""+this.firstChild.getAttribute("title");
					break;
				case "checkbox":
					textMessage = ABTConfig.language.textTips.textName.tagName12+""+this.firstChild.getAttribute("title");
					break;
				case "text":
					textMessage = ABTConfig.language.textTips.textName.tagName13+""+this.firstChild.getAttribute("title");
					break;
			}
		}
		else if(this.parentNode.parentNode.nodeName=="A"||this.parentNode.nodeName=="A"){
			var thisContent;
			if(this.parentNode.parentNode.nodeName=="A"){
				if(this.parentNode.parentNode.getAttribute("title")){thisContent = 

this.parentNode.parentNode.getAttribute("title");}
				else{thisContent = this.innerText||this.textContent;}
			}
			else if(this.parentNode.nodeName=="A"){
				if(this.parentNode.getAttribute("title")){thisContent = 

this.parentNode.getAttribute("title");}
				else{thisContent = this.innerText||this.textContent;}
			}
			textMessage = ABTConfig.language.textTips.textName.tagName14+""+thisContent;
		}
		else if(this.parentNode.nodeName=="H1"||this.parentNode.nodeName=="H2"||this.parentNode.nodeName=="H3"||this.parentNode.nodeName=="H4"||this.parentNode.nodeName=="H5"||this.parentNode.nodeName=="H6"){
			var thisContent = this.innerText||this.textContent;
			textMessage = ABTConfig.language.textTips.textName.tagName15+""+thisContent;
		}
		else{
			var thisContent = this.innerText||this.textContent;
			textMessage = ABTConfig.language.textTips.textName.tagName16+""+thisContent;
		}
		var messageboxWidth = messagebox.offsetWidth;
		var fontRatio = messageboxWidth/textMessage.length;
		//alert(messageboxWidth+"|"+textMessage.length+"|"+fontRatio);
		if(fontRatio<30){
			if(fontRatio>18){
				messagebox.style.fontSize =  parseInt(fontRatio)+"px";
				messagebox.style.lineHeight =  parseInt(fontRatio)+"px";
			}
			if(fontRatio<10){
				messagebox.style.fontSize = parseInt(fontRatio*2)+"px";
				messagebox.style.lineHeight =  parseInt(fontRatio*2)+"px";
			}
		}
		else{messagebox.style.fontSize = "";}
		if(toolbar.Function.textTips.pinyinState){
			textMessage = toolbar.Function.textTips.pinyinText(textMessage);
		}
		messagebox.innerHTML = textMessage;
		textMessage="";
		if(toolbar.Function.textTips.textbgState){
			this.style.backgroundColor = "#F00";
			this.style.color = "#FFF";
		}
	},
	pinyinText:function(text){
		var messayArray = text.split("");
		var newString = "";
		for(var a=0;a<messayArray.length;a++){
			var testVar = "";
			if(pinyin[messayArray[a]]){testVar = pinyin[messayArray[a]];}
			else{testVar = "&nbsp;";}
			if(messayArray[a]==" "){messayArray[a]="&nbsp;";}
			newString += "<span>"+messayArray[a]+"<sup>"+testVar+"</sup></span>";
		}
		return newString;
	},
	getEvent:function(){
		var allSpan = getE.container.getElementsByTagName("em");
		for(var c=0;c<allSpan.length;c++){
			if(allSpan[c].getAttribute("class")=="getmessage"){
				allSpan[c].onmouseover = this.getText;
				allSpan[c].onmouseout = this.clearTextbg;
			}
		}
	},
	pinyinControl:function(){
		this.pinyinState = this.pinyinState?false:true;
		if(this.pinyinState){document.getElementById("pinyinbuttonbox").firstChild.innerHTML = ABTConfig.language.textTips.pinyin.on;}
		else{document.getElementById("pinyinbuttonbox").firstChild.innerHTML = ABTConfig.language.textTips.pinyin.off;}
	},
	firstRun:false,
	textbgState:false,
	textbg:function(){
		this.textbgState = this.textbgState?false:true;
		document.getElementById("textbgbuttonbox").getElementsByTagName("a")[0].innerHTML = this.textbgState?ABTConfig.language.textTips.textbg.on:ABTConfig.language.textTips.textbg.off;
	},
	clearTextbg:function(){
		this.style.backgroundColor = "";
		this.style.color = "";
	},
	mainMethod:function(){
		if(!ABTConfig.textTips.functionSwitch||getE.error){return;};
		if(!this.textGetState){
			var newMessageBox = document.createElement("div");
			newMessageBox.setAttribute("id","gettextmessagebox");
			newMessageBox.innerHTML = "<div id=\"closetextmessagebox\"><a href=\"javascript:\" onclick=\"toolbar.Function.textTips.mainMethod()\"></a></div><div id=\"textbgbuttonbox\"><a href=\"javascript:\" onclick=\"toolbar.Function.textTips.textbg()\">"+ABTConfig.language.textTips.textbg.off+"</a></div><div id=\"pinyinbuttonbox\"><a href=\"javascript:\" onclick=\"toolbar.Function.textTips.pinyinControl()\">"+ABTConfig.language.textTips.pinyin.off+"</a></div><div id=\"gettextmessagecontent\"></div>";
			document.body.insertBefore(newMessageBox,getE.container);
			document.body.style.paddingBottom = 140+"px";
			document.getElementById("pinyinbuttonbox").firstChild.focus();
			this.getTextNode(getE.container);
			this.AddTag();
			this.getEvent();
			this.textGetState = true;
		}
		else{
			document.body.removeChild(document.getElementById("gettextmessagebox"));
			document.body.style.paddingBottom = 0+"px";
			this.textGetState = false;
		}
		toolbar.cookie.setCookie(this.cookieName,this.textGetState?1:0);
	}
}
//帮助功能------------------------------------------
toolbar.Function.help = {
	showHTML:function(){
		return "";
		/*if(ABTConfig.help.functionSwitch){
		    var tempHTML = "<li id=\"ABTHelpbutton\"><a target=\"_blank\" href=\"http://ggzy.hefei.gov.cn/sypd/001004/001004001/20120316/3b0b4578-cf0e-4559-9f13-174575b70706.html\">" + ABTConfig.language.help.help1 + "</a></li>";
		    if (langCode == "cn") { tempHTML = tempHTML + "<li id=\"ABTHelp_talk\"><a target=\"_blank\" href=\"http://ggzy.hefei.gov.cn/sypd/001004/001004002/20150309/6d59bb1c-0ce6-464b-9031-e1553c3c0261.html\">" + ABTConfig.language.help.help2 + "</a></li>"; }
			return tempHTML;
		}
		else{return "";}*/
	}
}
//重置功能------------------------------------------
toolbar.Function.resetToolbar = {
	showHTML:function(){
		if(ABTConfig.resetToolbar.functionSwitch){
			return "<li id=\"resetbutton\"><a href=\"javascript:toolbar.Function.resetToolbar.mainMethod()\">"+ABTConfig.language.resetToolbar+"</a></li>";
		}
		else{return "";}
	},
	mainMethod:function(){
		if(!ABTConfig.resetToolbar.functionSwitch){return;};
		for(var a in toolbar.Function){try{toolbar.Function[a].resetCookie()}catch(e){};};
		window.location.reload();
	}
}
//开启/关闭功能-------------------------------------
toolbar.Function.show = {
	showHTML:function(){
		if(ABTConfig.show.functionSwitch){
			return "<li id=\"closetoolbar\"><a href=\"javascript:toolbar.Function.show.mainMethod()\">"+ABTConfig.language.show+"</a></li>";
		}
		else{return "";}
	},
	keyTrigger:function(keyString){
		var shortcuts = ABTConfig.show.keyCode;
		for(var a=0;a<shortcuts.length;a++){if(keyString==keyCodeStringHandle(shortcuts[a])){toolbar.Function.show.mainMethod();};};
	},
	cookieName:"toolbarState",
	cookieMethod:function(){
		if(ABTConfig.show.cookieSwtich&&toolbar.cookie.getCookie(this.cookieName)==1){toolbar.Function.show.mainMethod();};
	},
	resetCookie:function(){toolbar.cookie.setCookie(this.cookieName,1);},
	toolbarState:false,
	mainMethod:function(){
		if(!ABTConfig.show.functionSwitch){return;};
		if(!this.toolbarState){
			var toolbarHTML = "<ul id=\"toolbarList\">";
			for(var a in toolbar.Function){try{toolbarHTML = toolbarHTML+toolbar.Function[a].showHTML()}catch(e){};};
			toolbarHTML = toolbarHTML+"<li id=\"abtClear\"></li></ul>"
			var newToolbar = document.createElement("div");
			newToolbar.setAttribute("id","ABTToolbar");
			newToolbar.innerHTML = toolbarHTML;
			document.body.insertBefore(newToolbar,document.body.firstChild);
			var toobarHeight = document.getElementById("ABTToolbar").offsetHeight;
			toobarHeight = toobarHeight>(ABTConfig.skin[toolbar.skin].bodyPadding*2.1)?toobarHeight:ABTConfig.skin[toolbar.skin].bodyPadding;
			document.body.style.paddingTop = toobarHeight+"px";
			skipElementBuild(document.getElementById("ABTToolbar").firstChild,ABTConfig.language.toolbarMessage.on);
			this.toolbarState = true;
		}
		else{
			document.body.removeChild(document.getElementById("ABTToolbar"));
			document.body.style.paddingTop = "0px";
			skipElementBuild(document.body.firstChild,ABTConfig.language.toolbarMessage.off);
			this.toolbarState = false;
		}
		toolbar.cookie.setCookie(this.cookieName,this.toolbarState?1:0);
	}
}