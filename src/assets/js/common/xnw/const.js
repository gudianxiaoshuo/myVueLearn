/**
  * 校内外js的常量全在这里定义
  */
/* jshint -W100 */
let __CONST = {
    MARKDOWN: 1,
    MIN_NUM:  1,                      //最小图片上传个数
    MAX_NUM:  300,                    //最大图片上传个数
    MAX_ATTACH_COUNT: 12,             //聊天处&发日志附件最大上传文件数量
    MAX_COMMENT_IMAGE_COUNT: 5,       //评论中最大图片数

    MAX_PT_QUESTION_PIC_COUNT: 9,     // 普陀考试标题最大图片个数
    MAX_PT_OPTION_PIC_COUNT: 1,       // 普陀考试选项最大图片个数

    PAGE_MAX_NUM: 30,                 //分页每页最大数

    PIC_DEFAULT_WIDTH:      '470',
    PIC_DEFAULT_HEIGHT:     '860',
    PIC_DEFAULT_WXH:        '470*860',
    SMALL_THUMB_WXH:        '182x352',
    SMALL_THUMB_SIZE:       '182*352',

    REMINDER_URL: '/reminder.php',    //请求网址
    SEND_SMS_MC_BIND_MOBILE: 'bind_mobile',

    COMM_CLICK_EVENT: 'click',
    COMM_INPUT_EVENT: 'oninput' in document.createElement('input') ? 'input' : 'keyup',

    SUPPORT_AUDIO_FMTS: '.mp3',
    SUPPORT_VIDEO_FMTS: '.mp4,.rm,.rmvb,.mkv,.mov,.wmv,.avi,.flv,.3gp,.vob,.mpg,.mpeg,.asf,.divx,.m4v,.mts',
    SUPPORT_AUDIO_VIDEO_FMTS: '.mp3,.mp4,.rm,.rmvb,.mkv,.mov,.wmv,.avi,.flv,.3gp,.vob,.mpg,.mpeg,.asf,.divx,.m4v,.mts',
    EMOTION_LIST: {
        '[微笑]' : '//cdn.xnwimg.com/down/f:{403EDB5C-60FF-28B1-7F6F-611897A989A9}/1.gif',
        '[大哭]' : '//cdn.xnwimg.com/down/f:{FD439999-1D9B-496A-B59C-20CEF78EC68C}/1.gif',
        '[色]' : '//cdn.xnwimg.com/down/f:{A7F6FECF-232B-373D-AA03-1DF65719CB8F}/1.gif',
        '[偷笑]' : '//cdn.xnwimg.com/down/f:{42571F2A-4D29-0D7A-87BD-B5A73F70019A}/1.gif',
        '[鄙视]' : '//cdn.xnwimg.com/down/f:{B5B79E93-3E84-D781-ACA5-A295A5288307}/1.gif',
        '[害羞]' : '//cdn.xnwimg.com/down/f:{74EE14D7-31A9-23B8-137B-707256F3AABC}/1.gif',
        '[大笑]' : '//cdn.xnwimg.com/down/f:{46967E79-CC43-D0E5-E60D-479F0F9D928F}/1.gif',
        '[尴尬]' : '//cdn.xnwimg.com/down/f:{E1FC5CE7-C18F-B04E-15C3-FBEDDD99D316}/1.gif',
        '[可爱]' : '//cdn.xnwimg.com/down/f:{D4613AB2-3C32-B284-71B0-16B5972BEFB9}/1.gif',
        '[疑问]' : '//cdn.xnwimg.com/down/f:{A4A734C1-51EC-5A48-FF10-92B5D4D3F161}/1.gif',
        '[安慰]' : '//cdn.xnwimg.com/down/f:{D3F2EBDF-5143-1AB3-7D53-AF0A1BDFDC78}/1.gif',
        '[怒]' : '//cdn.xnwimg.com/down/f:{A9DC2259-5F8F-3B96-8D8A-B7845E8F75D7}/1.gif',
        '[加油]' : '//cdn.xnwimg.com/down/f:{2D2EEB76-E207-1316-1556-B5AAA9A1A6F7}/1.gif',
        '[再见]' : '//cdn.xnwimg.com/down/f:{CEF6DFF1-8B53-ADD1-BBA3-82EFE40AAE16}/1.gif',
        '[赞]' : '//cdn.xnwimg.com/down/f:{DA3D2AC2-9ED1-3F3C-D2F0-8B4C112822CA}/1.gif',
        '[握手]' : '//cdn.xnwimg.com/down/f:{950C303E-45B2-E001-D838-601107B8592C}/1.gif',
        '[谢谢]' : '//cdn.xnwimg.com/down/f:{473DCEA1-2C4E-06B8-917E-177039E7D0BC}/1.gif',
        '[鼓掌]' : '//cdn.xnwimg.com/down/f:{70EB1DDB-2FAD-4F6B-633E-7989E5EE7603}/1.gif',
        '[吻]' : '//cdn.xnwimg.com/down/f:{95D7D543-0E7B-7B5D-398E-00CC6E2F27F3}/1.gif',
        '[献花]' : '//cdn.xnwimg.com/down/f:{0FA47E13-6B9C-E280-7CA1-EC34082084DD}/1.gif',
        '[惊讶]' : '//cdn.xnwimg.com/down/f:{66EB4607-86EA-071C-DD6B-803B7EA0CA83}/1.gif',
        '[委屈]' : '//cdn.xnwimg.com/down/f:{847BF819-0AA4-D1A4-2309-832889592B2C}/1.gif',
        '[饥饿]' : '//cdn.xnwimg.com/down/f:{F6CDD78C-12FA-03EA-4764-C345621A6D6C}/1.gif',
        '[困]' : '//cdn.xnwimg.com/down/f:{878F057A-5FDA-AAE4-310F-3534D7CD505E}/1.gif',
        '[傻笑]' : '//cdn.xnwimg.com/down/f:{2BB0223B-C023-E478-4CF9-5662C4C21F56}/1.gif',
        '[左哼哼]' : '//cdn.xnwimg.com/down/f:{76532E31-5BE2-1BD7-1F09-53AA1C7E711F}/1.gif',
        '[右哼哼]' : '//cdn.xnwimg.com/down/f:{EEBB170C-FB47-6F37-607A-098486277106}/1.gif',
        '[闭嘴]' : '//cdn.xnwimg.com/down/f:{D665C404-C00D-4CD3-500A-9CD854EF848D}/1.gif',
        '[搞怪]' : '//cdn.xnwimg.com/down/f:{21BC2F3C-C1D6-88D1-8AED-0D41716C763E}/1.gif',
        '[睡觉]' : '//cdn.xnwimg.com/down/f:{F660DAE0-99AB-1737-2861-D41299026955}/1.gif',
        '[调皮]' : '//cdn.xnwimg.com/down/f:{5F26E28C-4115-A5B6-A41B-B95F66712FBD}/1.gif',
        '[坏笑]' : '//cdn.xnwimg.com/down/f:{0C6638AE-160A-A195-EC68-F2DE2A625FD2}/1.gif',
        '[亲亲]' : '//cdn.xnwimg.com/down/f:{0E42D1BD-5A46-0B00-452A-33687219A233}/1.gif',
        '[得意]' : '//cdn.xnwimg.com/down/f:{0C65EBD0-E83C-C167-9966-626C8C0780D7}/1.gif',
        '[爱心]' : '//cdn.xnwimg.com/down/f:{EC3F1CDA-73FA-85AC-CF2B-2B9CD17E24A5}/1.gif',
        '[心碎]' : '//cdn.xnwimg.com/down/f:{46B76B7C-30D1-FA7D-C164-E2FF6ED75F64}/1.gif',
        '[太阳]' : '//cdn.xnwimg.com/down/f:{CCAF7B62-EA5F-10A0-D1B2-D823F1CA7F94}/1.gif',
        '[月亮]' : '//cdn.xnwimg.com/down/f:{0226DDEE-C87A-7994-6DEB-31CBE55C0896}/1.gif',
        '[蛋糕]' : '//cdn.xnwimg.com/down/f:{6ECF1F0F-CFF6-EF03-68B3-80A799656132}/1.gif',
        '[咖啡]' : '//cdn.xnwimg.com/down/f:{A2C18E7E-79BD-7FA1-B66B-52D7DC7DF1EF}/1.gif',
        '[拜托]' : '//cdn.xnwimg.com/down/f:{BB8CF206-34CD-9D0E-F836-FD4EE3CD01E2}/1.gif',
        '[不开心]' : '//cdn.xnwimg.com/down/f:{540DFB4C-13CC-404B-AC2C-E45A1627B9A8}/1.gif',
        '[抓狂]' : '//cdn.xnwimg.com/down/f:{D16F6DE7-58BF-5FDB-B38F-A8B28643F063}/1.gif',
        '[衰]' : '//cdn.xnwimg.com/down/f:{CEBE0856-88E5-4D77-A4FA-71D268A90F89}/1.gif',
        '[恶心]' : '//cdn.xnwimg.com/down/f:{51A8CE52-5163-6C3E-7D34-33BF37CA00B3}/1.gif',
        '[咒骂]' : '//cdn.xnwimg.com/down/f:{A7F0705F-E6BE-6866-4811-EFA8A8572703}/1.gif',
        '[猪头]' : '//cdn.xnwimg.com/down/f:{B6D45563-9FD9-5EC7-C7D4-E278E69E1D4F}/1.gif',
        '[晕]' : '//cdn.xnwimg.com/down/f:{920D4A93-7B71-0C5D-E69A-0339EC4AB94E}/1.gif',
        '[冷冷的]' : '//cdn.xnwimg.com/down/f:{2FA215B7-F0EA-BAA9-A672-D431A34B0175}/1.gif',
        '[囧]' : '//cdn.xnwimg.com/down/f:{D1D9B1D6-7355-A470-6891-03B07EF45D1D}/1.gif',
        '[生病]' : '//cdn.xnwimg.com/down/f:{C8972EEB-959C-6507-951A-28730C29284C}/1.gif',
        '[见钱眼开]' : '//cdn.xnwimg.com/down/f:{6460710E-BE2B-7916-F799-80A576778072}/1.gif',
        '[撇嘴]' : '//cdn.xnwimg.com/down/f:{36550358-F1EB-F9DD-AB53-3D9823F70B68}/1.gif',
        '[篮球]' : '//cdn.xnwimg.com/down/f:{3335DEF6-2901-E02E-F1DD-2DA7F07A4B2D}/1.gif',
        '[糖果]' : '//cdn.xnwimg.com/down/f:{200F7AD3-F9DA-0136-1805-802DD48CB49D}/1.gif',
        '[碰杯]' : '//cdn.xnwimg.com/down/f:{B4319B34-1697-A6ED-1064-52241524F4BC}/1.gif',
        '[圣诞老人]' : '//cdn.xnwimg.com/down/f:{F4A13CDF-61A2-BF5E-BB47-5FF1A03649ED}/1.gif',
        '[铃铛]' : '//cdn.xnwimg.com/down/f:{57BC8724-9DAF-4BF7-953D-0F81426FC3E2}/1.gif',
        '[礼物]' : '//cdn.xnwimg.com/down/f:{5A89CC70-C8BB-0E60-DDC5-43B50D138066}/1.gif',
        '[雪花]' : '//cdn.xnwimg.com/down/f:{BC9DABCE-AA3A-7D3A-3130-9C3260BDBFF0}/1.gif'
    },

    GUARDIANT_RELATION_LIST: {
        '爸爸': '爸爸',
        '妈妈': '妈妈',
        '自定义': '自定义'
    },
    MIN_ACTIVITY_PRESENT_LIMIT: 2,
    MAX_ACTIVITY_PRESENT_LIMIT: 10000,

    POSTER_MAX_WIDTH: 400,
    POSTER_MAX_HEIGHT: 260,
    
    ACTIVITY_MAX_WIDTH: 440,
    ACTIVITY_MAX_HEIGHT: 264,

    // 各种上传文件的上限，以Byte为单位
    MAX_IMAGE_SIZE_BYTE: 30 * 1048576,      // 最大上传图片大小(30MB)
    MAX_VIDEO_SIZE_BYTE: 10240 * 1048576,   // 最大上传视频大小(10G=10240MB)
    MAX_AUDIO_SIZE_BYTE: 10240 * 1048576,   // 最大上传音频大小(10G=10240MB)
    MAX_ATTACH_SIZE_BYTE: 10240 * 1048576,  // 最大上传附件大小(10G=10240MB)

    NOT_ALPHANUM_HAN: /[^a-z0-9\u4e00-\u9fa5]/i,
    ALL_NUMBER: /^\d+$/,
    REGEXP_MOBILE: /^(?:\+?86)?1\d{10}$/,
    REGEXP_MOBILE_USA: /^[0-9]{10}$/,
    REGEXP_QUN_NAME: /^[\w\(\)\[\]\{\}\.\-\"（）｛｝【】（）「」｛｝［］－．－．＂＂＿_＿“” \u4e00-\u9fa5]{2,40}$/i,
    REGEXP_COURSE_NAME: /[\w\(\)\[\]\{\}\.\-\"（）｛｝【】（）「」｛｝［］－．－．＂＂＿_＿“” \u4e00-\u9fa5]/g,
    REGEXP_SCH_ATT_NAME: /^[\u4e00-\u9fa5]{2,6}$/,
    QUN_GROUP_REGEX: /^[\w\u4e00-\u9fa5]{1,18}$/i,
    USER_GROUP_REGEX: /^[\w\u4e00-\u9fa5]{1,18}$/i,
    PERSONAL_RECORD_TAG_REGEX: /^[\w\u4e00-\u9fa5]{1,10}$/i,
    BAD_USER_QUN_NAME: /(附中|附小|中学|小学|幼儿园)$/i,
    ACCOUNT: /^[\w\u4e00-\u9fa5]{2,15}$/,
    REGEXP_EMAIL:  /^\w+((\.|-)\w+)*\@\w+((\.|-)\w+)*\.[A-Za-z]+$/i,
    REGEXP_IMG_URL: /^https?:\/\/[^\s,\'")\]<>，。；‘’“”？\u4e00-\u9fa5]+\.(jpe?g|gif|png)$/i,
    REGEXP_URL_HTTP: /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/i,

    REGEX_DOMAIN: /^[\w-]{4,20}$/,
    REGEX_LABEL: /^[-& \w\.\u4e00-\u9fa5\u30fb]{1,30}$/i,
    REGEX_AT_USER: /(?:[^@＠]|^|\b)([@＠][\u4e00-\u9fa5\w\.]{2,15})/g,

    REGEX_DOMAIN_MESSAGE: '4个以上字母、数字、减号、下划线组合，不能全是数字',
    REGEX_URL: /(?:https?|ftp):\/\/[^\s\'")\]<>，。；‘’“”？【】（）一-龥]+/gi,

    REGEX_LABEL_FAIL_MESSAGE: '标签只能由数字、字母、汉字、小数点、减号或下划线组成，且不超过15个汉字或30个英文',

    HTTP_IMG_SITE: '//1.xnwimg.com',
    CDN_UPLOAD_SERVER: '//u2.xnwimg.com',
    SSL_UPLOAD_SERVER: '//us.xnw.com',
    CLOUD_URL_PRE: '//cdn.xnwimg.com/down/f:',
    VIDEO_THUMB_PLACEHOLDER: '{A38FB631-B6C0-877F-6B1E-8D715B716D59}',

    MAX_LABEL_COUNT: 5,
    VOTE_UPPER_LIMIT: 300,    //投票选项上限
    MEMBER_DISPLAY_LIMIT: 36,
    CHAT_ALBUM_PIC_LIMIT: 12,

    ROLE_NORMAL: 0,
    ROLE_TEACHER: 1,
    ROLE_STUDENT: 2,
    ROLE_GUARDIAN: 3,

    UPDATE_INTERVAL: 15, //日志更新时间间隔
    LABEL_COLOR_COUNT: 8,
    DESC_LIMIT_LENGTH: 70,
    LABEL_LIMIT_LENGTH: 10,
    CHANNEL_LENGTH_LIMIT: 30,
    CHANNEL_VISIBLE_LIMIT: 30,
    PAGINATION_LENGTH_LIMIT: 15,

    BUILDIN_VOTE: 'vote',
    BUILDIN_ALBUM: 'album',
    BUILDIN_WEIBO: 'weibo',
    BUILDIN_INDEX: 'index',
    BUILDIN_MEMBER: 'member',
    BUILDIN_NOTIFY: 'notify',   //通知
    BUILDIN_NOTICE: 'notice',   //公告
    BUILDIN_HOMEWORK: 'work',
    BUILDIN_XCOURSE: 'course',
    BUILDIN_RELATION: 'relation',
    BUILDIN_ACTIVITY: 'activity',
    BUILDIN_EVALUATION: 'evaluation',
    BUILDIN_ATTENDANCE: 'attendance',
    BUILDIN_EXAMREPORT: 'exam_report',
    BUILDIN_CLASSPERFORM: 'class_perform',

    ACCESS_LEVEL_PUBLIC: 1,
    ACCESS_LEVEL_MEMBER: 2,
    ACCESS_LEVEL_MASTER: 3,
    ACCESS_CONTACT_LEVEL_MASTER: 0,

    WRITE_LEVEL_USER: 0,
    WRITE_LEVEL_MEMBER: 1,
    WRITE_LEVEL_MASTER: 2,

    ALLOW_VISIT_SELF: 3,

    QUN_LABEL_BJ: 1,
    QUN_LABEL_XX: 2,
    QUN_LABEL_QT: 3,
    QUN_LABEL_XXB: 4,

    TEMPLATE_TYPE_WEIBO: 1,                 //日志列表：标准卡片列表
    TEMPLATE_TYPE_BIAOTI: 2,                //标题列表：有标题显示标题，没标题截取一定长度的正文（不要换行）
    TEMPLATE_TYPE_PIC: 3,                   //图片列表：
    TEMPLATE_TYPE_SHOUTIAOZHAIYAO: 4,       //首条摘要: 第一条显示为信息块，后续日志同标题列表
    TEMPLATE_TYPE_INFOBLOCK: 5,             //信息块：无发表人，无发表时间，无操作区（纯内容块）
    TEMPLATE_TYPE_ALBUM_LIST: 6,            //相册集
    TEMPLATE_TYPE_NORMAL: 7,                //常规一级标签
    TEMPLATE_TYPE_PLAYPIC: 8,               //群自定义首页 轮播大图
    TEMPLATE_TYPE_WEIBO_NO_AVATAR: 9,       //日志列表（不显示发布人头像）
    TEMPLATE_TYPE_PIC_WITH_TITLE: 10,       //图片和标题列表

    RECEIVER_TYPE_ALL: 'all',               //本群全部成员
    RECEIVER_TYPE_PART: 'part',             //本群部分成员
    RECEIVER_TYPE_SCHOOL: 'school',         //全校通知
    RECEIVER_TYPE_GUARDIAN: 'guardian',     //本群家长
    RECEIVER_TYPE_STUDENT_GUARDIAN: 'student_and_guardian',     //本群学生和家长

    IS_SEND2ALL_QUN: 1,   // 群通知
    IS_SEND2ALL_SCHOOL:2, //全校通知
    IS_SEND2ALL_CLASS:3,  //班级通知

    TARGET_TYPE_QUN: 1,   // 群通知
    TARGET_TYPE_SCHOOL:2, //全校通知
    TARGET_TYPE_CLASS:3,  //班级通知

    GENDER_M: 1,    //男
    GENDER_F: 2,    //女
    GENDER_P: 3,    //保密
    GENDER_U: 0,    //未设置

    KINDERGARTEN: '幼儿园',
    PRIMARY_SCHOOL: '小学',
    JUNIOR_HIGH: '初中',
    SENIOR_HIGH: '高中',
    SECONDARY_VOCATIONAL: '中职',
    SENIOR_VOCATIONAL: '高职',
    FULL_MIDDLE_SCHOOL: '完全中学',
    NINE_YGZ: '9年一贯制',
    TWELVE_YGZ: '12年一贯制',
    UNIVERSITY: '大学',
    TRAINING_AGENCY: '教育机构', // 其他
    EDU_DEPARTMENT: '教育主管部门', // 其他
    SCHOOL_TYPE_TEACHING_POINT: '教学点', // 12年一贯制
    ADULT_SCHOOL: '成人学校', // 12年一贯制
    OTHER: '其他', // 12年一贯制

    EDUSCHEME: {
        '请选择': '请选择',
        '幼儿园': '幼儿园',
        '小学': '小学',
        '初中': '初中',
        '高中': '高中',
        '中职': '中职',
        '高职': '高职',
        '完全中学': '完全中学',
        '9年一贯制': '9年一贯制',
        '12年一贯制': '12年一贯制',
        '大学': '大学',
        '教育机构': '教育机构',
        '教育主管部门': '教育主管部门',
        '教学点': '教学点',
        '成人学校': '成人学校',
        '其他': '其他'
    },
    SENIOR_VOCATIONAL_LIST: {
        '高一': '高一',
        '高二': '高二',
        '高三': '高三'
    },
    SECONDARY_VOCATIONAL_LIST: {
        '初一': '初一',
        '初二': '初二',
        '初三': '初三',
        '初四': '初四'
    },
    SENIOR_HIGH_LIST: {
        '高一': '高一',
        '高二': '高二',
        '高三': '高三'
    },
    JUNIOR_HIGH_LIST: {
        '初一': '初一',
        '初二': '初二',
        '初三': '初三',
        '初四': '初四'
    },
    PRIMARY_SCHOOL_LIST: {
        '一年级': '一年级',
        '二年级': '二年级',
        '三年级': '三年级',
        '四年级': '四年级',
        '五年级': '五年级',
        '六年级': '六年级'
    },
    KINDERGARTEN_LIST: {
        '小小班': '小小班',
        '小班': '小班',
        '中班': '中班',
        '大班': '大班',
        '学前班': '学前班'
    },
    UNIVERSITY_LIST: {
        '大一': '大一',
        '大二': '大二',
        '大三': '大三',
        '大四': '大四',
        '大五': '大五',
        '研一': '研一',
        '研二': '研二',
        '研三': '研三'
    },
    NINE_YGZ_LIST: {
        '一年级': '一年级',
        '二年级': '二年级',
        '三年级': '三年级',
        '四年级': '四年级',
        '五年级': '五年级',
        '六年级': '六年级',
        '七年级': '七年级',
        '八年级': '八年级',
        '九年级': '九年级'
    },
    TWELVE_YGZ_LIST: {
        '一年级': '一年级',
        '二年级': '二年级',
        '三年级': '三年级',
        '四年级': '四年级',
        '五年级': '五年级',
        '六年级': '六年级',
        '七年级': '七年级',
        '八年级': '八年级',
        '九年级': '九年级',
        '高一': '高一',
        '高二': '高二',
        '高三': '高三'
    },
    WEEKLIST: {
        '周一': '周一',
        '周二': '周二',
        '周三': '周三',
        '周四': '周四',
        '周五': '周五',
        '周六': '周六',
        '周日': '周日'
    },

    FIVE_POINT_SCALE: [
        {
            txt: '',
            val: ''
        },
        {
            txt: '优秀',
            val: 5
        },
        {
            txt: '良好',
            val: 4
        },
        {
            txt: '中等',
            val: 3
        },
        {
            txt: '及格',
            val: 2
        },
        {
            txt: '不及格',
            val: 1
        }
    ],

    SPEC_GUARDIAN: '家长',
    CALL_ROLL_TIMEOUT: 60,

    GET_COUNT_LIMIT: 30,

    DESC_LEN_LIMIT: 256,
    PUSH_SYSMSG_LIMIT: 300,
    CHUANGXINJIAOYUWANG: 2056450,

    MAX_CLASS_QUN_MEMBER_COUNT: 500,
    NAME_LEN_LIMIT: 20,

    ATTENDANCE_STATE_NORMAL: 0,
    ATTENDANCE_STATE_LATE: 1,
    ATTENDANCE_STATE_LEAVE: 2,
    ATTENDANCE_STATE_ABSENT: 3,

    CLASS_PERFORM_STATUS_NORMAL: 0,
    CLASS_PERFORM_STATUS_POSITIVE: 1,
    CLASS_PERFORM_STATUS_PROMOTE: 2,

    IS_HTML_WEIBO: 7,
    IS_NORMAL_WEIBO: 0,
    IS_MARKDOWN_WEIBO: 4,
    IS_HTML_WEIBO_LONG: 8,
    IS_NORMAL_WEIBO_LONG: 5,
    IS_MARKDOWN_WEIBO_LONG: 6,
    IS_TOUCH_DEVICE: !!(('ontouchstart' in window) || navigator.maxTouchPoints || navigator.msMaxTouchPoints),

    IS_DAN_XUAN_TI: 1,
    IS_DUO_XUAN_TI: 2,
    IS_TIAN_KONG_TI: 3,
    IS_WEN_DA_TI: 4,
    IS_MANDATORY: 1,
    IS_OPTIONAL: 2,
    MAX_QUESTION_ANSWER_LIMIT: 500
};
export default __CONST