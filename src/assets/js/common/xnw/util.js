import __CONST from '@/assets/js/common/xnw/const.js'
import $ from 'jquery'
let util = {
    // 获取不同环境api url
    baseUrl: function(projectID) {
        var hostname = window.location.hostname,
            urlMap = {
                'localhost': 'http://eol.kongqia.com:8081/server/index.php?g=Web&c=Mock&o=simple&projectID=$projectID&uri='.replace('$projectID', projectID),
                'ddev.xnw.com': '//org-ddev.xnw.com:' + window.location.port,
                'xdev.xnw.com': '//org-xdev.xnw.com:' + window.location.port,
                'www.xnw.com': '//api.xnw.com',
                'beta.xnw.com': '//beta-org.xnw.com',
                'xnw.com': '//api.xnw.com',
            };
        return urlMap[hostname] || window.location.origin;
    },
    uround: function(num, dec) {
        if (typeof dec === 'undefined') {
            dec = 0;
        }

        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    },
    mt_rand: function(min, max) {
        //  discuss at: http://phpjs.org/functions/mt_rand/

        var argc = arguments.length;
        if (argc === 0) {
            min = 0;
            max = 2147483647;
        } else if (argc === 1) {
            throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
        } else {
            min = parseInt(min, 10);
            max = parseInt(max, 10);
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    now: function(time) {
        var d = new Date();
        if (time) {
            d = new Date(time);
        }

        return Math.round(+d / 1000);
    },
    pad: function(num, maxLength) {
        return new Array(maxLength - num.toString().length + 1).join('0') + num;
    },
    atUser2Link: function(content) {
        return content.replace(__CONST.REGEX_AT_USER, function() {
            if (arguments[0].match(/\.[a-zA-Z]{2,}/)) {
                return arguments[0];
            } else {
                return arguments[0].replace(arguments[1], '<a card="">' + arguments[1] + '</a>');
            }
        });
    },
    /**
     * 仅支持带有scheme的合法URL
     */
    url2link: function(content) {
        if (typeof content !== 'string' || !content) {
            return '';
        }

        if (__CONST.REGEX_URL.test(content)) {
            content = content.replace(__CONST.REGEX_URL, '<a target="_blank" class="_validUrl" href="$&">$&</a>');
        }

        return content;
    },
    processChatContent: function(content) {
        if (typeof content !== 'string' || !content) {
            return '';
        }

        // ＠ 转 @  ,  < 转 &lt; *xxx* 转 <b>*$1*</b>
        content = util.text2html(content).replace(/\*([^*]+)\*/g, '<b>*$1*</b>');

        // url2link
        content = util.url2link(content);

        if (content.indexOf('[') != -1) {
            //[傻笑] => <img...>
            content = util.text2emotion(content);
        }

        if (content.indexOf('@') != -1) {
            content = util.atUser2Link(content);
        }

        return util.nl2br(content);
    },
    text2emotion: function(content) {
        if (typeof content !== 'string' || !content) {
            return '';
        }

        var emotionList = __CONST.EMOTION_LIST;
        $.each(emotionList, function(text, imgUrl) {
            var re = /[\[\]]/g,
                regexp = new RegExp(text.replace(re, '\\$&'), 'g');

            content = content.replace(regexp, '<img class="emo_pic" title="' + text +
                '" alt="' + text + '" src="' + imgUrl + '"/>');
        });

        return content;
    },
    text2html: function(text) {
        if (typeof text !== 'string' || !text) {
            return '';
        }

        var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#039;',
                '{': '&#123;',
                '}': '&#125;'
            },
            textList = text.replace(/[&<>"'{}]/g, function(m) {
                return map[m];
            }).split('\n'),
            oneLineItem;

        for (var i = 0, j = textList.length; i < j; i++) {
            oneLineItem = textList[i];
            oneLineItem = oneLineItem.replace(/^\s+/g, function(_match) {
                return _match.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/ /g, '&nbsp;');
            });
            textList[i] = oneLineItem;
        }

        return textList.join('\n');
    },
    get_pubtime: function(t) {
        if (t < 60) return t + '秒前';
        if (t < 3600) return util.uround(t / 60, 0) + '分钟前';
        if (t < 86400) return util.uround(t / 3600, 0) + '小时前';
        return util.uround(t / 86400, 0) + '天前';
    },
    getDuration: function(duration) {
        return Math.floor(+duration * .001) || 0;
    },
    getFriendlyByteSize: function(byteSize) {
        if (!+byteSize) {
            return '0 KB';
        }

        if (byteSize < 1024 * 1024) {
            return util.uround(byteSize / 1024, 2) + ' KB';
        }

        if (byteSize < 1024 * 1024 * 1024) {
            return util.uround(byteSize / (1024 * 1024), 2) + ' MB';
        }

        return util.uround(byteSize / (1024 * 1024 * 1024), 2) + ' GB';
    },
    strQuote: function(str) {
        /*eslint no-control-regex: 1*/
        return (str + '').replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08')
    },
    md5Sum2UUID: function(md5) {
        var idList = [],
            md5sum = md5 ? md5.toUpperCase() : '';

        if (md5sum) {
            idList.push('{' + md5sum.substring(6, 8) + md5sum.substring(4, 6) +
                md5sum.substring(2, 4) + md5sum.substring(0, 2));
            idList.push(md5sum.substring(10, 12) + md5sum.substring(8, 10));
            idList.push(md5sum.substring(14, 16) + md5sum.substring(12, 14));
            idList.push(md5sum.substring(16, 20));
            idList.push(md5sum.substring(20) + '}');
        }

        return idList.join('-');
    },
    /**
     * 获取一个随机整数
     */
    getRandomInt: function() {
        return util.uround(Math.random() * 10000);
    },
    getCellPhoneNumber: function(str) {
        return (str + '').replace(/\D/g, '').replace(/^00?86/g, '');
    },
    getUSAPhoneNumber: function(str) {
        return (str + '').replace(/^001/g, '').replace(/^\+1/g, '');
    },

    isValidMail: function(mail) {
        return __CONST.REGEXP_EMAIL.test(mail);
    },
    isValidMobile: function(str) {
        if (str.substring(0, 2) == '+1' || str.substring(0, 3) == '001') {
            return __CONST.REGEXP_MOBILE_USA.test(util.getUSAPhoneNumber(str + ''));
        } else {
            return __CONST.REGEXP_MOBILE.test(util.getCellPhoneNumber(str + ''));
        }
    },
    isValidUserAccount: function(account) {
        return !(!account || __CONST.ALL_NUMBER.test(account) || !__CONST.ACCOUNT.test(account));
    },
    /**
     * 得到解析url参数键值对
     * @param {String} url      要解析的Url
     * @param {String} param    要获取的参数名
     * @return {mixed}
     *         {Object} 解析后的对象
     *         {String} 指定 param 对应的值
     */
    parseQueryString: function(url, param) {
        var vars = {},
            href = typeof url === 'string' ? url : window.location.href;

        href.replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi,
            function(match, key, value) {
                vars[key] = typeof value !== 'undefined' ? decodeURIComponent(value) : '';
            }
        );

        if (param) {
            return typeof vars[param] !== 'undefined' ? decodeURIComponent(vars[param]) : null;
        }

        return vars;
    },
    msg_show: function (message, msg_type, time) {
        switch (msg_type) {
            case 'success':
            case 'normal':
                msg_type = 'normal';
                time = time || 1500;
                break;
            case 'warning':
                time = time || 5000;
                break;
            case 'failure':
                time = time || 5000;
                break;
            default:
                break;
        }

        msg_type = msg_type || 'normal';
        time = time || 1500;
        message = '<img class="' + msg_type + '" src="/images/transparence.gif" width="40" height="33" /><span>' + message + '</span>';
        util.show_message(message, time);
    },
    show_message: function(message, timeout, hideCloseBtn, boxClass) {
        var $message = util.get_message_layer(hideCloseBtn, boxClass),
            $content = $('#__emssage_box_content__'),
            hideMsg = function(timeout) {
                timeout = timeout || 'fast';
                $message.fadeOut(timeout);
            };
        message = boxClass === 'newPopInfomation' ? '<i class="xicon-selected"></i>' + message : message;
        $content.empty().html(message);
        $message.show();
        timeout = +timeout < 0 ? 1500 : (+timeout || 1500);
        if (timeout > 0) {
            setTimeout(hideMsg, timeout);
        }
    },
    stripTags: function(input, allowed) {
        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    },
    nl2br: function(str) {
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br /><i></i>' + '$2');
    },
    get_message_layer: function(hideCloseBtn, boxClass) {
        if (!$('#__emssage_box__').length) {
            var html = '<div class="divFixed pop_infomation ' + (boxClass ? boxClass : '') + '" id="__emssage_box__" style="display:none">' + (hideCloseBtn ? '' : '<div class="pop_infomation_del" id="del_msg">×</div>') + '<p id="__emssage_box_content__"></p></div>';
            var $box = $(html).appendTo('body');
            $box.find('div').bind('click', function() {
                $box.hide();
            });
        }

        return $('#__emssage_box__');
    },
    friendlyFocus: function($el) {
        if (!util.isExistQuery($el)) {
            return false;
        }

        var val = $el.val() || '';
        if (val) {
            $el.val('');
        }

        return $el.val(val).focus().append('');
    },
    mb_str_width: function(str) {
        str += '';
        var len = str.length,
            width = len;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 254) {
                width++;
            }
        }

        return width;
    },
    /**
     * 调整缩略图尺寸
     * @param {Object} $picList     图片列表
     * @param {Number} wrapWdith    外层宽度
     * @param {Number} wrapHeight   外层高度
     */
    adjustSmallPicSize: function($picList, wrapWidth, wrapHeight) {
        if (!util.isExistQuery($picList) || !wrapWidth || !wrapHeight) {
            return false;
        }

        $picList.each(function() {
            var img = this,
                $img = $(img);
            $img.load(function() {
                var wrapRatio = wrapWidth / wrapHeight,
                    realWidth = img.naturalWidth || img.width,
                    realHeight = img.naturalHeight || img.height,
                    ratio = realWidth / realHeight,
                    css;
                // 横向超出
                if (ratio > wrapRatio) {
                    css = {
                        position: 'relative',
                        left: -Math.ceil((ratio * wrapHeight - wrapWidth) * 0.5),
                        maxWidth: 'none',
                        height: wrapHeight
                    };
                } else {
                    css = {
                        position: 'relative',
                        top: -Math.ceil((wrapWidth / ratio - wrapHeight) * 0.5),
                        maxHeight: 'none',
                        width: wrapWidth
                    };
                }
                $img.removeAttr('style').css(css);
            });
        });
        return false;
    },
    isFunction: function(o) {
        var getType = {};
        return Boolean(o && getType.toString.call(o) == '[object Function]');
    },
    get_uuid: function() {
        var uuid = '',
            i;
        for (i = 0; i < 32; i++) {
            uuid += Math.floor(Math.random() * 16).toString(16);
        }
        return uuid;
    },
    getScriptFile: function(uri, callback) {
        var d = new Date(),
            url = uri + '?' + +d;

        return $.getScript(url)
            .done(function() {
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .fail(function() {});
    },
    timeout: function(milliseconds) {
        var dfd = $.Deferred();
        if (+milliseconds < 0) {
            milliseconds = 1500;
        }

        milliseconds = milliseconds || 1500;

        setTimeout(dfd.resolve, milliseconds);
        return dfd.promise();
    },
    getJaxScript: function(milliseconds) {
        return util.timeout(milliseconds)
            .then(function() {
                var $script = $('<script>', {
                    type: 'text/javascript',
                    src: '/MathJax/MathJax.js?locale=zh-hans'
                });
                if (!window.MathJax) {
                    $script.appendTo('body');
                }
            })
            .then(function() {
                MathJax.Callback.Queue(
                    ['Require', MathJax.Ajax, '[MathJax]/config/TeX-AMS-MML_HTMLorMML-full.js']
                );
            });
    },
    get_offset_txt: function(textarea) {
        var str = '',
            caretPos = 0,
            isIE = util.isIE();

        if (isIE && isIE < 9) {
            if (document.selection) {
                var bdtxtrng = document.body.createTextRange();
                bdtxtrng.moveToElementText(textarea);
                var sel = document.selection.createRange();
                sel.setEndPoint('StartToStart', bdtxtrng);
                str = sel.text;
            }
        } else {
            // Firefox/Chrome/IE>=9 support
            if (textarea.selectionStart || (textarea.selectionStart == '0')) {
                caretPos = textarea.selectionStart;
                str = textarea.value.slice(0, caretPos);
            }
        }

        return str;
    },
    set_cursor_pos: function(ctrl, pos) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        } else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    },
    /**
     * 初始化自定义滚轮事件
     * @param {Object} $element     滚动元素
     * @param {Object} option       自定义参数
     *                 option.scrollUp      向上滚动事件
     *                 option.scrollDown    向下滚动事件
     */
    initCustomWheelEvent: function($element, option) {
        var defaults = {
            scrollUp: $.noop,
            scrollDown: $.noop
        };

        if ($.isPlainObject(option)) {
            $.extend(defaults, option);
        }

        return $element
            .off('mousewheel.xnw')
            .on('mousewheel.xnw', function(e) {
                if (e.deltaY > 0 && typeof defaults.scrollUp === 'function') {
                    defaults.scrollUp();
                } else if (e.deltaY < 0 && typeof defaults.scrollDown === 'function') {
                    defaults.scrollDown();
                }

                return false;
            });
    },
    scrollTo: function($obj) {
        var $body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body');
        var st = $($obj).offset() ? $($obj).offset().top : 0;
        $body.animate({ scrollTop: st - 200 }, 1000);
    },
    qj2bj: function(str) {
        str += '';
        var result = '',
            len = str.length || 0;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) == 12288) {
                result += String.fromCharCode(str.charCodeAt(i) - 12256);
                continue;
            }

            if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
            } else {
                result += String.fromCharCode(str.charCodeAt(i));
            }
        }

        return result;
    },
    number2chinese: function(number) {
        var chinese_number_arr = new Array('', '一', '二', '三', '四', '五', '六', '七', '八', '九');
        var decade = Math.floor(number / 10);
        var units = number % 10;
        var class_name = '';
        if (decade == 1) {
            class_name = '十' + chinese_number_arr[units];
        } else if (decade > 1) {
            class_name = chinese_number_arr[decade] + '十' + chinese_number_arr[units];
        } else {
            class_name = chinese_number_arr[units];
        }

        return class_name;
    },
    update_url: function(url) {
        if (typeof window.history.pushState != 'undefined') {
            window.history.pushState({}, '', url);
        }
    },
    appendInt32: function(strBuf, v) {
        strBuf += String.fromCharCode(v & 0xff);
        strBuf += String.fromCharCode((v & 0xff00) >>> 8);
        strBuf += String.fromCharCode((v & 0xff0000) >>> 16);
        strBuf += String.fromCharCode((v & 0xff000000) >>> 24);
        return strBuf;
    },
    getFileBlock: function(size) {
        var blockSize = 0x40000,
            blockCount = 0x100,
            blockLastSize = 0;

        if (size <= 0x400000) {
            blockSize = 0x4000;
        }

        while (blockCount * blockSize < size) {
            blockCount += 0x40;
            blockSize += 0x10000;
        }

        blockCount = parseInt((size + blockSize - 1) / blockSize, 10);

        if (blockCount == 1) {
            blockSize = size;
        }

        blockLastSize = size - (blockCount - 1) * blockSize;

        return {
            blockSize: blockSize,
            blockCount: blockCount,
            blockLastSize: blockLastSize
        };
    },
    CRC32: function(sMessage) {
        var tbl = [];

        // generate table
        function init_tbl() {
            for (var i = 0; i < 256; ++i) {
                var r = (i << 24) >>> 0;
                for (var bit = 0; bit < 8; ++bit) {
                    if (r & 0x80000000) {
                        r = ((r << 1) ^ 0x04C11DB7);
                    } else {
                        r <<= 1;
                    }

                    r = r >>> 0;
                }

                tbl.push(r);
            }
        }

        // append crc
        function append(string, len, crc) {
            for (var i = 0; i < len; ++i) {
                crc = (((crc << 8) & 0xffffffff) | string.charCodeAt(i)) ^ tbl[(crc & 0xff000000) >>> 24];
                crc = crc >>> 0;
            }

            return crc;
        }

        init_tbl();
        return append(sMessage, sMessage.length, 0);
    },
    arrayUnique: function(arr) {
        var i,
            n,
            o = {},
            newArr = [];

        for (i = 0; i < arr.length; i++) {
            n = arr[i] + typeof(arr[i]); //如果不需要类型判断，直接将后面的去掉即可

            if (typeof(o[n]) === 'undefined') {
                newArr[newArr.length] = arr[i];
                o[n] = 1;
            }
        }
        return newArr;
    },
    hideSpecificFigures: function(str, offset, length) {
        if (typeof str !== 'string' || !str) {
            return '';
        }

        var start = +offset || 0;
        if (isNaN(+offset) || start < 0) {
            return '';
        }

        var len = +length || 0;
        if (len < 0) {
            return '';
        }

        var restLen = str.length - len,
            suffixLen = restLen - start;
        return str.slice(0, start) + Array(len + 1).join('*') + str.slice(-suffixLen);
    },
    hidePhoneFigures: function(mobileStr, hideLength) {
        if (!util.isValidMobile(mobileStr)) {
            return '';
        }

        var len = +hideLength || 4,
            mobile = util.getCellPhoneNumber(mobileStr),
            length = mobile.length;
        if (len >= length - 1 || len < 1) {
            return mobile;
        }

        var restLen = length - len,
            prefixLen = Math.ceil(restLen * 0.5);
        return mobile.slice(0, prefixLen) + Array(len + 1).join('*') + mobile.slice(prefixLen - restLen);
    },
    genMapApi: function() {
        var baiduMapAk = 'nPcEq4vEQLMDW7aPGTMaaOiQ03QEMDTO';
        return {
            ipLocation: 'http://api.map.baidu.com/location/ip?coor=bd09ll&ak=' + baiduMapAk,
            suggestion: 'http://api.map.baidu.com/place/v2/suggestion?output=json&ak=' + baiduMapAk
        };
    },
    getLngLnt: function(address) {
        var baiduMapAk = 'nPcEq4vEQLMDW7aPGTMaaOiQ03QEMDTO';
        return {
            location: 'http://api.map.baidu.com/geocoder/v2/?address=' + address + '&output=json&ak=' + baiduMapAk
        };
    },
    getCos: function(deg) {
        var val = 1;
        switch (deg) {
            case 90:
            case 270:
                val = 0;
                break;
            case 180:
                val = -1;
                break;
            default:
                break;
        }

        return val;
    },
    getSin: function(deg) {
        var val = 1;
        switch (deg) {
            case 270:
                val = -1;
                break;
            case 0:
            case 180:
                val = 0;
                break;
            default:
                break;
        }

        return val;
    },
    getViewport: function() {
        return {
            x: $(window).scrollLeft(),
            y: $(window).scrollTop(),
            w: __CONST.IS_TOUCH_DEVICE && window.innerWidth ? window.innerWidth : $(window).width(),
            h: __CONST.IS_TOUCH_DEVICE && window.innerHeight ? window.innerHeight : $(window).height()
        };
    },
    getWinScrollLeft: function() {
        var rez = util.getViewport();
        return rez.x;
    },
    getWinScrollTop: function() {
        var rez = util.getViewport();
        return rez.y;
    },
    isIE: function() {
        var ix,
            verOffset,
            version = '',
            nAgt = navigator.userAgent;
        if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            version = nAgt.substring(verOffset + 5);
        } else if (nAgt.indexOf('Trident/') != -1) {
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }

        if (((ix = version.indexOf(';')) != -1) || ((ix = version.indexOf(' ')) != -1) || ((ix = version.indexOf(')')) != -1)) {
            version = version.substring(0, ix);
        }

        var majorVersion = parseInt(version, 10);

        return majorVersion ? majorVersion : 0;
    },
    isHidden: function($el) {
        var el;
        if (util.isQuery($el)) {
            el = $el[0];
        } else {
            el = $el;
        }

        return (el.offsetParent === null);
    },
    isMale: function(gender) {
        return gender == __CONST.GENDER_M;
    },
    isFemale: function(gender) {
        return gender == __CONST.GENDER_F;
    },
    isWeChatBrowser: function() {
        return /MicroMessenger/gi.test(navigator.userAgent);
    },
    isQuery: function(obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
    },
    isExistQuery: function(obj) {
        return util.isQuery(obj) && obj.length;
    },
    isHttpsProto: function() {
        return /https/g.test(location.protocol);
    },
    isValidStringLength: function(str, min, max) {
        if (typeof str !== 'string') {
            return;
        }

        var len = str.length;
        min = min || 0;
        max = max || 100;
        return !(len < min || len > max) && (min >= 0 && max >= 0);
    },
    updateNumber: function($element, stepBy, isTwinkle) {
        if (!util.isExistQuery($element)) {
            return false;
        }

        var step = +stepBy || 1;
        $element.each(function() {
            var $el = $(this),
                count = parseInt($.text(this), 10) || 0;

            count += step;

            $el.text(count);

            if (isTwinkle !== false) {
                $el.twinkle();
            }
        });
    },
    /**
     * 初始化时间控件
     * @see http://trentrichardson.com/examples/timepicker/
     * @param {Object} $input input元素
     * @param {Object} opt    自定义参数
     */
    initTimePicker: function($input, opt) {
        var options = {
            timeOnly: true,
            timeText: '时间',
            hourText: '小时',
            showTime: false,
            minuteText: '分钟',
            closeText: '确定',
            timeFormat: 'HH:mm'
        };

        if ($.isPlainObject(opt)) {
            $.extend(true, options, opt);
        }

        return $input.timepicker(options);
    },
    /**
     * 初始化日期时间控件
     * @see http://trentrichardson.com/examples/timepicker/
     * @param {Object} $input input元素
     * @param {Object} opt    自定义参数
     */
    initDateTimePicker: function($input, opt) {
        var today = new Date(),
            options = {
                minDate: 0,
                maxDate: 180,
                timeText: '时间',
                hourText: '小时',
                showTime: false,
                minuteText: '分钟',
                closeText: '确定',
                timeFormat: 'HH:mm',
                dateFormat: 'yy年mm月d日',
                defaultDate: today,
                beforeShow: function() {
                    setTimeout(function() {
                        $('#ui-datepicker-div').css('z-index', 1001);
                    }, 100);
                }
            };

        if ($.isPlainObject(opt)) {
            $.extend(true, options, opt);
        }

        return $input.datetimepicker(options);
    },
    /**
     * 初始化日期时间段datetimerange控件
     * @see http://trentrichardson.com/examples/timepicker/
     * @param {Object} $firstInput  第一个input元素
     * @param {Object} $secondInput 第二个input元素
     * @param {Object} opt    自定义参数
     */
    initDateTimeRange: function($firstInput, $secondInput, opt) {
        if (!util.isExistQuery($firstInput) || !util.isExistQuery($secondInput)) {
            return;
        }

        var options = {
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm',
            timeText: '时间',
            hourText: '小时',
            minuteText: '分钟',
            closeText: '确定',
            start: {
                showTime: false,
                maxDate: '+6m',
                stepMinute: 15
            },
            end: {
                showTime: false,
                maxDate: '+6m',
                stepMinute: 15
            }
        };

        if ($.isPlainObject(opt)) {
            $.extend(true, options, opt);
        }

        $.timepicker.datetimeRange($firstInput, $secondInput, options);
    },
    /**
     * 初始化选择图片区域插件
     * @param {Object} $img IMG标签元素
     * @param {Object} opts 自定义参数
     */
    initImgAreaSelect: function($img, opts) {
        var option = {
                x1: 0,
                y1: 0,
                show: true,
                enable: true,
                handles: true,
                instance: true,
                aspectRatio: '1:1',
                minWidth: 10,
                minHeight: 10,
                maxWidth: 300,
                maxHeight: 300
            },
            imgWidth = $img.width(),
            imgHeight = $img.height(),
            imgAspectRatio = imgWidth / imgHeight,
            minVal = Math.min(imgWidth, imgHeight) * 0.99,
            maxVal = Math.max(imgWidth, imgHeight) * 0.99,
            opt = {},
            size,
            ratio;

        ratio = (size = (opts.aspectRatio ? opts.aspectRatio : option.aspectRatio || '').split(/:/))[0] / size[1];
        if (imgAspectRatio > ratio) {
            opt = {
                x2: minVal * ratio,
                y2: minVal
            };
        } else if (imgAspectRatio > 1) {
            opt = {
                x2: maxVal,
                y2: maxVal / ratio
            };
        } else {
            opt = {
                x2: minVal,
                y2: minVal / ratio
            };
        }

        $.extend(true, option, opt);
        if ($.isPlainObject(opts)) {
            $.extend(true, option, opts);
        }

        return $img.imgAreaSelect(option);
    },
    /**
     * 判定DOM元素是否出现垂直滚动条
     * @param jQuery $wrap    外层元素
     * @pram  jQuery $inner   内层元素
     */
    hasVerticalScrollBar: function($wrap, $inner) {
        return util.isExistQuery($wrap) && util.isExistQuery($inner) ?
            $inner[0].scrollHeight > $wrap.outerHeight() : false;
    },
    /**
     * 统一DOM元素的高度
     * @param jQuery $max      高度最高的元素
     * @pram  array  domList   要比较的元素列表
     */
    unifyDomHeight: function($max, domList) {
        if (!util.isExistQuery($max)) {
            return false;
        }

        $.each(domList, function(i, v) {
            var $dom = $(v);
            if (!util.isExistQuery($dom)) {
                return;
            }

            if ($dom.outerHeight() > $max.outerHeight()) {
                $max = $dom;
            }

            $dom.css({ height: '' });
        });

        var $maxHeightChild = $max.find('._equal_height'),
            maxHeight = $maxHeightChild.height() || 170;

        $.each(domList, function(i, v) {
            var $dom = $(v);
            if (!util.isExistQuery($dom) || $dom.is($max)) {
                return;
            }

            var $child = $dom.find('._equal_height');
            $child.css({ height: maxHeight });
        });
    },
    /**
     * 比较并调整两个元素的高度
     * @param $firstElement   第一个jQuery对象
     * @param $secondElement  第二个jQuery对象
     */
    adjustHeight: function($firstElement, $secondElement) {
        if (!util.isExistQuery($firstElement) || !util.isExistQuery($secondElement)) {
            return false;
        }

        $firstElement.css({ height: '' });
        $secondElement.css({ height: '' });

        var firstHeight = parseInt($firstElement.outerHeight(true), 10),
            secondHeight = parseInt($secondElement.outerHeight(true) + parseInt($secondElement.css('padding-top'), 10) + parseInt($secondElement.css('padding-bottom'), 10), 10);

        if (firstHeight > secondHeight) {
            $secondElement.css({ height: firstHeight });
        } else {
            $firstElement.css({ height: secondHeight });
        }
    },
    /**
     * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     */
    /*jshint unused:false */
    naturalSort: function(a, b) {
        'use strict';
        var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
            sre = /(^[ ]*|[ ]*$)/g,
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            // convert all to strings strip whitespace
            x = a.toString().replace(sre, '') || '',
            y = b.toString().replace(sre, '') || '',
            // chunk/tokenize
            xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
            yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0'),
            // numeric, hex or date detection
            xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
            yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
            oFxNcL, oFyNcL;
        // first try and sort Hex codes or Dates
        if (yD) {
            if (xD < yD) { return -1; } else if (xD > yD) { return 1; }
        }

        // natural sorting through split numeric strings and default strings
        for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
            // find floats not starting with '0', string or 0 if not defined (Clint Priest)
            oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
            oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
            // handle numeric vs string comparison - number < string - (Kyle Adams)
            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
                return (isNaN(oFxNcL)) ? 1 : -1;
                // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
            } else if (typeof oFxNcL !== typeof oFyNcL) {
                oFxNcL += '';
                oFyNcL += '';
            }

            if (oFxNcL < oFyNcL) { return -1; }
            if (oFxNcL > oFyNcL) { return 1; }
        }

        return 0;
    },
    /**
     * 是否包含有效数据
     * @param {Object} options 自定义数据对象
     * @return {Boolen}
     */
    hasSomeValidData: function(options) {
        var ret = false,
            ops = $.isPlainObject(options) ? options : {};

        $.each(ops, function(i, v) {
            if (v) {
                ret = true;
                return false;
            }
        });
        return ret;
    },
    /**
     * 是否所有元素都有效
     * @param {Object} options 自定义数据对象
     * @return {Boolen}
     */
    allElementsIsValid: function(options) {
        var ret = true,
            ops = $.isPlainObject(options) ? options : {};

        $.each(ops, function(i, v) {
            if (!v) {
                ret = false;
                return false;
            }
        });
        return ret;
    },
    /**
     * 生成自定义表单元素
     * @param {String} url      表单请求地址
     * @param {Object} dataList 表单数据
     * @param {Object} formAttr 表单的属性
     *        {String} method   提交表单的http方式
     *        {String} target   在哪里显示提交结果
     */
    genForm: function(url, dataList, formAttr) {
        if (!$.isPlainObject(dataList)) {
            dataList = {};
        }

        var defaultAttr = {
            id: '_fakeForm',
            action: url
        };
        if ($.isPlainObject(formAttr)) {
            $.extend(defaultAttr, formAttr);
        }

        var $form = $('<form>', defaultAttr);

        $.each(dataList, function(key, val) {
            $form.append($('<input/>').attr({
                type: 'hidden',
                name: key
            }).val(val));
        });
        return $form.appendTo('body');
    },
    /**
     * 模拟表单POST提交
     * @param {String} url 表单请求地址
     * @param {Object} dataList 表单数据
     * @return {Boolen}
     */
    simulatePostAction: function(url, dataList) {
        var $form = util.genForm(url, dataList, { method: 'post' });
        if (!util.isExistQuery($form)) {
            return false;
        }

        $form.submit();
        return false;
    },

    /**
     * 根据时间戳获取带格式的时间
     * @param {Int} time seconds of unixtimestamp
     * @param {Object} opt
     * @param {String} opt.dateFormat 日期格式
     * @param {String} opt.timeFormat 时间格式
     * @return {String}
     */
    getFormatDate: function(timeStamp, opt) {
        var time = new Date(timeStamp * 1000),
            year = time.getFullYear(),
            month = time.getMonth(),
            day = time.getDate(),
            hour = time.getHours(),
            min = time.getMinutes(),
            second = time.getSeconds(),
            date = '',
            option = {
                dateFormat: 'yy/mm/dd',
                timeFormat: 'HH:mm:ss'
            };

        if ($.isPlainObject(opt)) {
            $.extend(true, option, opt);
        }

        if (option.dateFormat) {
            date = $.datepicker.formatDate(option.dateFormat, new Date(year, month, day), {});
        }

        if (option.timeFormat) {
            date += ' ' + $.datepicker.formatTime(option.timeFormat, { hour: hour, minute: min, second: second }, {});
        }

        return date;
    },
    /**
     * 初始化美化Select Box 功能
     * @param {Object} $el jQuery对象
     * @param {Object} opt 自定义参数
     */
    initChosen: function($el, opt) {
        var setting = {
            width: '75px',
            no_results_text: ' ',
            disable_search: true,
            placeholder_text_single: '请选择'
        };

        if ($.isPlainObject(opt)) {
            $.extend(setting, opt);
        }

        return $el.chosen(setting);
    },
    /**
     * 初始化美化滚动条功能
     * @param {Object} $el jQuery对象
     * @param {Object} opt 自定义参数
     * @return {Boolen}
     * @static
     */
    initNiceScroll: function($el, opt) {},
    /**
     * 设定输入字符限制
     * @param {Object} $el html元素
     * @param {Number} max 最大字符限制数
     * @param {Object} opt 自定义设置
     */
    limitCharCount: function($el, max, opt) {
        var options = {
            format: '%1',
            delay: 100
        };

        if ($.isPlainObject(opt)) {
            $.extend(true, options, opt);
        }

        return $el.charCounter(max, options);
    },
    getBrowserData: function() {
        // ScreenSize
        var screenSize = '',
            unknown = '-',
            width,
            height;
        if (screen.width) {
            width = (screen.width) ? screen.width : '0';
            height = (screen.height) ? screen.height : '0';
            screenSize += '' + width + ' x ' + height;
        }

        // Browsers
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = +parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }

        // trim the version string
        if (((ix = version.indexOf(';')) != -1) || ((ix = version.indexOf(' ')) != -1) || ((ix = version.indexOf(')')) != -1)) {
            version = version.substring(0, ix);
        }

        majorVersion = parseInt(version, 10);
        if (isNaN(majorVersion)) {
            version = +parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mob version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookieEnabled
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'cookieEnabled';
            cookieEnabled = (document.cookie.indexOf('cookieEnabled') != -1) ? true : false;
        }

        // operate system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows ME', r: /Windows ME/ },
            { s: 'Windows Phone OS 7.0', r: /Windows Phone OS 7.0/ },
            { s: 'Windows Phone OS 7.1', r: /Windows Phone OS 7.1/ },
            { s: 'Windows Phone OS 7.5', r: /Windows Phone OS 7.5/ },
            { s: 'Windows Phone OS 7.8', r: /Windows Phone 7.8/ },
            { s: 'Windows Phone 8.0', r: /Windows Phone 8.0/ },
            { s: 'Windows Phone 8.1', r: /Windows Phone 8.1/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /iP(hone|ad|od)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /Mac(PPC|Intel|_PowerPC|intosh)/ },
            { s: 'RIM Tablet OS', r: /RIM Tablet OS 2.1.0/ },
            { s: 'BlackBerry', r: /BlackBerry 9900/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;
        if (/Windows/.test(os)) {
            if (/Windows Phone OS/.test(os)) {
                osVersion = /Windows Phone OS(.*)/.exec(os)[1];
                os = 'Windows Phone';
            } else if (/Windows Phone/.test(os)) {
                osVersion = /Windows Phone(.*)/.exec(os)[1];
                os = 'Windows Phone';
            } else {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;
            case 'Android':
                if ((osVersion = /Android ([\.\_\d]+)/.exec(nAgt))) {
                    osVersion = osVersion[1];
                }

                break;
            case 'iOS':
                if ((osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer))) {
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                }

                break;
            case 'Linux':
                osVersion = /Linux (x\d+_\d+)/.exec(nAgt)[1];
                break;
            case 'RIM Tablet OS':
                osVersion = /RIM Tablet OS ([\.\_\d]+)/.exec(nAgt)[1];
                break;
            case 'BlackBerry':
                osVersion = /BlackBerry (\d+)/.exec(nAgt)[1];
                break;
        }

        // flash
        var flashVersion = 'not detected';
        if (typeof window.swfobject != 'undefined') {
            var fv = window.swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            } else {
                flashVersion = unknown;
            }
        }

        return {
            ua: nAgt,
            mobileMode: mobile,
            screen: screenSize,
            cookies: cookieEnabled,
            flashVersion: flashVersion,
            os: {
                name: os,
                version: osVersion
            },
            browser: {
                name: browser,
                version: version
            }
        };
    },
    /**
     * 判断浏览器是否启用了 flash
     */
    hasFlash: function () {
        var hasFlash = false;
        
        try {
            hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
        } catch (exception) {
            hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
        }
        return hasFlash;
    },
    /**
     * 阿拉伯数字转换为中文数字
     */
    getNumberToChinese: function(num) {
        var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            chnUnitSection = ['', '万', '亿', '万亿', '亿亿'],
            chnUnitChar = ['', '十', '百', '千'],
            unitPos = 0,
            strIns = '',
            chnStr = '',
            needZero = false;

        if (num === 0) {
            return chnNumChar[0];
        }

        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }

            strIns = util.sectionToChinese(section, chnNumChar, chnUnitSection, chnUnitChar);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        if (chnStr.length > 1 && chnStr.length < 4 && chnStr.substr(0, 1) == '一') {
            chnStr = chnStr.substr(1, 2);
        }

        return chnStr;
    },
    sectionToChinese: function(section, chnNumChar, chnUnitSection, chnUnitChar) {
        var strIns = '',
            chnStr = '',
            unitPos = 0,
            zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }

            unitPos++;
            section = Math.floor(section / 10);
        }

        return chnStr;
    },
    ctrlEnter: function($container, target) {
        $container
            .on('keydown.hotkey', 'input, textarea', function(e) {
                var keyCode = e.keyCode || e.which;
                if (e.ctrlKey && (keyCode == 13 || keyCode == 10)) {
                    e.preventDefault();
                    $container.find(target).trigger('click', [e]);
                    return false;
                }
            });
    },
    enter: function($container, target) {
        $container
            .on('keydown.hotkey', 'input, textarea', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode == 13 || keyCode == 10) {
                    if (e.ctrlKey || e.shiftKey) {
                        return false;
                    }

                    e.preventDefault();
                    $container.find(target).trigger('click', [e]);
                    return false;
                }
            });
    },
    mbStrWidth: function(str) {
        if (typeof str !== 'string' || !str) {
            return '';
        }

        var c = '',
            l = str.length,
            length = 0;

        for (var i = 0; i < l; i++) {
            c = str.charCodeAt(i);
            if (0x0000 <= c && c <= 0x0019) {
                length += 0;
            } else if (0x0020 <= c && c <= 0x1FFF) {
                length += 1;
            } else if (0x2000 <= c && c <= 0xFF60) {
                length += 2;
            } else if (0xFF61 <= c && c <= 0xFF9F) {
                length += 1;
            } else if (0xFFA0 <= c) {
                length += 2;
            }
        }

        return length;
    },
    stringSplice: function(str, indexStart, indexEnd, replacement) {
        if (typeof str !== 'string' || !str) {
            return '';
        }

        if (typeof replacement === 'undefined') {
            replacement = '';
        }

        return str.substring(indexStart, indexEnd) + replacement;
    },
    fullScreen: function(element) {
        // var element= document.getElementById('_handoutImgContainer');
        // 若要全屏页面中div，var element= document.getElementById("divID");
        // var element= document.documentElement;




        if (window.ActiveXObject) {
            //IE 10及以下ActiveXObject
            // var WsShell = new ActiveXObject('WScript.Shell');
            // WsShell.SendKeys('{F11}');
        } else if (element.requestFullScreen) {
            //HTML W3C 提议
            element.requestFullScreen();
        } else if (element.msRequestFullscreen) {
            //IE11
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            // Webkit (works in Safari5.1 and Chrome 15)
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            // Firefox (works in nightly)
            element.mozRequestFullScreen();
        }
    },
    exitScreen: function(element) {
        // var element= document.documentElement;
        // 若要全屏页面中div，var element= document.getElementById("divID");
        //IE ActiveXObject
        if (window.ActiveXObject) {
            // var WsShell = new ActiveXObject('WScript.Shell');
            // WsShell.SendKeys('{F11}');
        } else if (element.requestFullScreen) {
            //HTML5 W3C 提议
            document.exitFullscreen();
        } else if (element.msRequestFullscreen) {
            //IE 11
            document.msExitFullscreen();
        } else if (element.webkitRequestFullScreen) {
            // Webkit (works in Safari5.1 and Chrome 15)
            document.webkitCancelFullScreen();
        } else if (element.mozRequestFullScreen) {
            // Firefox (works in nightly)
            document.mozCancelFullScreen();
        }
    },
    put_layer_middle_inpage: function($layer, layerPosition) {
        var position = layerPosition;
        if (!layerPosition) {
            position = 'absolute';
        }

        $layer
            .css({
                position: position,
                left: ($(window).width() - $layer.outerWidth()) * 0.5
            });

        var top = ($(window).height() - $layer.outerHeight()) * 0.5;
        if (top < 0) {
            top = 0;
        }

        if (position == 'absolute') {
            top = $doc.scrollTop() + top;
        }

        $layer.css('top', top);
        return $layer;
    },
    adjustZindex: function($layer) {
        var $this = util.isQuery($layer) ? $layer : $(this),
            $layerList = $('._div_layer'),
            maxZindex = 0;

        $layerList.each(function() {
            var thisZindex = parseInt($(this).css('z-index'), 10) || 100;
            if (maxZindex < thisZindex) {
                maxZindex = thisZindex;
            }
        });

        $this.css('z-index', maxZindex + 1);
    }

}

export default util