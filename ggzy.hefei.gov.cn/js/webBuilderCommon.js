var siteInfo = {"siteGuid":"7eb5f7f1-9041-43ad-8e13-8fcb82ea831a","projectName":"/EpointWebBuilderService","webVersion":"4.1","vname":"/hefggzy","tempVersion":"20180207170920"}
if (!window.webbuilder) {
    window.webbuilder = {};
}
function checkJson(custom) {
    if (custom != "") {
        if (typeof custom == 'string') {
            backData = $.parseJSON(custom);
        } else {
            backData = custom;
        }
    }
    else
        backData = $.parseJSON("{}");
    return backData;
}

jQuery.extend(webbuilder, (function (win, $) {
    return {
		 // 最新咨询投诉信件列表
        getLetterListByCondition2: function (subject, postName, replyContent, content,startTime,endTime,group,type, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterListByCondition2",
                type: "post",
                data: {
                    "subject": subject,
                    "postName": postName,
                    "replyContent":replyContent,
                    "content":content,
                    "startTime":startTime,
                    "endTime":endTime,
                    "group": group,
					"xinjiantype": type,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
	//获取短信验证码
	getMobilePhoneCode: function (name,phone,YZM,imgguid,callback) {
            $.ajax({
                url: "/EpointWebBuilder/frontAppAction.action?cmd=getMobilePhoneCode",
                type: "post",
                data: {
                    "name": name,
                    "phonenum": phone,
					"YZM": YZM,
					"imgguid": imgguid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
	getMobilePhoneCodebyinfoguid: function (infoGuid,phone,userIP,callback) {
            $.ajax({
                url: "/EpointWebBuilder/frontAppAction.action?cmd=getMobilePhoneCodebyinfoguid",
                type: "post",
                data: {
                    "infoGuid": infoGuid,
                    "phonenum": phone,
					"userIP": userIP
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 更新访问量并返回当前访问量
        addView: function (viewGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=addPageView",
                type: "post",
                data: {
                    "viewGuid": viewGuid,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取总访问量
        getSiteViewCount: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getSiteViewCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));

            })
        },

        // 根据访问量排序获取信息
        getCateInfoOrderByViewCount: function (categoryNum, length,systemName, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getCateInfoOrderByViewCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "categoryNum": categoryNum,
                    "length": length,
                    "systemName": systemName
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));

            })
        },

        // 获取验证码
        getVerificationCode: function (width, height, codeNum, interferenceLine, codeGuid, callback) {
            $.ajax({
                url: "/EpointWebBuilder/frontAppAction.action?cmd=getVerificationCode",
                type: "post",
                data: {
                    "width": width,
                    "height": height,
                    "codeNum": codeNum,
                    "interferenceLine": interferenceLine,
                    "codeGuid": codeGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 用户注册
        registeredUserLogin: function (userAccount, userPwd, verificationCode, verificationGuid, rememberMeMark, beforePageUrl, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=registeredUserLogin",
                type: "post",
                data: {
                    "userAccount": userAccount,
                    "userPwd": userPwd,
                    "verificationCode": verificationCode,
                    "verificationGuid": verificationGuid,
                    "rememberMeMark": rememberMeMark,
                    "beforePageUrl": beforePageUrl
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // [验证注册用户是否登录] 若已登录返回memberSession，若未登录尝试使用cookie登录
        registeredUserAjaxVerifyLogin: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=registeredUserAjaxVerifyLogin",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 用户登出
        registeredUserLogout: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=registeredUserLogout",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 注册用户
        registerUser: function (userAccount, userPwd, userType, mobile, userEmail,code, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=registerUser",
                type: "post",
                data: {
                    "userAccount": userAccount,
                    "userPwd": userPwd,
                    "userType": userType,
                    "phone": mobile,
                    "email": userEmail,
                    "code" : code
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取注册用户类型
        getRegisteredUserTypeList: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getRegisteredUserTypeList",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },


        // 信箱系统获取信箱
        getConsultBox: function (group, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultBox",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "group": group
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 信箱系统获取信箱类别
        getConsultType: function (codename, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultType",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "codename": codename
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 信件提交
        consultPost: function (postUserName, tel, sex, email, address, subject, content, YZM, imgguid, boxguid, oucode, loginId, pwd, consulttype, group, isuserallowedpublish, ouGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=consultPost",
                type: "post",
                data: {
                    "postUserName": postUserName,
                    "tel": tel,
                    "sex": sex,
                    "email": email,
                    "address": address,
                    "subject": subject,
                    "content": content,
                    "YZM": YZM,
                    "imgguid": imgguid,
                    "boxguid": boxguid,
                    "oucode": oucode,
                    "loginId": loginId,
                    "pwd": pwd,
                    "siteGuid": siteInfo.siteGuid,
                    "consulttype": consulttype,
                    "group": group,
                    "isuserallowedpublish": isuserallowedpublish,
                    "ouGuid": ouGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取查询信件数
        getConsultCount: function (cNum, cPwd, group,  callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultCount",
                type: "post",
                data: {
                    "cNum": cNum,
                    "cPwd": cPwd,
                    "group": group,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取查询信件列表
        getConsultList: function (cNum, cPwd, group, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultList",
                type: "post",
                data: {
                    "cNum": cNum,
                    "cPwd": cPwd,
                    "group": group,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize,
                    "projectName": siteInfo.projectName
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取公众监督处理部门
        getConsultOu: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultOu",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取用户上传的图片
        getMyPhotoList: function (userguid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getMyPhotoList",
                type: "post",
                data: {
                    "userguid": userguid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },


        // 获取组别信件列表
        getConsultMsg: function (group, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultMsg",
                type: "post",
                data: {
                    "group": group,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取组别信件数
        getConsultMsgCount: function (group, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getConsultMsgCount",
                type: "post",
                data: {
                    "group": group,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 信件删除
        deleteConsultMsg: function (rowguid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=deleteConsultMsg",
                type: "post",
                data: {
                    "rowguid": rowguid,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 用户信息收藏
        collectInsert: function (infoTitle, infoUrl, infoID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=collectInsert",
                type: "post",
                data: {
                    "infoTitle": infoTitle,
                    "infoUrl": infoUrl,
                    "infoID": infoID,
                    "siteGuid":siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取用户收藏信息
        getUserCollect: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getUserCollect",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 删除收藏信息
        deleteCollect: function (collectGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=deleteCollect",
                type: "post",
                data: {
                    "collectGuid": collectGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 提交评论
        submitInfoFeedBack: function (nickname, anonymous, pjfs, plContent, ImgGuid, YZM, loginID, infoid, categorynum, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=submitInfoFeedBack",
                type: "post",
                data: {
                    "nickname": nickname,
                    "anonymous": anonymous,
                    "pjfs": pjfs,
                    "plContent": plContent,
                    "ImgGuid": ImgGuid,
                    "YZM": YZM,
                    "loginID": loginID,
                    "siteGuid": siteInfo.siteGuid,
                    "infoid": infoid,
                    "categorynum": categorynum
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取评论列表
        getInfofeedback: function (infoid, categorynum, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getInfofeedback",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "infoid": infoid,
                    "categorynum": categorynum,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取评论数
        getInfofeedbackCount: function (infoid, categorynum, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getInfofeedbackCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "infoid": infoid,
                    "categorynum": categorynum
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 在线投票
        onlineVote: function ( voidId, options, verificationCode, verificationGuid, loginid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=onlineVote",
                type: "post",
                data: {
                	"siteGuid": siteInfo.siteGuid,
                    "voidId": voidId,
                    "options": options,
                    "verificationCode": verificationCode,
                    "verificationGuid": verificationGuid,
                    "loginid": loginid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取投票信息
        getNewVoteCount: function (voteId, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getNewVoteCount",
                type: "post",
                data: {
                    "voteId": voteId,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 网上调查统计结果
        selectQResult: function (QID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=selectQResult",
                type: "post",
                data: {
                    "QID": QID,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 网上调查提交
        vote: function (options, contents, questionnaireId, yzm, imgguid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=vote",
                type: "post",
                data: {
                    "options": options,
                    "contents": contents,
                    "questionnaireId": questionnaireId,
                    "yzm": yzm,
                    "imgguid": imgguid,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },



        // 获取验证码
        getYZM: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getYZM",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取首页面的在线访谈记录
        getZxftInfoList: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getZxftInfoList",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 根据栏目名称模糊查询并返回所有父栏目
        getFullLikeCate: function (categoryName, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getFullLikeCate",
                type: "post",
                data: {
                    "categoryName": categoryName,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 根据栏目号获取信息标题列表
        getTitleListByCategoryNum: function (categoryNum, length, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getTitleListByCategoryNum",
                type: "post",
                data: {
                    "categoryNum": categoryNum,
                    "length": length,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取栏目头条信息正文
        getCateTopInfoContent: function (categoryNum, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getCateTopInfoContent",
                type: "post",
                data: {
                    "categoryNum": categoryNum,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },

        // 获取信息详情
        getInfoByID: function (infoID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getInfoByID",
                type: "post",
                data: {
                    "infoID": infoID,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
      // 获取信箱组别列表
        getLetterGroupList: function (groupNumbers,callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterGroupList",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "groupNumbers":groupNumbers
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));

            })
        },
        // 获取信箱下拉列表
        getLetterBoxs: function (groupGuid,callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterBoxList",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "groupGuid":groupGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));

            })
        },
        // 获取信件类别下拉列表
        getLetterTypes: function (boxGuid,callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterTypes",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "boxGuid":boxGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));

            })
        },
        // 最新咨询投诉信件提交
        letterPost: function (postUserName, tel, sex, email, address, subject, content, YZM, imgguid, boxguid, loginId, pwd, consulttype, isuserallowedpublish, callback) {
            $.ajax({
                url: "/EpointWebBuilder/frontAppAction.action?cmd=letterPost",
                type: "post",
                data: {
                    "postUserName": postUserName,
                    "tel": tel,
                    "sex": sex,
                    "email": email,
                    "address": address,
                    "subject": subject,
                    "content": content,
                    "YZM": YZM,
                    "imgguid": imgguid,
                    "boxguid": boxguid,
                    "loginId": loginId,
                    "pwd": pwd,
                    "siteGuid": siteInfo.siteGuid,
                    "consulttype": consulttype,
                    "isuserallowedpublish": isuserallowedpublish
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
      // 最新咨询投诉信件列表
        getLetterList: function (cNum, cPwd, group, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterList",
                type: "post",
                data: {
                    "cNum": cNum,
                    "cPwd": cPwd,
                    "group": group,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize,
                    "projectName": siteInfo.projectName
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
      // 最新咨  投诉信件详情
        getLetterDetail: function (infoGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterDetail",
                type: "post",
                data: {
                    "infoGuid": infoGuid,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 最新咨询投诉满意度列表
        getSatisfaction: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getSatisfaction",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 最新咨询投诉满意度评价
        letterComment: function (myd,tel,pwd,infoGuid, callback) {
            $.ajax({
                url: "/EpointWebBuilder/frontAppAction.action?cmd=letterComment",
                type: "post",
                data: {
                    "myd": myd,
					"tel": tel,
                    "pwd":pwd,
                    "infoGuid":infoGuid,
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 获取招投标栏目信息发布数量
        getZTBCategoryInfoCount: function (categoryNum,callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getZTBCategoryInfoCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "categoryNum":categoryNum
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
      
        initGovDept:function(callback){
        	$.ajax({
				url :siteInfo.projectName +"/frontAppAction.action?cmd=initGovDept",
				type : "post",
				dataType : "json",
				 cache: false
            })
        	.success(function(msg){
        		callback(checkJson(msg.custom));
        	})
        },
        	 
        personApplySubmit:function(param,callback){
    		$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=addPersonalApply",
    			type : "post",
    			data:param,
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
        },
        
        enterpriseSubmit:function(obj,callback){
        	$.ajax({
				url :siteInfo.projectName + "/frontAppAction.action?cmd=addEnterpriseApply",
				type : "post",
				data:obj,
				dataType : "json",
				cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
        },
        
        searchResult:function (obj,callback){
        	$.ajax({
        		url :siteInfo.projectName + "/frontAppAction.action?cmd=getApplyResult",
        		type : "post",
        		data:{
        			"searchPwd":obj,
        			"siteGuid":siteInfo.siteGuid
        		},
        		dataType : "json",
        		cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
        },
        //获取在线访谈前台展示列表
        getOnlineInterviewList:function(type,pageIndex, pageSize,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getOnlineInterviewList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "type":type,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//获取在线访谈详细信息
		getMeetInfo:function(meetingGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMeetInfo",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "meetingGuid":meetingGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//获取在线访谈精彩瞬间图片
		getMeetSpecialPic:function(meetingGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMeetSpecialPic",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "meetingGuid":meetingGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//获取在线访谈初始化问答
		getMeetAskList:function(meetingGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMeetAskList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "meetingGuid":meetingGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//获取在线访谈问题提交
		meetAskPost:function(meetingGuid,username,askContent,loginId,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=meetAskPost",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "meetingGuid":meetingGuid,
                    "userName":username,
                    "askContent":askContent,
                    "loginId":loginId
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册发送短信验证码
		sendSmsValidateCode:function(phone,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=sendSmsValidateCode",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "phone":phone
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户访问量统计，供智能推送使用
		visitStatistics:function(infoId){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=visitStatistics",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "infoId":infoId
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    		})
		},
		//获取前台用户只能推送列表
		getSmartPushList:function(pageIndex, pageSize,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getSmartPushList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex":pageIndex,
                    "pageSize":pageSize
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//获取前台用户只能推送列表
		getCategorySubscribeList:function(type,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getCategorySubscribeList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "type":type
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//获取前台用户订阅栏目信息列表
		getMySubscribeList:function(type,pageIndex, pageSize,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMySubscribeList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "type": type,
                    "pageIndex":pageIndex,
                    "pageSize":pageSize
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//定制我的栏目
		subscribeMyCategory:function(selectValue,type,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=subscribeMyCategory",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "selectValue":selectValue,
                    "type":type
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//邮箱验证找回密码
		toNextEmailCheck:function(userAccount,verificationCode, verificationGuid,mailTemplateCode,frontUrl,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=toNextEmailCheck",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userAccount":userAccount,
                    "verificationCode":verificationCode,
                    "verificationGuid":verificationGuid,
                    "mailTemplateCode":mailTemplateCode,
                    "frontUrl":frontUrl
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//邮箱验证找回密码,重新发送邮箱验证,一旦重新发送，之前的邮件就不能修改密码了
		reSendEmailToGetPwd:function(userAccount,mailTemplateCode,frontUrl,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=reSendEmailToGetPwd",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userAccount":userAccount,
                    "mailTemplateCode":mailTemplateCode,
                    "frontUrl":frontUrl
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//邮箱验证找回密   ,重新发送邮箱验证,一旦重新发送，之前的邮件就不能修改密码了
		modifyUserPwd:function(account,userPwd,uniqueCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=modifyUserPwd",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "account":account,
                    "uniqueCode":uniqueCode,
                    "userPwd":userPwd
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//获取前台用户中心消息
		getMessageCenterList:function(pageIndex,pageSize,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMessageCenterList",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex":pageIndex,
                    "pageSize":pageSize
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//点击查看用户中心消息后修改阅读状态
		modifyMsgStatus:function(msgGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=modifyMsgStatus",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "msgGuid":msgGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//删除用户中心消息
		deleteMessageCenterMsg: function (rowguid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=deleteMessageCenterMsg",
                type: "post",
                data: {
                	"siteGuid": siteInfo.siteGuid,
                    "rowguid": rowguid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        //获取前台用户中心依申请公开列表
        getMyDependApplyList: function (searchPwd,type,keyWord,pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getMyDependApplyList",
                type: "post",
                data: {
                	"siteGuid": siteInfo.siteGuid,
                    "searchPwd": searchPwd,
                    "pageIndex":pageIndex,
                    "pageSize":pageSize,
                    "type":type,
                    "keyWord":keyWord
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 我的咨询投诉信件列表
        getMyLetterList: function (group, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getMyLetterList",
                type: "post",
                data: {
                    "group": group,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize,
                    "projectName": siteInfo.projectName
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        // 最新咨询投诉信件列表
        getLetterListByCondition: function (subject, postName, replyContent, content,startTime,endTime,group, pageIndex, pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getLetterListByCondition",
                type: "post",
                data: {
                    "subject": subject,
                    "postName": postName,
                    "replyContent":replyContent,
                    "content":content,
                    "startTime":startTime,
                    "endTime":endTime,
                    "group": group,
                    "siteGuid": siteInfo.siteGuid,
                    "pageIndex": pageIndex,
                    "pageSize": pageSize
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        //获取我的账户信息
        getAccountsInfo: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getAccountsInfo",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        //修改我的账户信息
        modifyAccountsInfo: function (userAccount,displayname, userType, mobile, userEmail,callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=modifyAccountsInfo",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userAccount":userAccount,
                    "displayName":displayname,
                    "userType":userType,
                    "mobile": mobile,
                    "userEmail":userEmail
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        //信息公开获取机构
		getXxgkDept: function (url, callback) {
            $.ajax({
                url: siteInfo.projectName + "/frontAppAction.action?cmd=getXxgkDept",
                type: "post",
				data: {
                    "siteGuid": siteInfo.siteGuid,
					"url" : url
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
        
        ///////////////////////////////////////////////////////////////////微信接口//////////////////////////////////////////////////////////////////////////
		//用户登陆
        chechUser: function (loginID, password, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=checkUser",
                type: "post",
                data: {
                    "loginID": loginID,
                    "password": password
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//判断用户是否存在
		checkUserExist: function (loginID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=checkUserExist",
                type: "post",
                data: {
                    "loginID": loginID
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//根据id获取用户类型名
		getUserTypeByGuid: function (userTypeGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getUserTypeByGuid",
                type: "post",
                data: {
                    "userTypeGuid": userTypeGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取用户类型名
		getUserType: function ( callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getUserType",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//修改用户信息
		updateUser: function (loginID, userType, userName, cardID, mobile, telphone, email, address, sex, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=updateUser",
                type: "post",
                data: {
                    "loginID": loginID,
					"userType": userType,
					"userName": userName,
					"cardID": cardID,
					"mobile": mobile,
					"telphone": telphone,
					"email": email,
					"address": address,
					"sex": sex
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//新增用户
		addUser: function (loginID, userType, password, userName, cardID, mobile, telphone, email, address, sex, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=addUser",
                type: "post",
                data: {
                    "loginID": loginID,
					"userType": userType,
					"password": password,
					"userName": userName,
					"cardID": cardID,
					"mobile": mobile,
					"telphone": telphone,
					"email": email,
					"address": address,
					"sex": sex
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//注册选择
		getUserType: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getUserType",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//修改用户密码
		updateUserPwd: function (loginID, password, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=updateUserPwd",
                type: "post",
				data: {
                    "loginID": loginID,
					"password" : password
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取信息列表
		getInformation: function (length, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getInformation",
                type: "post",
				data: {
                    "length": length,
					"siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取信息详情
		getInfoByid: function (infoID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getInfoByID",
                type: "post",
				data: {
                    "infoID": infoID,
					"siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		// 最新咨询投诉信件提交
        letterPostWeChat: function (postUserName, tel, sex, email, address, subject, content, YZM, imgguid, boxguid, loginId, pwd, consulttype, isuserallowedpublish, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=letterPost",
                type: "post",
                data: {
                    "postUserName": postUserName,
                    "tel": tel,
                    "sex": sex,
                    "email": email,
                    "address": address,
                    "subject": subject,
                    "content": content,
                    "YZM": YZM,
                    "imgguid": imgguid,
                    "boxguid": boxguid,
                    "loginId": loginId,
                    "pwd": pwd,
                    "siteGuid": siteInfo.siteGuid,
                    "consulttype": consulttype,
                    "isuserallowedpublish": isuserallowedpublish
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(checkJson(msg.custom));
            })
        },
		//获取我的信件
		getMyConsult: function (userGuid,pageSize, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getMyLetterList",
                type: "post",
				data: {
					"userGuid" : userGuid,
                    "siteGuid": siteInfo.siteGuid,
                    "pageSize": pageSize,
                    "projectName": siteInfo.projectName
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取信件详情
		getConsultByGuid: function (infoGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getConsultByGuid",
                type: "post",
				data: {
					"infoGuid" : infoGuid,
					"siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取用户信息
		getUserInfo: function (loginID, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getUserInfo",
                type: "post",
				data: {
                    "loginID": loginID
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取信箱组别
		getBoxGroup: function (callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getBoxGroup",
                type: "post",
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取信箱
		getLetterBoxList: function (groupGuid,callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getLetterBoxList",
                type: "post",
				data: {
                    "groupGuid": groupGuid,
					"siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		//获取类型
		getLetterTypeWeChat: function (boxGuid, callback) {
            $.ajax({
                url: siteInfo.projectName + "/weChatAction.action?cmd=getLetterTypes",
                type: "post",
				data: {
                    "siteGuid": siteInfo.siteGuid,
					"boxGuid" : boxGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                callback(msg.custom);
            })
        },
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //前台注册用户找回密码验证用户信息
        checkUserAccount:function(userAccount,verificationCode, verificationGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=checkUserAccount",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userAccount":userAccount,
                    "verificationCode":verificationCode,
                    "verificationGuid":verificationGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户找回密码发送短信验证码
		getSmsValidateCode:function(userGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getSmsValidateCode",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userGuid":userGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户找回密码发送邮箱验证码
		getEmailValidateCode:function(userGuid,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getEmailValidateCode",
    			type : "post",
    			data: {
                    "siteGuid": siteInfo.siteGuid,
                    "userGuid":userGuid
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户找回密码，验证短信验证码是否正确
		checkSmsValidateCode:function(userGuid,smsValidateCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=checkSmsValidateCode",
    			type : "post",
    			data: {
                    "userGuid":userGuid,
                    "smsValidateCode":smsValidateCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户找回密码，验证短信验证码是否正确
		checkEmailValidateCode:function(userGuid,emailValidateCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=checkEmailValidateCode",
    			type : "post",
    			data: {
                    "userGuid":userGuid,
                    "emailValidateCode":emailValidateCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
    			callback(checkJson(msg.custom));
    		})
		},
		//前台用户找回密码，修改密   
		modifyForgetPsd:function(userGuid,password,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=modifyForgetPsd",
    			type : "post",
    			data: {
                    "userGuid":userGuid,
                    "password":password
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，通过手机短信验证码验证方式
		registerUserByPhone:function(username, password, phone, smsValidateCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=registerUserByPhone",
    			type : "post",
    			data: {
                    "username":username,
                    "password":password,
                    "phone":phone,
                    "smsValidateCode":smsValidateCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，通过邮件验证码验证方式
		registerByEmail:function(username, password,email,frontUrl,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=registerByEmail",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
                    "username":username,
                    "password":password,
                    "email":email,
                    "frontUrl":frontUrl
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，邮件激活用户
		activateAccount:function(account, uniqueCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=activateAccount",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
                    "account":account,
                    "uniqueCode":uniqueCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，获取已订阅栏目
		getMyCategorySub:function(type,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getMyCategorySub",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"type":type
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，删除一个栏目的订阅
		deleteSubscribe:function(curId,type,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=deleteSubscribe",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"curId":curId,
    				"type":type
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，修改密码,检查原登录密码是否正确
		checkLoginPassword:function(pwd,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=checkLoginPassword",
    			type : "post",
    			data: {
    				"pwd":pwd
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，修改绑定手机号
		boundPhone:function(phone,smsValidateCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=boundPhone",
    			type : "post",
    			data: {
    				"phone":phone,
    				"smsValidateCode":smsValidateCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户注册，修改绑定邮箱
		boundEmail:function(email,emailValidateCode,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=boundEmail",
    			type : "post",
    			data: {
    				"email":email,
    				"emailValidateCode":emailValidateCode
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户，绑定手机发送短信验证码
		boundPhoneValidateCode:function(phone,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=boundPhoneValidateCode",
    			type : "post",
    			data: {
    				"phone":phone
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户，绑定邮箱发送短信验证码
		boundEmailValidateCode:function(email,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=boundEmailValidateCode",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"email":email
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//前台用户，修改个人资料
		saveMemberInfo:function(phone,displayName,trueName,sex,cardId,birthDay,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=saveMemberInfo",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"phone":phone,
    				"displayName":displayName,
    				"trueName":trueName,
    				"sex":sex,
    				"cardId":cardId,
    				"birthDay":birthDay
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//RSS订阅页面
		getRssInfoList:function(cateNum,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=getRssInfoList",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"cateNum":cateNum
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		},
		//确认取消邮箱订阅
		doMailSubscribe:function(type,callback){
        	$.ajax({
    			url :siteInfo.projectName + "/frontAppAction.action?cmd=doMailSubscribe",
    			type : "post",
    			data: {
    				"siteGuid":siteInfo.siteGuid,
    				"type":type
                },
    			dataType : "json",
    			cache:false
        	})
        	.success(function(msg){
        		callback(checkJson(msg.custom));
    		})
		}
    
    }
}(this, jQuery)));