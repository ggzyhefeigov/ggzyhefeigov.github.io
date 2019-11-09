$(function () {
    var viewGuid = $("#viewGuid").attr("value");
    webbuilder.addView(viewGuid, function (data) {
        if (data.hasOwnProperty("message")) {
            alert(data.message);
        } else {
            if ($("#infoViewCount").length > 0) {
                $("#infoViewCount").html(data.viewCount);
            }
        }
    })
    webbuilder.getSiteViewCount( function (data) {
        if (data.hasOwnProperty("message")) {
            alert(rtndata.message);
        } else {
            var list = data.siteViewCount.split("");
            var countHtml = "";
            for (var i = 0; i < list.length; i++) {
                countHtml += "<img src='/images/counter/1/" + list[i] + ".gif'>"
            }
            if ($("#siteViewCount").length > 0) {
                $("#siteViewCount").html(countHtml);
            }
        }
    })
    
    $.ajax({
                url: siteInfo.projectName + "/getTodayViewCount.action?cmd=getTodayCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                var data = checkJson(msg.custom);
                    var list = data.siteTodayCount.split("");
                    var countHtml2 = "";
                    for (var i = 0; i < list.length; i++) {
                        countHtml2 += "<img src='/images/counter/1/" + list[i] + ".gif'>"
                    }
                    if ($("#siteTodayCount").length > 0) {
                        $("#siteTodayCount").html(countHtml2);
                    }
            })
            
            $.ajax({
                url: siteInfo.projectName + "/getTodayViewCount.action?cmd=getYesterdayCount",
                type: "post",
                data: {
                    "siteGuid": siteInfo.siteGuid
                },
                dataType: "json",
                cache: false
            })
            .success(function (msg) {
                var data = checkJson(msg.custom);
                    var list = data.siteYesCount.split("");
                    var countHtml2 = "";
                    for (var i = 0; i < list.length; i++) {
                        countHtml2 += "<img src='/images/counter/1/" + list[i] + ".gif'>"
                    }
                    if ($("#siteYesCount").length > 0) {
                        $("#siteYesCount").html(countHtml2);
                    }
            })
});

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




