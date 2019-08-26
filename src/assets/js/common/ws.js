/**
 * Tile: webSocket
 * Desc: longpolling to webSocket
 * User: liuzhengming
 * Date: 2018/5/17
 */

import util from '@/assets/js/common/util.js'
import axios from 'axios'
import convert from 'xml-js'

let __ws = {
    url: '',
    sid: '',
    gid: util.cookie()._id,
    passport: encodeURIComponent(decodeURIComponent(util.cookie()._passport)),
    cb_recv: null,
    cb_show_prog: null,
    timer: null,
    tm_active: 0,
    cbs: {},
    // next connect after (ms.)
    tmConnect: 1000,
    connectLocked: false, // 连接加锁
    init: function (option) {
        var self = __ws;
        this.sid = '' + Math.floor(Math.random() * 10000);
        Object.assign(this, option)
        if (!this.socket) {
            this.connect();
        }
    },

    // using websocket
    socket: null,
    connect: function () {
        var self = __ws;

        if (!self.gid || !self.passport || self.connectLocked) {
            return false;
        }

        // 如果已经存在url，则无需再去获取url
        if (self.url) {
            return self.create();
        }
        axios({
            url: '/ajax/chat/get_chat_url',
            method: 'POST',
        }).then(res => {
            let data = res.data
            if (+data.errcode) {
                self.connectLocked = false
                return false;
            }
            var wsUrl = /https/g.test(window.location.protocol) ? data.chat_info.ssl_url : data.chat_info.url;
            self.url = wsUrl.replace(/^https:/, 'wss:').replace(/^http:/, 'ws:') + '?act=sub&sid=' + self.sid + '&gid=' + self.gid + '&passport=' + self.passport;

            self.create();
        })
        self.connectLocked = true
    },
    create: function () {
        var self = __ws;

        if (window.WebSocket) {
            var socket = new WebSocket(self.url);
            socket.binaryType = 'arraybuffer';
            socket.onopen = self.onOpen;
            socket.onmessage = self.onRecv;
            socket.onclose = self.onClose;
            socket.onerror = self.onError;

            self.socket = socket;
        } else {
            alert('您的浏览器不支持WebSocket，升级后获得最佳体验！');
        }
    },
    ping: function () {
        console.log('socket ping.');

        var self = __ws;
        if (self.socket && +self.socket.readyState === +WebSocket.OPEN) {
            self.socket.send('ping');
        }
        var tm = new Date().getTime();
        if (tm - self.tm_active > 180 * 1000) {
            console.log("websocket timeout.");
            if (self.socket) {
                self.socket.close();
                self.connectLocked = false;
            }
            self.socket = null;
            self.tmConnect = 0;
            self.onCloseTimer = window.setTimeout(function () {
                self.connect.call(self);
            }, self.tmConnect);
        } else {
            self.setTimerPing();
        }
    },
    setTimerPing: function () {
        // var self = __ws;
        if (this.timer != null) window.clearTimeout(this.timer);
        this.timer = window.setTimeout(this.ping, 59 * 1000);
    },
    onOpen: function () {
        var self = __ws;
        console.log("websocket open.");
        self.tm_active = new Date().getTime();
        self.tmConnect = 0;
        self.setTimerPing();
    },
    onClose: function () {
        var self = __ws;
        console.log("websocket close!");

        if (self.socket && +self.socket.readyState === +WebSocket.OPEN) {
            return false;
        }

        if (self.socket) {
            self.socket.close();
            self.socket = null;
        }
        self.tmConnect += 1000;
        self.connectLocked = false;
        self.onCloseTimer = window.setTimeout(function () {
            self.connect.call(self);
        }, self.tmConnect);
    },
    onError: function (error) {
        var self = __ws;
        console.log("websocket error!");

        if (self.socket && +self.socket.readyState === +WebSocket.OPEN) {
            return false;
        }

        if (self.socket) {
            self.socket.close();
            self.socket = null;
        }
        self.connectLocked = false;
    },
    onRecv: function (e) {
        var self = __ws;
        self.tm_active = new Date().getTime();
        self.setTimerPing();

        var data = e.data;

        if (data === 'pong') {
            return;
        }

        var xml = convert.xml2js(data, {compact: true, spaces: 4});
        var json = {
            content: JSON.parse(xml.longpolling.content._cdata),
            meta: xml.longpolling.meta._attributes
        };

        console.log(json, 'ws: xml2json')
        self.cbs[json.meta.type === 'qr_login' ? 'qr_login' : 'message'](json);
        // if (typeof self.cbs[json.meta.type] === 'function') {
        //     self.cbs[json.meta.type](json);
        // }

    }
}

export default __ws