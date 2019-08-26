<template>
    <div>
        <el-button @click="getHandoutList">讲义夹</el-button>


        <el-dialog
                title = "可使用的讲义"
                center
                :visible.sync = "dialogVisible"
                :modal-append-to-body = "modalVisible"
                :close-on-click-modal = "clickVisible"
                custom-class = "handoutList"
                width = "440px">
            <div class="handoutListContainer">
                <ul class="handoutList">
                    <!--{{each handoutList}}-->
                    <li v-for="(handout, handoutIndex) in handoutListData" :key="handoutIndex" class="handoutItem" courseId="" chapterId="" handoutId="">
                        <i class="xicon-my-class myClassIcon"></i>
                        <span class="name" :title="handout.name">{{handout.name}}</span>
                        <span class="handoutStatus" @click="chooseHandout(handout.id)">使用</span>
                    </li>
                    <!--{{// /each}}-->
                </ul>
                <div class="_xnwuploadProgressBar hide">
                    <div class="_progressBar"></div>
                </div>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import util from '@/assets/js/common/xnw/util'
    export default {

        name: "Handout",
        props: ['liveClassData', 'isHost'],
        updated() {
            // this.updataData()
        },
        watch: {
            liveClassData: function (val) {
                this.updataData(val)
            },
            currentImg: function (val) {
                if (val === this.liveClassData.course_cover) {
                    this.isCourseCover = true
                } else {
                    this.isCourseCover = false
                }
            }
        },

        data() {
            return {
                uid: 0,
                currentImg: null,   //讲义当前页面
                isCourseCover: true,   //讲义当前页面
                liveStatus: 0,     //直播状态
                learnMethod: 1,     //直播方式
                isCompere: false, //主持人   1是主持人 0不是
                dialogVisible: false, //是否打开试卷列表
                modalVisible: false,    //弹窗组件的用法 是否在 body上创建弹窗
                clickVisible: false,  //弹窗组件的用法 禁止点击任何位置关闭弹窗
                handoutListData: [],   //讲义列表
                countDownTime: '59:59',       //倒计时
                countDownTimer: null,   //倒计时定时器
                AarrivalTime: false,    //是否已到达直播时间
                currentSliceId: 0,      //当前的讲义 id
                handoutArr: [],         //当前讲义的集合
                handoutLength: 0,         //当前讲义的页数
                switchRight: false,     //是否切换大小屏
                fullscreenLoading: false,    //加载loadding
                loadingTimer: null,
                isViewHandout: false,        //是否正在预览讲义
                isClient: this.$route.query.client, //判断是否是客户端
                prevHandoutImg: '',        //预览讲义时缓存的当前讲义

            }
        },
        methods:{

            getHandoutList (){

                //传参数 方法一
                let params={
                    'qid': 2981269,
                    'course_id': 4308,
                    'chapter_id': 3301,
                    'act': 'get_handout_list',
                }
                let qs=require('qs')
                let qsParam=qs.stringify(params);

                //方法二
                // let qsParam = new URLSearchParams();
                // params.append('qid', 2981269);
                // params.append('course_id', 4308);
                //
                // params.append('chapter_id', 3298);
                // params.append('act', 'get_handout_list');

                this.$axios({
                     // url:'https://xdev.xnw.com:8444/qun/ajax_live.php?qid=2981269&course_id=4308&chapter_id=3298&act=get_handout_list',
                    url:'https://xdev.xnw.com:8444/qun/ajax_live.php',
                    method:'POST',
                    data: qsParam

                })
                    .then(res=>{
                        let ret=res.data
                        if(ret.errcode!==0){
                            return this.$message({
                                type:"warning",
                                message:ret.msg
                            })
                        }

                        this.handoutListData = ret.handout_list
                        this.dialogVisible = true
                    })


            }
        }
        }



</script>

<style scoped lang="scss">
    @import '../assets/sass/studycenter.scss';

    .leftContainer {
        position: absolute;
        width: calc(100% - 400px);
        box-sizing: border-box;
        height: calc(100% - 44px);
        &.client {
            height: 100%;
        }
        &.right {
            position: absolute;
            right: 0;
            width: 400px;
            height: 300px;
            &:hover {
                .liveStreamSwitcherMenu {
                    display: block;
                }
            }
            .liveStreamSwitcherMenu {
                &.rightLiveStreamSwitcherMenu {
                    position: fixed;
                    z-index: 9;
                    background: rgba(0, 0, 0, .8);
                    color: #FFFFFF;
                    top: 44px;
                    right: 0;
                    width: 400px;
                    height: 30px;
                    line-height: 30px;
                    .switchScreenBtn {
                        margin-left: 16px;
                        color: #FFFFFF;
                        font-size: 13px;
                        i {
                            font-style: normal;
                        }
                        .switchIcon {
                            position: absolute;
                            left: 8px;
                            top: 8px;
                            font-size: 17px;
                            cursor: pointer;
                        }
                        .closeIcon {
                            display: none;
                            position: absolute;
                            right: 16px;
                            top: 8px;
                            font-size: 13px;
                            cursor: pointer;
                        }
                        &.switchFlash {
                            display: none;
                            position: absolute;
                            top: 0;
                            left: 150px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .handoutMenu {
                &.rightHandoutMenu {
                    height: 25px;
                    .switchHandoutWrap {
                        position: absolute;
                        left: 60%;
                        top: 12px;
                        width: 100px;
                        height: 30px;
                        line-height: 30px;
                        .previousPage, .nextPage {
                            padding: 0;
                            top: 9px;
                            .on {
                                top: 0;
                            }
                        }
                    }
                    .uploadHandout {
                        position: absolute;
                        top: 12px;
                        width: 70px;
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
            .whiteBoardContainer {
                &:hover {
                    .whiteBoardWrapper + .openScreen {
                        &.rightOpenScreen {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    .containerWrap {
        position: relative;
        overflow: hidden;
        .whiteBoardContainer {
            height: 100%;
            position: relative;
            background-color: rgba(0, 0, 0, .7);
            .liveStreamSwitcherMenu {
                display: none;
            }
            .handoutContainer {
                height: 100%;
                width: 100%;
                display: inline-block;
                &.hide {
                    display: none;
                }
                .handoutImg {
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    vertical-align: middle;
                    &.courseCover {
                        width: 100%;
                        height: 100%;
                    }
                }
                .whiteBoardCanvas {
                    width: 100%;
                    height: 100%;
                }
            }
            .beforeLiveTipsWrap {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, .8);
                height: 100%;
                //z-index: 9;
                .beforeLiveTips {
                    width: 466px;
                    position: relative;
                    left: 50%;
                    margin-left: -233px;
                    top: 30%;
                    .timeWrap {
                        text-align: left;
                        color: #FFF;
                        i {
                            color: #FFF;
                            font-size: 28px;
                        }
                        .dueTime {
                            font-size: 24px;
                            margin-left: 24px;
                            font-weight: 300;
                        }
                        .dueTimeText {
                            position: relative;
                            top: 5px;
                            font-size: 38px;
                            display: inline-block;
                        }
                    }
                    .tipsInfoWrap {
                        font-size: 18px;
                        color: #C2C0B7;
                        letter-spacing: .15px;
                        line-height: 30px;
                        font-weight: 200;
                        margin-top: 35px;
                        overflow: hidden;
                        a {
                            color: #08c;
                        }
                        .title {
                            margin-bottom: 10px;
                        }
                        .oneTip {
                            line-height: 25px;
                            font-size: 14px;
                        }
                    }
                    .viewHandoutWrap {
                        width: 100%;
                        text-align: center;
                        .viewHandout {
                            width: 125px;
                            height: 40px;
                            border: none;
                            font-size: 20px;
                            font-weight: 200;
                            background: #FFAA33;
                            border-radius: 33px;
                            color: #FFF;
                            margin-top: 30px;
                        }
                    }
                }
            }
            .loadEffect{
                width: 100px;
                height: 100px;
                position: relative;
                margin: 0 auto;
                top: -60%;
                //background: #000;
                //background: rgba(0, 0, 0, .7);
                display: none;
                span {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #Fa3;
                    position: absolute;
                    animation: load 1.04s ease infinite;
                    &:nth-child(1) {
                        left: 0;
                        top: 50%;
                        margin-top: -10px;
                        animation-delay: 0.13s;
                    }
                    &:nth-child(2) {
                        left: 14px;
                        top: 14px;
                        animation-delay: 0.26s;
                    }
                    &:nth-child(3) {
                        left: 50%;
                        top: 0;
                        margin-left: -10px;
                        animation-delay: 0.39s;
                    }
                    &:nth-child(4) {
                        top: 14px;
                        right: 14px;
                        animation-delay: 0.52s;
                    }
                    &:nth-child(5){
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        animation-delay: 0.65s;
                    }
                    &:nth-child(6) {
                        right: 14px;
                        bottom:14px;
                        animation-delay: 0.78s;
                    }
                    &:nth-child(7) {
                        bottom: 0;
                        left: 50%;
                        margin-left: -10px;
                        animation-delay: 0.91s;
                    }
                    &:nth-child(8) {
                        bottom: 14px;
                        left: 14px;
                        animation-delay: 1.04s;
                    }
                }
                @keyframes load{
                    0% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(.3);
                        opacity: 0.5;
                    }
                }
            }
            .handoutMenu {
                margin: auto;
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                height: 40px;
                &.hide {
                    display: none;
                }
                a {
                    line-height: 40px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 100px;
                    font-size: 14px;
                    color: #FFFFFF;
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    padding: 0;
                    text-align: center;
                    font-weight: 200;
                }
                .uploadHandout {
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                    cursor: pointer;
                }
                .exitViewHandout {
                    position: absolute;
                    left: 20px;
                    cursor: pointer;
                }
                .switchHandoutWrap {
                    position: absolute;
                    left: 50%;
                    background: rgba(0, 0, 0, 0.70);
                    border-radius: 8px;
                    width: 168px;
                    height: 40px;
                    text-align: center;
                    margin-left: -84px;
                    line-height: 40px;
                    color: #FFF;
                    &.hide {
                        display: none;
                    }
                    .previousPage {
                        position: absolute;
                        left: 10px;
                        cursor: pointer;
                        background: transparent;
                        border: none;
                        .on {
                            position: relative;
                            top: 2px;
                            color: #FFF;
                            font-size: 13px;
                        }
                    }
                    .nextPage {
                        position: absolute;
                        right: 10px;
                        cursor: pointer;
                        background: transparent;
                        border: none;
                        .on {
                            position: relative;
                            top: 2px;
                            color: #FFF;
                            font-size: 13px;
                        }
                    }
                }
            }
            .openScreen {
                position: absolute;
                /*right: 15px;*/
                /*bottom: 40px;*/
                background: #000;
                color: #FFF;
                width: 80px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
                z-index: 1;
                display: none;

                border-radius: 100px;
                right: 28px;
                bottom: 70px;
                i {
                    font-style: normal;
                }
            }
            &:hover {
                .whiteBoardWrapper + .openScreen {
                    display: block;
                }
            }
        }
    }
    .leftContainer {
        .containerWrap {
            width: 100%;
            height: 100%;
            margin-right: 0;
            .timeWrap {
                i {
                    position: relative;
                    top: 6px;
                }
            }
        }
    }
    .handoutListContainer {
        .handoutList {
            min-height: 400px;
            .handoutItem {
                width: 100%;
                height: 55px;
                color: #313131;
                font-size: 14px;
                line-height: 55px;
                overflow: hidden;
                border-bottom: 1px solid #eee;
                .myClassIcon {
                    float: left;
                    padding: 10px 8px;
                    margin: 10px 8px;
                    color: #fff;
                    background: #f77e19;
                }
                .name {
                    float: left;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 300px;
                }
                .handoutStatus {
                    float: right;
                    outline: none;
                    font-size: 14px;
                    color: #fa3;
                    cursor: pointer;
                }
            }
        }
    }

</style>
<style lang="css" scoped>
    .leftContainer >>> .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #ebebeb;
        padding-top: 10px;
    }
    .leftContainer >>> .el-dialog__title {
        font-size: 16px;
        font-weight: bold;
    }
    .leftContainer >>> .el-dialog__headerbtn {
        top: 15px;
    }
    .leftContainer >>> .el-icon-close {
        font-size: 20px;
    }
</style>
