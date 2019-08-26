import moment from 'moment'

export default {

    // 时间格式化
    formatMoment(DateTime, formatStr='YYYY.MM.DD HH:mm') {

        if (String(DateTime).length === 10) { // 秒级
            DateTime = DateTime * 1000
        }
        return moment(DateTime).format(formatStr)
    },

    // 数字转换为中文数字
    numConverter(num) {
        num = num.toString()
        let numMap = {
                '0': '零',
                '1': '一',
                '2': '二',
                '3': '三',
                '4': '四',
                '5': '五',
                '6': '六',
                '7': '七',
                '8': '八',
                '9': '九',
            },
            numStr = ''

        if (num >= 100) {
            if (+num[1]) {
                if (+num[2]) {
                    numStr += numMap[num[0]] + '百' + numMap[num[1]] + '十' + numMap[num[2]]
                } else {
                    numStr += numMap[num[0]] + '百' + numMap[num[1]] + '十'
                }

            } else {
                numStr += numMap[num[0]] + '百' + '零' + numMap[num[2]]
            }
        }

        else if (num >= 10) {
            if (+num[1]) {
                if (+num[0] === 1) {
                    numStr += '十' + numMap[num[1]]
                } else {
                    numStr += numMap[num[0]] + '十' + numMap[num[1]]
                }

            } else {
                if (+num[0] === 1) {
                    numStr += '十'
                } else {
                    numStr += numMap[num[0]] + '十'
                }
            }
        }

        else {
            numStr += numMap[num[0]]
        }

        return numStr
    },

    // 文件查看/下载路径
    fileUrlFormat: function(fileInfo, type) { // type: 'download'时下载，否则查看
        let ctStr = type && type === 'download' ? 'ct:0/' : '/' // ct: content type "ct:0" 表示下载,否则查看
        var file = [
            '//cdn.xnwimg.com/down/s:',
            '/f:',
            fileInfo.fileid,
            ctStr,
            fileInfo.name
        ];
        return window.encodeURI(file.join(''));
    },

    // 显示xx小时xx分xx秒
    formatSeconds: function (value) {
        let secondTime = parseInt(value);
        let minuteTime = 0;
        let hourTime = 0;
        if (secondTime > 60) {
            minuteTime = parseInt(secondTime / 60)
            secondTime = parseInt(secondTime % 60)
            if (minuteTime > 60) {
                hourTime = parseInt(minuteTime / 60)
                minuteTime = parseInt(minuteTime % 60)
            }
        }
        let result = "" + parseInt(secondTime) + "秒";
        if (minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if (hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
    },
    
}