//防止录屏跑马灯效果
//创建跑马灯
import $ from 'jquery'
function horseRaceLamp (data) {
    var liveCoursePlayer =  data.liveCoursePlayer,
        userId = data.userId,
        $acountDiv = $('<div class="_watermark"></div>'),
        $liveCoursePlayer = $(liveCoursePlayer);
    if (!$liveCoursePlayer.find('._watermark').length) {
        $acountDiv
        .html(userId)
        .css({
            'font-size': '24px',
            '-webkit-text-stroke': '1px #333',
            'color': '#f61313',
            'position': 'fixed',
            'left': '-120px',
            'top': '200px',
            'width': '120px',
            'z-index': '9999',
        })
        .appendTo($liveCoursePlayer);
    }
}


function moveMsg(data) {
    clearTimeout(marqueeTimer);
    var allowRecordScreen =  data.allowRecordScreen,
        liveCoursePlayer =  data.liveCoursePlayer,
        winHeight = $(window).height(),
        moveWidth = $(window).width(),
        colorArr = ['#fff', '#fa3', '#00bcf2', '#ff5500', '#f61313', '#ffff00', '#f00', '#080'],
        $liveCoursePlayer = $(liveCoursePlayer),
        colorNum = colorArr.length - 1;
    
        if (!$liveCoursePlayer.find('._watermark').length) {
            //allowRecordScreen:  1   开启跑马灯防录屏    0 不开启跑马灯
            // if (allowRecordScreen) {   //当前课程没设置不允许录屏时调试用
            if (allowRecordScreen) {      //正常逻辑时使用
                horseRaceLamp(data);
            } else {
                return false
            }
        }
    var marqueeTimer = '';
    var top = Math.random() * winHeight;//随机产生一个top
    var color = colorArr[Math.floor(Math.random() * colorNum)];//随机产生一个color
    $('._watermark').animate({'left': moveWidth + 'px'}, 3000, 'linear', function () {
        $('._watermark').css({
            'left': '-120px',
            'top': top + 'px',
            'color': color,
        });
        // clearTimeout(marqueeTimer);
        // // timer = setTimeout(moveMsg(data), 3000 + Math.floor(Math.random() * (5000 - 3000))); //3-5秒
        // // marqueeTimer = setTimeout(moveMsg(data), 30000 + Math.floor(Math.random() * (180000 - 30000))); //30-180秒
        // marqueeTimer = setTimeout(moveMsg(data), 8000); //30-180秒

    });
}

export function setMarqueeTimer(data) {
    if (marqueeTimer) {
        clearInterval(marqueeTimer)
    } else {
        var marqueeTimer = '';
    }
    var time = 30000 + Math.floor(Math.random() * (180000 - 30000))  //30-180秒
    // var time = 3000 + Math.floor(Math.random() * (18000 - 3000))  //3-18秒
    // var time = 6000;
    clearInterval(marqueeTimer)
    marqueeTimer = setInterval(function () {
        moveMsg(data)
    }, time)
}
export default {
    setMarqueeTimer
}