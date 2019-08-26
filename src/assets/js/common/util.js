export default {
    // 获取不同环境api url
    baseUrl(projectID) {
        let hostname = window.location.hostname,
            regIp = /(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}/g,
            urlMap = {
                'localhost': 'http://eol.kongqia.com:8081/server/index.php?g=Web&c=Mock&o=simple&projectID=$projectID&uri='.replace('$projectID', projectID),
                'xdev.xnw.com': '//org-xdev.xnw.com:' + window.location.port,
                'ddev.xnw.com': '//org-ddev.xnw.com:' + window.location.port,
                'local.xnw.com': '//org-local.xnw.com:' + window.location.port,
                'demo.xnw.com': '//org-demo.xnw.com:' + window.location.port,
                'www.xnw.com': '//api.xnw.com',
                'beta.xnw.com': '//beta-org.xnw.com',
                'xnw.com': '//api.xnw.com',
            };
        if (!urlMap[hostname]) {
            return regIp.test(window.location.hostname) ? window.location.origin : '//api.xnw.com'
        }
        return urlMap[hostname] || window.location.origin;
    },

    // 获取url参数
    getUrlParams (url) {
        url = url || location.href
        var params = {},
            paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");

        for (var i in paraString) {
            var keyValue = paraString[i].split("=");
            params[keyValue[0]] = keyValue[1];
        }
        return params;
    },

    // 获取cookie
    cookie(cookie) {
        cookie = cookie || document.cookie
        let obj = {};
        let items = cookie.split(";").map(function(item){
            return item.split("=")
        })
        items.map(function(item){
            item.reduce(function(i,j){
                if (i) {
                    obj[i.trim()] = j
                }
            })
        })
        return obj;
    },

    // moment本地化
    momentLocal(moment) {
        moment.locale('zh-cn', {
            months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
            monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
            weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
            weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
            weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY-MM-DD',
                LL: 'YYYY年MM月DD日',
                LLL: 'YYYY年MM月DD日Ah点mm分',
                LLLL: 'YYYY年MM月DD日ddddAh点mm分',
                l: 'YYYY-M-D',
                ll: 'YYYY年M月D日',
                lll: 'YYYY年M月D日 HH:mm',
                llll: 'YYYY年M月D日dddd HH:mm'
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (hour, meridiem) {
                if (hour === 12) {
                    hour = 0;
                }
                if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                    return hour;
                } else if (meridiem === '下午' || meridiem === '晚上') {
                    return hour + 12;
                } else {
                    // '中午'
                    return hour >= 11 ? hour : hour + 12;
                }
            },
            meridiem: function (hour, minute, isLower) {
                const hm = hour * 100 + minute;
                if (hm < 600) {
                    return '凌晨';
                } else if (hm < 900) {
                    return '早上';
                } else if (hm < 1130) {
                    return '上午';
                } else if (hm < 1230) {
                    return '中午';
                } else if (hm < 1800) {
                    return '下午';
                } else {
                    return '晚上';
                }
            },
            calendar: {
                sameDay: '[今天]LT',
                nextDay: '[明天]LT',
                nextWeek: '[下]ddddLT',
                lastDay: '[昨天]LT',
                lastWeek: '[上]ddddLT',
                sameElse: 'L'
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
            ordinal: function (number, period) {
                switch (period) {
                    case 'd':
                    case 'D':
                    case 'DDD':
                        return number + '日';
                    case 'M':
                        return number + '月';
                    case 'w':
                    case 'W':
                        return number + '周';
                    default:
                        return number;
                }
            },
            relativeTime: {
                future: '%s内',
                past: '%s前',
                s: '几秒',
                ss: '%d秒',
                m: '1分钟',
                mm: '%d分钟',
                h: '1小时',
                hh: '%d小时',
                d: '1天',
                dd: '%d天',
                M: '1个月',
                MM: '%d个月',
                y: '1年',
                yy: '%d年'
            },
            week: {
                // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
                dow: 1, // Monday is the first day of the week.
                doy: 4  // The week that contains Jan 4th is the first week of the year.
            }
        })
    },



    // 是否是微信
    isWx: function() {
        return /micromessenger/.test(window.navigator.userAgent.toLowerCase())
    },

    // 根据id和尺寸获取图片完整路径
    imgFormat: function(id, width, height) {
        var img = [
            'http://cdn.xnwimg.com/down/s:',
            width,
            'x',
            height || width,
            '/',
            id || 'f:{43886496-BB7C-5F66-E0F5-63BF9B6B43D0}',
            '/1.jpg'
        ];
        return img.join('');
    },

    // 数据埋点上报
    report(type, to, from) {
        // console.log(to, 'to')
        // console.log(from, 'from')
        let params = {
            type: type || this.$route.query.type,
            xid: this.$route.query.xid,
            src_xid  : this.$route.query.src_xid,
            src_type : this.$route.query.src_type,
            root_xid : this.$route.query.root_xid,
            root_type: this.$route.query.root_type
        }

        // 从首页进入课程中心
        // if(to.name === '课程中心' && from.name === '首页') {
        //     if (+to.query.category) {
        //         params = {
        //             xid: 0,
        //             type: 900,
        //             src_xid: to.query.category,
        //             src_type: 450,
        //             root_xid: to.query.category,
        //             root_type: 450
        //         }
        //     } else if(+to.query.is_free) { // 首页免费大课进入课程列表
        //         params = {
        //             xid:0,
        //             type:900,
        //             src_xid: to.query.mid,
        //             src_type:550,
        //             root_xid: to.query.mid,
        //             root_type:550
        //         }
        //     } else {
        //         params = {
        //             xid: 0,
        //             type: 850,
        //             src_xid: 0,
        //             src_type: 0,
        //             root_xid: 0,
        //             root_type: 0
        //         }
        //     }
        // }

        // 从首页进入直播频道
        // if(to.name === '直播频道' && from.name === '首页') {
        //     if (to.query.from) { // 从首页直播预告的查看全部进入直播频道
        //         params = {
        //             xid:0,
        //             type:750,
        //             src_xid:0,
        //             src_type:650,
        //             root_xid:0,
        //             root_type:650
        //         }
        //     } else {
        //         params = {
        //             xid: 0,
        //             type: 750,
        //             src_xid: 0,
        //             src_type: 0,
        //             root_xid: 0,
        //             root_type: 0
        //         }
        //     }
        //
        // }

        // 从首页专题查看个多进入专辑列表
        // if(to.name === '课程专题' && from.name === '首页') {
        //     params = {
        //         xid:0,
        //         type:725,
        //         src_xid: to.params.id,
        //         src_type: 502,
        //         root_xid: to.query.mid,
        //         root_type:500
        //     }
        // }

        // 从首页进入精品大课
        // if(to.name === '精品大课' && from.name === '首页') {
        //     params = {
        //         xid:0,
        //         type: 725,
        //         src_xid: to.params.id,
        //         src_type: 600,
        //         root_xid: to.params.id,
        //         root_type: 600
        //     }
        // }

        // 从首页精彩回放查看全部进入精彩回放
        // if(to.name === '精彩回放' && from.name === '首页') {
        //     params = {
        //         xid: 0,
        //         type: 800,
        //         src_xid: 0,
        //         src_type: 700,
        //         root_xid: 0,
        //         root_type: 700
        //     }
        // }

        // 从直播频道进入精彩回放
        // if(to.name === '精彩回放' && from.name === '直播频道') {
        //     params = {
        //         xid: 0,
        //         type: 800,
        //         src_xid: 0,
        //         src_type: 750,
        //         root_xid: 0,
        //         root_type: 750
        //     }
        // }

        // 从精彩回放进入直播频道
        // if(to.name === '直播频道' && from.name === '精彩回放') {
        //     params = {
        //         xid: 0,
        //         type: 750,
        //         src_xid: 0,
        //         src_type: 800,
        //         root_xid: 0,
        //         root_type: 800
        //     }
        // }

        // this.$router.replace({query: params})
        this.axios({
            url: '/v2/stat/report',
            method: 'POST',
            data: params
        })
    },

    // 获取一个uuid
    getUuid: function() {
        let uuid = '',
            i;
        for (let i = 0; i < 32; i++) {
            uuid += Math.floor(Math.random() * 16).toString(16);
        }
        return uuid;
    },
    //开启麦克风和摄像头权限
    openMedia (opt) {
        let opts = {
            video: true,
            audio: true
        }
        opts =  Object.assign(opts, opt)
        navigator.getUserMedia  = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
    
        if (navigator.getUserMedia) {
            // 支持
            navigator.getUserMedia(opts, function onSuccess(stream) {
                console.log('开启成功');
            }, function onError(error) {
                console.log("摄像头或者麦克风开启失败,请手动尝试开启：", error);
            });
        } else {
            // 不支持
            console.log('浏览器不支持getUserMedia方法')
        }
    },
}