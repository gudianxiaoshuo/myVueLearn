import axios from 'axios'
let share = {
    init: function (option) {
        var self = share;
        Object.assign(self.option, option);
        self.creatScript();
        console.log('微信分享option 1：', self.option);
    },
    option: {
        link: window.location.href,
        title: document.title,
        imgUrl: window.location.origin + '/images/favicon/favicon2014-144.png?20140321',
        desc: document.title
    },
    creatScript: function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var self = share;
        script.type = 'text/javascript';
        script.src= window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
        head.appendChild(script)

        script.onload = function () {
            self.requestConfig();
        }
    },
    initShareWx: function (data) {
        var self = this;
        if (data.errcode !== 0) {
            return false;
        }

        var signPackage = data.package;

        window.wx.config({
            debug: false,
            appId: signPackage.appId,
            nonceStr: signPackage.nonceStr,
            timestamp: signPackage.timestamp,
            signature: signPackage.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });

        window.wx.ready(function () {
            window.wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ],
                success: function (res) {
                }
            });

            var option = {
                link: self.option.link,
                imgUrl: self.option.imgUrl,
                title: self.option.title,
                desc: self.option.desc,
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            };

            console.log('微信分享option 2：', self.option);

            //分享朋友
            window.wx.onMenuShareAppMessage(option);
            // //分享朋友圈
            window.wx.onMenuShareTimeline(option);
        });
    },
    requestConfig: function () {
        var self = this;
        axios({
            url: '/ajax_util.php',
            method: 'POST',
            params: {
                act: 'get_wechat_sign_package',
                url: encodeURIComponent(location.href)
            }
        }).then(res => {
            if (+res.data.errcode) {
                return alert(res.data.msg);
            }
            self.initShareWx(res.data);

        }).catch(error => {
            // alert(error)
        });
    }
};

export default share