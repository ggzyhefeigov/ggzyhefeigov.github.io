//定时器
var timer = null;
// 非正文需要朗读的标签 逗号分隔
var speakTags = 'a,p,span,h1,h2,h3,h4,h5,h6,img,input,button';
// 标签朗读文本
var tagTextConfig = {
    'a': '链接',
    'input[text]': '文本输入框',
    'input[password]': '密码输入框',
    'button': '按钮',
    'img': '图片'
};
// 正文拆分配置
var splitConfig = {
    // 内容分段标签名称
    unitTag: 'p',
    // 分隔正则表达式
    splitReg: /[,;，；。]/g,
    // 包裹标签名
    wrapTag: 'label',
    wrapCls: 'speak-lable',
    // 高亮样式
    hightlightCls: 'speak-help-hightlight',
    hightStyle: 'background: #000!important;color: #fff!important',

};
/**
 * 获取标签朗读文本
 * @param {HTMLElement} el 要处理的HTMLElement
 * @returns {String}   朗读文本
 */
function getTagText(el) {
    if (!el) return '';

    var tagName = el.tagName.toLowerCase();

    // 处理input等多属性元素
    switch (tagName) {
        case 'input':
            tagName += '[' + el.type + ']';
            break;
        default:
            break;
    }

    return (tagTextConfig[tagName] || '') + ' ';
}

/**
 * 获取完整朗读文本
 * @param {HTMLElement} el 要处理的HTMLElement
 * @returns {String}   朗读文本
 */
function getText(el) {
    if (!el) return '';

    return getTagText(el) + (el.title || el.alt || el.innerText || '');
}

// 文本分隔
function splitConent($content) {
    $content = $($content);

    $content.find(splitConfig.unitTag).each(function (index, item) {
        var $item = $(item),
            text = $item.text();

        if (!text) return;

        // var html = $item.html(),
        // <p>这是一段测试文本，这里有个链接。<a>您好，可以点击此处进行跳转</a>还有其他内容其他内容容其他内容容其他内容，容其他内容。</p>
        // <p><div>这是一段测试文本，这里有个链接。<a>您好，可以点击此处进行跳转</a>还有其他内容其他内容容其他内容容其他内容，容其他内容。</div></p>
        // var html = '<div>这是一段测试文本，这里有个链接。<a>您好，可以点击此处进行跳转</a>还有其他内容其他内容容其他内容容其他内容，容其他内容。</div>',
        //     start = '',
        //     end = '';


        // 文本分段
        // var arr = $.map(html.split(splitConfig.splitReg), function (it) {
        //     // 含有标签则不处理
        //     if (!/<\/?\w+?>/.test(it) && it) {
        //         var wrap = document.createElement(splitConfig.wrapTag);
        //         wrap.className = splitConfig.wrapCls;
        //         wrap.innerHTML = it;
        //         it = wrap.outerHTML;
        //         return it;
        //     }
        //     return it;
        // });
        // 正则分隔就丢失了分隔符，因此不能用
        // 这里直接将分隔符替换为 </tag>分隔符<tag>的形式，最后再在首位补上开始和结束来处理
        // html = html.replace(splitConfig.splitReg, '</' + splitConfig.wrapTag + '>$&<' + splitConfig.wrapTag + '>');
        // 如果段落中的a标签中也存在分隔的符号，上面就破快结构了。。。
        var nodes = $item[0].childNodes;

        $.each(nodes, function (i, node) {
            switch (node.nodeType) {
                // text 节点
                case 3:
                    // 由于是文本节点，标签被转义了，后续再转回来
                    node.data = '<' + splitConfig.wrapTag + '>' +
                        node.data.replace(splitConfig.splitReg, '</' + splitConfig.wrapTag + '>$&<' + splitConfig.wrapTag + '>') +
                        '</' + splitConfig.wrapTag + '>';
                    console.log(node.data);
                    break;
                    // 元素节点
                case 1:
                    var innerHtml = node.innerHTML,
                        start = '',
                        end = '';
                    // 如果首尾还有直接标签，先去掉
                    var startResult = /^<\w+?>/.exec(innerHtml);
                    if (startResult) {
                        start = startResult[0];
                        innerHtml = innerHtml.substr(start.length);
                    }
                    var endResult = /<\/\w+?>$/.exec(innerHtml);
                    if (endResult) {
                        end = endResult[0];
                        innerHtml = innerHtml.substring(0, endResult.index);
                    }
                    // 更新内部内容
                    node.innerHTML = start +
                        '<' + splitConfig.wrapTag + '>' +
                        innerHtml.replace(splitConfig.splitReg, '</' + splitConfig.wrapTag + '>$&<' + splitConfig.wrapTag + '>') +
                        '</' + splitConfig.wrapTag + '>' +
                        end;
                    console.log(node);
                    break;
                default:
                    break;
            }
        });

        console.log($item[0].innerHTML);

        // 处理文本节点中被转义的html标签
        $item[0].innerHTML = $item[0].innerHTML
            .replace(new RegExp('&lt;' + splitConfig.wrapTag + '&gt;', 'g'), '<' + splitConfig.wrapTag + '>')
            .replace(new RegExp('&lt;/' + splitConfig.wrapTag + '&gt;', 'g'), '</' + splitConfig.wrapTag + '>');
        console.log($item[0].innerHTML);
        $item.find(splitConfig.wrapTag).addClass(splitConfig.wrapCls);
    });
}

// 写入高亮样式
function createStyle() {
    if (document.getElementById('speak-light-style')) return;

    var style = document.createElement('style');
    style.id = 'speak-light-style';
    style.innerText = '.' + splitConfig.hightlightCls + '{' + splitConfig.hightStyle + '}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function initEvent() {
    $(document).on('mouseenter.speak-help', speakTags, function (e) {
        var $target = $(e.target);

        if ($target.parents('.' + splitConfig.wrapCls).length || $target.find('.' + splitConfig.wrapCls).length) {
            return;
        }

        if (e.target.nodeName.toLowerCase() === 'img') {
            $target.css({
                border: '2px solid #000'
            });
        } else {
            $target.addClass(splitConfig.hightlightCls);
        }

        // 开始朗读
        speakText(getText(e.target));

    }).on('mouseleave.speak-help', speakTags, function (e) {
        var $target = $(e.target);
        if ($(e.target).parents('.' + splitConfig.wrapCls).length || $target.find('.' + splitConfig.wrapCls).length) {
            return;
        }

        if (e.target.nodeName.toLowerCase() === 'img') {
            $target.css({
                border: 'none'
            });
        } else {
            $target.removeClass(splitConfig.hightlightCls);
        }

        // 停止语音
        stopSpeak();
    });

    $(document).on('mouseenter.speak-help', '.' + splitConfig.wrapCls, function (e) {
        var $this = $(this),
            text = getText(this);
        $this.addClass(splitConfig.hightlightCls);

        // 开始朗读
        speakText(text);
    }).on('mouseleave.speak-help', '.' + splitConfig.wrapCls, function (e) {
        var $this = $(this);
        $this.removeClass(splitConfig.hightlightCls);

        // 停止语音
        stopSpeak();
    });
}

function offEvent() {
    $(document)
        .off('mouseenter.speak-help', speakTags)
        .off('mouseleave.speak-help', speakTags);

    $(document)
        .off('mouseenter.speak-help', '.' + splitConfig.wrapCls)
        .off('mouseleave.speak-help', '.' + splitConfig.wrapCls);
}


// 开始朗读
function speakText(text) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (window.SpeechSynthesisUtterance && window.speechSynthesis) {
            var speaker = new window.SpeechSynthesisUtterance();
            speaker.text = text;
            window.speechSynthesis.speak(speaker);
        } else {
            //client_id与client_secret请到百度语音注册
            $.ajax({
                url: siteInfo.projectName + "/getBaiduSoundAction.action?cmd=getBaiduToken",
                type: "post",
                data: {},
                dataType: "json",
                success: function (msg) {
                    var soundurl = 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tok=' + $.parseJSON(msg.custom).access_token + '&tex="' + encodeURI(text) + '&vol=9';
                    var mySound = soundManager.createSound({
                        id: "soundid",
                        url: soundurl
                    });
                    mySound.play({
                        onfinish: function () {// once sound has loaded and played, unload and destroy it.
                            this.destruct(); // will also try to unload before destroying.
                        }
                    });
                },
                error: function (msg) {
                    console.log(msg);

                }
            })
        }
    }, 200);
}

// 停止朗读
function stopSpeak() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (window.SpeechSynthesisUtterance && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        } else {
            var sound = soundManager.getSoundById("soundid");
            if (typeof (sound) != "undefined") {
                sound.destruct();
            }
        }
    }, 20); 
}

function startSoundMode() {
    // 创建样式
    createStyle();
    // 分隔正文内容
    splitConent($('.ewb-info-main'));
    // 初始化事件
    initEvent();
}


